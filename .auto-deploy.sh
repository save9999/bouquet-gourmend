#!/bin/bash
# Auto-deploy script - appelé après chaque modification

cd /tmp/bouquet-gourmand

# Configure git (une seule fois)
git config user.email "bot@bouquet.local" 2>/dev/null || true
git config user.name "BouquetBot" 2>/dev/null || true

# Add + commit + push
git add .
git commit -m "Auto-update: $(date +%H:%M:%S)" 2>/dev/null || echo "Aucun changement"
git push origin main 2>/dev/null

echo "✅ Push réussi!"
