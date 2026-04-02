module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: "Invalid JSON" }); }
  }

  const { html, token } = body || {};
  if (!html) return res.status(400).json({ error: "HTML manquant" });

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN || token;
  if (!GITHUB_TOKEN) return res.status(401).json({ error: "Token GitHub manquant" });

  const REPO = "save9999/bouquet-gourmand";
  const API = "https://api.github.com";
  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
    "User-Agent": "bouquet-admin",
  };

  // Récupérer le SHA actuel du fichier
  const getRes = await fetch(`${API}/repos/${REPO}/contents/index.html`, { headers });
  if (!getRes.ok) {
    const err = await getRes.json().catch(() => ({}));
    return res.status(500).json({ error: "Lecture GitHub échouée : " + (err.message || getRes.status) });
  }
  const { sha } = await getRes.json();

  // Mettre à jour le fichier
  const putRes = await fetch(`${API}/repos/${REPO}/contents/index.html`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: "✏️ Mise à jour via admin panel",
      content: Buffer.from(html).toString("base64"),
      sha,
    }),
  });

  if (!putRes.ok) {
    const err = await putRes.json().catch(() => ({}));
    return res.status(500).json({ error: "Push GitHub échoué : " + (err.message || putRes.status) });
  }

  // Déclencher un redéploiement Vercel si un deploy hook est configuré
  const deployHook = process.env.VERCEL_DEPLOY_HOOK;
  if (deployHook) {
    try { await fetch(deployHook, { method: "POST" }); } catch { /* ignore */ }
  }

  return res.status(200).json({ success: true });
};
