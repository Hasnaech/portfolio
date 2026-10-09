# Audit SEO — Skyalys

Méthode : audit LLM-first (skill `agentic-seo`) + scripts basés fichiers (`validate_schema`,
`parse_html`) sur les pages générées. Les scripts réseau (robots, PageSpeed, liens cassés)
n'ont pas pu cibler l'URL : le site n'est pas encore en ligne et les scripts bloquent les IP
locales (anti-SSRF). À relancer sur l'URL de production après déploiement.

Score global estimé : **Bon (≈ 85/100)**. Base technique solide, quelques optimisations faites.

## Résumé par catégorie

| Catégorie | État | Détail |
|---|---|---|
| Technique (crawl, canonical, robots, sitemap) | ✅ Pass | canonical sur chaque page, sitemap 194 URL, robots OK, `html lang=fr` |
| Données structurées (JSON-LD) | ✅ Pass | Organization, WebSite, ProductGroup, Article, BreadcrumbList valides |
| On-page (title / meta / Hn) | ✅ Corrigé | metas ramenées ≤ 155 car. ; H1 nettoyé |
| Maillage interne | ✅ Pass | pilier + grappes ; 19-23 liens/article vers l'encyclopédie |
| Open Graph / Twitter | ✅ Pass | og:title/description/image 1200×630, twitter summary_large_image |
| GEO / AEO (IA de recherche) | ✅ Amélioré | `/llms.txt` ajouté ; robots autorise les crawlers IA |
| Performance (Core Web Vitals) | ⏳ À mesurer | nécessite l'URL de production (PageSpeed) |
| Images | ℹ️ Info | illustrations SVG (alt présents) ; pas de photos produit |
| hreflang | ℹ️ N/A | site monolingue (fr) |

## Constats et correctifs

### 🔴 Critique
Aucun.

### ⚠️ Élevé — CORRIGÉ
1. **Meta descriptions trop longues** (accueil 208, fiche produit 222, encyclopédie 227 car.,
   tronquées par Google). → `metaDescription` courte pour l'accueil + helper `clampMeta` (≤155)
   sur fiches produit et fiches de recherche. Vérifié : 148 / 150 / 151 car.

### 🟡 Moyen — CORRIGÉ
2. **H1 diluée** : le H1 des fiches produit englobait le sous-titre « Peptide de grade recherche ».
   → sous-titre sorti du `<h1>` (désormais `<p>`). H1 = nom du produit uniquement.
3. **Pas de `llms.txt`** (lisibilité par les IA de recherche). → route `/llms.txt` générée depuis
   le catalogue (catégories, 79 fiches encyclopédie, articles, pages clés).

### 🔵 Faible / Info
4. **Schéma FAQPage** présent sur accueil, fiches et FAQ. Depuis 2023, Google ne génère plus de
   rich results FAQ hors sites gouvernementaux/santé. Sans danger (toujours lu par certaines IA),
   mais sans effet rich-result. Option : le retirer pour alléger. **Laissé en place** (utile GEO).
5. **Titres d'articles** parfois longs (ex. 79 car. avec « · Skyalys »). Acceptable ; mot-clé en tête.
6. **Images** : illustrations vectorielles. Ajouter de vraies photos produit améliorerait l'EEAT visuel.

## À faire après mise en ligne
- Relancer `agentic-seo` sur l'URL de production (PageSpeed/CWV, liens cassés, en-têtes).
- Soumettre le sitemap dans Google Search Console.
- Vérifier l'indexation et les Core Web Vitals réels.
