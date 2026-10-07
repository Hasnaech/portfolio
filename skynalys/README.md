# Skynalys : boutique B2B de peptides de recherche

Site e-commerce Next.js 15 (App Router) pour laboratoires, CRO et centres de recherche clinique.
Structure et fonctionnalités inspirées de l'analyse d'optima-labs.eu, avec des contenus originaux et un positionnement B2B vérifié.

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
npm run typecheck
```

## Déployer sur Vercel

1. Vercel > Add New > Project > importer le dépôt GitHub.
2. **Root Directory : `skynalys`** (le dépôt contient aussi le portfolio).
3. Framework détecté automatiquement : Next.js. Aucun réglage de build à changer.
4. Variables d'environnement (voir `.env.example`) :
   - `NEXT_PUBLIC_SITE_URL` : URL définitive, par exemple `https://skynalys.eu`
   - `RESEND_API_KEY`, `ORDERS_EMAIL_TO`, `EMAIL_FROM` : pour recevoir commandes, devis et demandes par email
5. Ajouter le domaine dans Settings > Domains.

Sans `RESEND_API_KEY`, les commandes et formulaires sont acceptés mais seulement écrits dans les logs Vercel.

## Où modifier quoi

| Besoin | Fichier |
|---|---|
| Couleurs de la charte | `src/app/globals.css`, bloc `:root` en haut du fichier |
| Polices | `src/app/layout.tsx` (`Inter`, `Manrope`) |
| Nom, coordonnées, SIREN, TVA, seuil de livraison | `src/lib/site.ts` |
| Produits, prix, conditionnements, catégories | `src/lib/catalog.ts` |
| Lots, COA et FDS publiés | `src/lib/catalog.ts`, tableau `batches` |
| Remises par quantité | `src/lib/pricing.ts` |
| Articles du blog | `src/lib/blog.ts` |
| Pages légales | `src/lib/legal.ts` |
| Logo | `src/components/Logo.tsx` et `src/app/icon.svg` |

## Fonctionnalités

- Bandeau de réassurance défilant, méga-menu, recherche instantanée (nom, synonyme, CAS)
- Filtre d'entrée « professionnels de la recherche » avec attestation
- Catalogue filtrable (catégorie, format, tri), pages catégories avec guides associés
- Fiche produit : variantes, tarif dégressif sur 5 paliers, ventes additionnelles, identité chimique, lots, références, FAQ
- Panier latéral avec jauge de livraison offerte, page panier, conversion en devis
- Commande B2B : établissement, TVA, bon de commande, virement, option chaîne du froid, autoliquidation, attestation d'usage. Prix recalculés côté serveur
- Compte pro, demande de devis, contact, newsletter (routes `src/app/api/*`)
- Page Analyses et COA avec recherche par lot, calculateur de molarité et de dilution
- SEO : métadonnées par page, canonicals, `sitemap.xml`, `robots.txt`, flux RSS, images Open Graph générées, JSON-LD (Organization, WebSite, ProductGroup, BreadcrumbList, FAQPage, Article)

## Avant la mise en ligne

- [ ] Remplacer les couleurs provisoires par la charte Skynalys
- [ ] Compléter les champs entre crochets de `src/lib/site.ts` (raison sociale, adresse, SIREN, TVA, téléphone)
- [ ] Faire valider les pages légales et les CGV par un juriste, ainsi que la conformité de la vente de chaque référence dans les pays desservis
- [ ] Vérifier chaque donnée chimique (CAS, formule, masse molaire) contre le certificat du fournisseur ; les champs inconnus sont laissés vides volontairement
- [ ] Renseigner les vrais numéros de lot, puretés et liens COA / FDS dans `batches`. Ne publier que des analyses réelles
- [ ] S'assurer que chaque engagement affiché (analyses tierces, chaîne du froid, délais, paiement à 30 jours) est réellement tenu
- [ ] Brancher l'envoi d'emails (Resend) et, si besoin, un paiement par carte (Stripe) et une base de données pour les comptes
- [ ] Remplacer les illustrations de flacons par de vraies photos
