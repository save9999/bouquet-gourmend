# Bouquet Gourmand

Site e-commerce pour bouquets en chocolat artisanal.

## Déploiement sur Vercel

### Méthode 1: Git + Vercel (AUTOMATIQUE - Recommandé)

```bash
# 1. Initialiser Git
cd /tmp/bouquet-gourmand
git init
git add .
git commit -m "Initial commit"

# 2. Créer repo GitHub
# Créer repo vide sur GitHub (ex: bouquet-gourmand)
# Puis:
git remote add origin https://github.com/TON_GITHUB/bouquet-gourmand.git
git branch -M main
git push -u origin main

# 3. Déployer sur Vercel
# Va sur: https://vercel.com
# Import project → selectionne ton repo GitHub
# Deploy!
```

### Méthode 2: Vercel CLI (5 min)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /tmp/bouquet-gourmand
vercel

# Suits les prompts
# Ta URL sera générée!
```

### Méthode 3: Drag & Drop (Netlify)

```bash
# Alternative: Drag & drop sur Netlify.com
# Encore plus rapide!
```

## URL Permanente

Une fois déployée, tu auras une URL du type:
- `https://bouquet-gourmand.vercel.app`
- Ou un domaine custom si tu le configures

**Cette URL est permanente et 24/7!**

## Notes

- Static site (HTML/CSS/JS pur) - zéro backend
- Stripe intégré (mode test)
- LocalStorage pour panier (client-side)
- Responsive design
- Production ready
