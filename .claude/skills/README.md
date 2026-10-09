# Skills SEO installés dans ce dépôt

Ces skills sont disponibles pour les sessions Claude Code travaillant sur ce dépôt
(installation **projet**, dossier `.claude/skills/`).

| Skill | Source | Licence |
|---|---|---|
| `blog` + 31 sous-skills `blog-*` | https://github.com/AgriciDaniel/claude-blog | MIT |
| `agentic-seo` | https://github.com/Bhanunamikaze/Agentic-SEO-Skill | MIT |

Copiés tels quels depuis les dépôts officiels (code tiers, non audité ligne par ligne).
Les scripts Python associés nécessitent leurs dépendances (`requirements.txt` des dépôts
d'origine) et, pour certains, des clés d'API externes ; la méthode (fichiers SKILL.md)
fonctionne sans.

## Pour une installation personnelle (utilisable dans toute ton app Claude)

À lancer **toi-même** dans l'app Claude (impossible depuis une session cloud) :

    /plugin marketplace add AgriciDaniel/claude-blog
    /plugin install claude-blog@agricidaniel-blog

    curl -fsSL https://raw.githubusercontent.com/Bhanunamikaze/Agentic-SEO-Skill/main/install.sh | bash -s -- --online --target claude

Vérifie toujours le nom exact du plugin dans le README du dépôt au moment d'installer.
