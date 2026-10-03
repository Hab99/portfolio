import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const OVERRIDES_PATH = path.join(rootDir, "src/data/content-overrides.json");
const UPLOADS_DIR = path.join(rootDir, "public/uploads");

// Só formatos raster. SVG e HTML ficam de fora: carregam script e
// seriam servidos pelo próprio domínio a partir de public/uploads.
const EXTENSOES_PERMITIDAS = new Set(["png", "jpg", "webp", "gif"]);

// Links aceitos no modo de edição. Barra `javascript:` e `data:`, que
// virariam XSS no site publicado se o overrides fosse commitado.
const HREF_SEGURO = /^(https?:\/\/|mailto:|\/|#)/i;

function getExtensionFromDataUrl(dataUrl) {
  const match = dataUrl.match(/^data:image\/(\w+);/);
  if (!match) return null;

  const ext = match[1].toLowerCase();
  const normalizada = ext === "jpeg" ? "jpg" : ext;
  return EXTENSOES_PERMITIDAS.has(normalizada) ? normalizada : null;
}

/**
 * A API só existe no `astro dev`, mas o dev server responde a qualquer
 * página aberta no navegador. Sem esta checagem, um site qualquer
 * visitado com o dev server rodando conseguiria gravar arquivos aqui
 * (POST com text/plain não dispara preflight de CORS).
 */
function origemLocal(req) {
  const origin = req.headers.origin;
  if (!origin) return true; // curl, ferramentas locais: sem Origin
  try {
    const { hostname } = new URL(origin);
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
  } catch {
    return false;
  }
}

function sanitizeFileName(key) {
  return key.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "image";
}

async function readContentOverrides() {
  try {
    const raw = await fs.readFile(OVERRIDES_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function writeContentOverrides(overrides) {
  const processed = { ...overrides };

  for (const [key, value] of Object.entries(processed)) {
    if (typeof value !== "string") {
      throw new Error(`Valor inválido em ${key}`);
    }
    if (key.startsWith("link.") && !HREF_SEGURO.test(value)) {
      throw new Error(`Link não permitido em ${key}`);
    }
    if (!key.startsWith("image.") || !value.startsWith("data:")) continue;

    const imageKey = key.slice("image.".length);
    const ext = getExtensionFromDataUrl(value);
    if (!ext) {
      throw new Error(`Formato de imagem não permitido em ${key}`);
    }
    const filename = `${sanitizeFileName(imageKey)}.${ext}`;

    await fs.mkdir(UPLOADS_DIR, { recursive: true });

    const base64 = value.split(",")[1];
    if (!base64) continue;

    await fs.writeFile(
      path.join(UPLOADS_DIR, filename),
      Buffer.from(base64, "base64"),
    );
    processed[key] = `/uploads/${filename}`;
  }

  await fs.mkdir(path.dirname(OVERRIDES_PATH), { recursive: true });
  await fs.writeFile(OVERRIDES_PATH, `${JSON.stringify(processed, null, 2)}\n`);

  return processed;
}

async function clearContentOverrides() {
  await fs.writeFile(OVERRIDES_PATH, "{}\n");

  try {
    const files = await fs.readdir(UPLOADS_DIR);
    await Promise.all(
      files
        .filter((file) => file !== ".gitkeep")
        .map((file) => fs.unlink(path.join(UPLOADS_DIR, file))),
    );
  } catch {
    // uploads dir may not exist yet
  }
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

async function readRequestBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (chunks.length === 0) return {};

  return JSON.parse(Buffer.concat(chunks).toString("utf-8"));
}

export function contentApiPlugin() {
  return {
    name: "portfolio-content-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = req.url?.split("?")[0];

        if (pathname !== "/api/content") {
          next();
          return;
        }

        if (!origemLocal(req)) {
          sendJson(res, 403, { ok: false, error: "Origem não permitida" });
          return;
        }

        try {
          if (req.method === "GET") {
            const overrides = await readContentOverrides();
            sendJson(res, 200, overrides);
            return;
          }

          if (req.method === "POST") {
            const tipo = req.headers["content-type"] ?? "";
            if (!tipo.startsWith("application/json")) {
              sendJson(res, 415, { ok: false, error: "Use application/json" });
              return;
            }
            const body = await readRequestBody(req);
            const overrides = body.overrides ?? body;
            const saved = await writeContentOverrides(overrides);
            sendJson(res, 200, { ok: true, overrides: saved });
            return;
          }

          if (req.method === "DELETE") {
            await clearContentOverrides();
            sendJson(res, 200, { ok: true });
            return;
          }

          sendJson(res, 405, { ok: false, error: "Method not allowed" });
        } catch (error) {
          sendJson(res, 500, {
            ok: false,
            error: error instanceof Error ? error.message : "Erro ao salvar conteúdo",
          });
        }
      });
    },
  };
}
