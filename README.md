# Portfolio interactif — Thibault M. E. Randrasana

Portfolio statique (Next.js App Router + TypeScript + Tailwind v4 + Motion),
bilingue FR/EN, sans backend. Une **galerie de projets cliquables** : chaque
expérience possède une carte et une page détaillée à son propre lien.

## Démarrer

```bash
npm install
npm run dev     # http://localhost:3000 (redirige vers /fr ou /en)
npm run build   # production
npm run lint
```

## Pages

- `/[locale]` — accueil (hero + preuves rapides + aperçu de 3 projets)
- `/[locale]/parcours` — galerie mosaïque + filtres (type / zone / période)
- `/[locale]/parcours/[slug]` — page détaillée d'un projet
- `/[locale]/profil` — profil (domaines, zones, langues, outils)
- `/[locale]/contact` — contact

## Modifier le contenu sans toucher au code

Tout le texte vit dans `locales/fr.json` et `locales/en.json`, à **parité de
structure stricte** (même chemin de clé dans les deux langues).

### Ajouter / modifier une carte-projet

Chaque projet est un objet du tableau `projects` (dans les deux fichiers de
langue). Champs principaux :

- `slug` — identifiant d'URL (identique FR/EN)
- `format` — `featured` · `wide` · `vertical` · `standard` · `compact`
- `teinte` — `rose` · `blue` (accent pastel de la carte et de la fiche)
- `type` — clé de filtre (`pro`, `conseil`, `recherche`, `entrepreneuriat`, `formation`, `engagement`)
- `zones` — `["madagascar","france","suisse","europe","international"]`
- `period` — `recent` · `old`
- `org`, `role`, `periode`, `location`, `category`, `summary`, `metric`, `tags`
- fiche : `contexte`, `monRole`, `travail[]`, `resultats[]`, `issue`, `enseignement`
- spécifiques : `ports[]` (MSC), `steps[]` (Ploutos), `evolving[]` (PopnBuy), `thesis{}` (mémoire), `externalLink`

Pour **créer une nouvelle carte** : ajouter un objet dans `projects` (fr **et**
en, mêmes `slug`), puis une entrée dans `PROJECT_MEDIA` (voir ci-dessous). La
page détaillée et la route sont générées automatiquement.

### Filtres

Les options de filtre viennent de `parcours.filters` (types / zones / periods)
dans les fichiers de langue. Le `type`, les `zones` et le `period` de chaque
projet doivent utiliser ces clés.

## Images et logos (rien n'est généré)

Aucune image n'est embarquée : chaque emplacement affiche un cadre soigné avec
le **nom de fichier attendu**. Pour activer un visuel :

1. Déposer le fichier dans le bon dossier de `public/images/`
   (`profile/`, `experiences/`, `education/`, `engagements/`, `editorial/`).
2. Renseigner le chemin dans **`src/lib/project-media.ts`** :

```ts
export const PROJECT_MEDIA = {
  "msc-eastmed": { cover: "/images/experiences/msc-eastmed.jpg", logo: "", gallery: [] },
  // ...
};
```

- `cover` — image de couverture (carte du parcours **et** bannière de la fiche)
- `logo` — logo carré (fallback des cartes compactes)
- `gallery` — images de la section « Galerie et documents » (jusqu'à 3 affichées)
- `document` — PDF (ex. mémoire)

Les **14 projets** sont prêts pour les photos : chacun a un slot `cover` et
`gallery`. Tant qu'un slot est vide, un repère discret indique où déposer la
photo (picto appareil sur les cartes, nom de fichier attendu sur la bannière et
la galerie) ; il disparaît dès qu'un vrai fichier est renseigné. Les noms
suggérés vivent dans `SUGGESTED_COVER` et `SUGGESTED_GALLERY` du même fichier.

Le **texte alternatif** de chaque image reste dans les fichiers de langue
(`imageAlt`), donc traduit. La **photo de profil** (hero) se règle via
`PORTRAIT_URL` dans `src/lib/contact-info.ts`.

## Coordonnées et documents

`src/lib/contact-info.ts` : `EMAIL`, `PHONE`, `LINKEDIN_URL`, `CV_FR_URL`,
`CV_EN_URL`, `THESIS_PDF_URL`, `PORTRAIT_URL`. Une valeur vide affiche son
placeholder ; renseignée, le lien s'active seul.

## Bilingue

Bascule FR/EN sans rechargement, position de scroll conservée, filtre actif
préservé (stocké dans l'URL). Les deux langues doivent rester équivalentes.

## Direction & accessibilité

- Typographie **sans-serif** (Outfit en titres + Work Sans en texte), page
  blanche, texte anthracite, **deux accents pastel — rose poudré `#b05a75` et
  bleu poudré `#5178a0`** ; chaque projet prend le sien selon sa `teinte`.
- Animations discrètes (`transform`/`opacity`), `prefers-reduced-motion`
  respecté, navigation clavier, focus visibles, contraste AA.

## Déploiement

Projet Next.js standard : import direct sur Vercel, aucune variable
d'environnement requise.

## À compléter avant mise en ligne

Placeholders visibles, rien inventé :

- **Email**, **téléphone**, **LinkedIn** — `src/lib/contact-info.ts`
- **CV FR/EN**, **thèse PDF**, **photo de profil** — idem + fichiers dans `public/`
- **Visuels de chaque projet** (couvertures + galeries des 14 projets) —
  `public/images/{experiences,education,engagements,editorial}/` +
  `src/lib/project-media.ts`. Les noms de fichiers attendus s'affichent
  directement dans les emplacements vides ; ils sont listés dans
  `SUGGESTED_COVER` / `SUGGESTED_GALLERY`. La **photo de profil** va dans
  `PORTRAIT_URL` (`src/lib/contact-info.ts`).
- **[À VÉRIFIER]** : ~50 000 abonnés et « meilleur engagement par publication »
  du *Journal de l'Étudiant* (carte `journal-etudiant`) — si non documentable,
  retirer le chiffre.
- **PopnBuy** — indicateurs `evolving` marqués `[À COMPLÉTER]` à mettre à jour au
  fil du projet (vendeurs inscrits, premiers lives, volume de ventes).

Ces marqueurs `[À COMPLÉTER]` / `[À VÉRIFIER]` sont volontairement visibles pour
être repérés avant déploiement.
