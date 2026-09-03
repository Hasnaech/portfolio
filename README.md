# Portfolio — Hasnae Chnaif

Site personnel de **Hasnae Chnaif**, consultante & ingénieure IA
(growth marketing, agents IA pour PME, Business Intelligence, formation).

**En ligne :** https://hasnaech.github.io/portfolio/
**CV :** [CV-Hasnae-Chnaif-2026.pdf](CV-Hasnae-Chnaif-2026.pdf)

## Contenu

| Fichier | Rôle |
|---|---|
| `index.html` | Le site entier — HTML, CSS et JS dans un seul fichier, photo incluse en base64. Aucune dépendance externe. |
| `CV-Hasnae-Chnaif-2026.pdf` | Le CV téléchargeable depuis les deux boutons « Télécharger le CV ». |
| `og-image.jpg` | Aperçu 1200×630 affiché quand le lien est partagé (LinkedIn, Slack, WhatsApp…). |

## Mettre à jour le CV

Remplacer `CV-Hasnae-Chnaif-2026.pdf` en gardant le même nom de fichier,
puis pousser sur `main` — les liens du site continuent de fonctionner.

Le CV est généré depuis `opportunité Pour Hasnae/cv_generator` :

```bash
python3 render.py profiles/base_formateur.json
```

## Modifier le site

Tout est dans `index.html`. Ouvrir le fichier directement dans un navigateur
pour prévisualiser, puis pousser sur `main` : GitHub Pages redéploie tout seul.
