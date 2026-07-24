# Portfolio — Thibault M. E. Randrasana

Site portfolio statique (Next.js App Router + TypeScript + Tailwind CSS v4 +
Motion), bilingue FR/EN, sans backend ni base de données. Déployé sur Vercel.

## Démarrer en local

```bash
npm install
npm run dev     # http://localhost:3000 (redirige vers /fr ou /en)
npm run build   # build de production
npm run lint    # ESLint
```

## Direction

Éditorial institutionnel contemporain, illustré mais sobre. Fond ivoire, texte
anthracite. **Deux teintes pastel très désaturées en accents seulement** — rose
poudré (`--color-rose`) et bleu brumeux (`--color-blue`) — utilisées pour les
liserés de capsule, les nœuds/segments des diagrammes, les badges et les
soulignements. Elles ne servent **jamais** de fond de page ou de section, ni de
texte courant, ni du CTA principal (qui reste anthracite). Les teintes sont
définies dans `src/app/globals.css` — si l'une commence à paraître vive, la
désaturer.

## Modifier le contenu sans toucher au code

Tout le texte vit dans deux fichiers JSON, à parité stricte de structure :

```
locales/fr.json
locales/en.json
```

Chaque clé française a un équivalent exact (même chemin) en anglais. Grandes
sections :

- `meta` — SEO par défaut
- `nav`, `footer` — navigation et pied de page
- `home` — accueil : `hero` + `proof` (les 3 compteurs)
- `missions` — `filters` (nature / zone), `format` (libellés de fiche) et
  `capsules[]` : **les six expériences**. Chaque capsule contient son en-tête
  (`role`, `org`, `periode`), son `keyFigure`, son `summary`, sa `teinte`
  (`rose` / `blue` / `mix`), sa `nature`, ses `zones`, sa fiche complète
  (`commanditaire`, `financement`, `perimetre`, `livrables`, `resultat`,
  `enseignement`), les données de son `diagram`, et un éventuel emplacement
  `media`. La capsule `recherche` porte en plus le bloc `research` (méthodologie,
  sommaire, résumé exécutif, aperçu PDF).
- `expertise` — blocs de compétences (domaines, zone, langues, outils,
  formation, engagements, production éditoriale)
- `contact`, `common`

Les **diagrammes-signatures** des capsules sont codés en SVG
(`src/components/diagrams/CapsuleDiagram.tsx`) et se construisent automatiquement
à partir des données `diagram` de chaque capsule dans le JSON — modifier les
libellés dans le JSON suffit.

### Coordonnées, documents et photo

Valeurs identiques dans les deux langues, regroupées dans un seul fichier :

```
src/lib/contact-info.ts
```

`EMAIL`, `PHONE`, `LINKEDIN_URL`, `CV_FR_URL`, `CV_EN_URL`, `THESIS_PDF_URL`,
`PORTRAIT_URL`. Tant qu'une valeur est vide (`""`), le site affiche le
placeholder correspondant ; dès qu'elle est renseignée, le lien (mailto, tel,
LinkedIn, téléchargement, image) s'active seul.

## Emplacements visuels (aucune image n'est générée)

Le site n'embarque **aucune** image, logo ou photo — uniquement des emplacements
proprement dimensionnés (ratio fixé, texte alternatif, cadre vide soigné) via le
composant `src/components/ui/ImagePlaceholder.tsx`. Pour activer un visuel :

1. Déposer le fichier dans `public/images/`.
2. Renseigner l'URL au bon endroit :
   - **Photo professionnelle (hero, N&B)** → `PORTRAIT_URL` dans `contact-info.ts`.
   - **Visuels de capsule** (extraits de rapport GEFP, couverture du mémoire,
     galerie Global Forum WTC, capture PopnBuy) → le champ `media` de la capsule
     concernée n'est pour l'instant qu'un placeholder ; ajouter le chemin de
     l'image et adapter `ImagePlaceholder` (prop `src`) dans
     `src/components/missions/CapsuleModal.tsx`.
   - **Thèse (PDF)** → `THESIS_PDF_URL` (active le téléchargement dans la fiche
     Recherche). Exporter le PDF depuis Word pour préserver la couverture.

## Structure du projet

```
src/app/[locale]/            pages : accueil, missions, expertise, contact
src/app/[locale]/layout.tsx  <html>/<body>, polices, header/footer, JSON-LD Person
src/middleware.ts            redirection "/" vers "/fr" ou "/en"
src/components/missions/     capsules : carte, fiche (modale), explorateur + filtres
src/components/diagrams/     les six diagrammes-signatures SVG
src/components/ui/           Modal, ImagePlaceholder, Accordion, SectionTitle
src/components/layout/       header, footer, transitions, curseur, bascule FR/EN
src/lib/                     i18n, dictionnaires, types de capsule, contact-info
locales/                     contenu textuel FR/EN
public/documents/            CV, thèse (à déposer)
public/images/               photo, visuels de capsule (à déposer)
```

## Accessibilité et animation

- `prefers-reduced-motion: reduce` respecté partout : diagrammes et transitions
  figés, site pleinement lisible sans mouvement.
- Navigation clavier complète ; modales avec `role="dialog"`, fermeture Échap /
  clic sur le fond ; accordéons natifs `<details>`.
- Contraste AA (ivoire / anthracite ; les pastels ne portent jamais de texte).

## Déploiement

Projet Next.js standard : import direct sur Vercel, aucune variable
d'environnement requise.

## À compléter / à vérifier avant mise en ligne

Tous laissés en placeholder — aucune donnée inventée :

- **Email pro**, **Téléphone**, **Lien LinkedIn** — `src/lib/contact-info.ts`
- **CV (FR)** et **CV (EN)** — PDF à déposer + `CV_FR_URL` / `CV_EN_URL`
- **Thèse (PDF)** — `THESIS_PDF_URL` (le sommaire et le résumé exécutif sont déjà
  en ligne dans la fiche Recherche, extraits du mémoire)
- **Photo professionnelle (hero)** — `PORTRAIT_URL`
- **Visuels de capsule** — extraits de rapport GEFP, couverture du mémoire,
  photos du Global Forum (WTC), capture de popnbuy.eu → `public/images/`
- **Liens vers les chroniques publiées** (Journal de l'Étudiant / Inskahier) —
  `expertise.editorial.linksPlaceholder`
- **[À VÉRIFIER]** le chiffre de ~50 000 abonnés et « meilleur engagement par
  publication » de la chronique *La Société c'est toi* — si l'un des deux n'est
  pas documentable, retirer le chiffre et garder une formulation qualitative
  (voir `expertise.editorial.verificationNote`).

Aucun autre chiffre, qualificatif de séniorité ou montant n'a été ajouté au-delà
du brief.
