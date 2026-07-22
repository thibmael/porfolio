# Portfolio — Thibault M. E. Randrasana

Site portfolio statique (Next.js App Router + TypeScript + Tailwind CSS v4 +
Motion), bilingue FR/EN, sans backend ni base de données. Déployé sur Vercel.

## Démarrer en local

```bash
npm install
npm run dev
```

Le site est disponible sur `http://localhost:3000` (redirection automatique
vers `/fr` ou `/en` selon la langue du navigateur).

```bash
npm run build   # build de production
npm run lint    # ESLint
```

## Modifier le contenu sans toucher au code

Tout le texte du site vit dans deux fichiers JSON, avec une parité stricte de
structure entre les deux langues :

```
locales/fr.json
locales/en.json
```

Chaque clé du fichier français a un équivalent exact (même chemin, même
forme) dans le fichier anglais. Pour modifier un texte affiché sur le site,
cherchez la clé correspondante dans les deux fichiers et éditez la valeur —
aucune modification de composant n'est nécessaire.

Structure générale :

- `meta` — titres/descriptions SEO par défaut
- `nav`, `footer` — navigation et pied de page
- `home` — page d'accueil (hero, 3 blocs de preuve, carte maritime, aperçus de sections)
- `missions` — page Missions : chronologie interactive + 4 études de cas
- `recherche` — page Recherche (mémoire de master)
- `expertise` — page Expertise
- `contact` — page Contact
- `common` — libellés génériques réutilisés (boutons, états)

### Coordonnées et documents (email, téléphone, LinkedIn, CV, thèse)

Ces valeurs sont identiques dans les deux langues et vivent donc à part, dans
un seul fichier :

```
src/lib/contact-info.ts
```

Tant qu'une valeur y est vide (`""`), le site affiche automatiquement le
placeholder correspondant (`[À COMPLÉTER : …]`) au lieu d'un lien cassé.
Dès qu'une valeur est renseignée, le lien (mailto, tel, LinkedIn,
téléchargement) s'active tout seul — aucun autre fichier à modifier.

Pour les documents (CV, thèse) :

1. Déposer le fichier dans `public/documents/` (ex. `cv-thibault-randrasana-fr.pdf`).
2. Renseigner le chemin correspondant dans `src/lib/contact-info.ts`
   (ex. `CV_FR_URL = "/documents/cv-thibault-randrasana-fr.pdf"`).

### Visuels des études de cas (slides ZLECAf, photos WTC)

Ces deux emplacements sont actuellement des cadres en pointillés (aucune
image livrée avec ce brief). Pour les activer :

1. Déposer les images dans `public/images/`.
2. Dans `src/components/missions/CaseStudySection.tsx`, remplacer le
   composant `MediaPlaceholder` par des balises `<Image>` (`next/image`)
   pointant vers les fichiers ajoutés, pour les études de cas concernées
   (`zlecaf` et `wtc`).

## Structure du projet

```
src/app/[locale]/            pages : accueil, missions, expertise, recherche, contact
src/app/[locale]/layout.tsx  <html>/<body>, polices, header/footer, JSON-LD Person
src/middleware.ts            redirection "/" vers "/fr" ou "/en" selon Accept-Language
src/components/              composants React (layout, home, map, missions, recherche, contact, ui)
src/lib/                     i18n, dictionnaires, données de la carte, coordonnées de contact
locales/                     contenu textuel FR/EN
public/documents/            CV, thèse (à déposer)
public/images/               visuels des études de cas (à déposer)
```

## Accessibilité et animation

- `prefers-reduced-motion: reduce` est respecté globalement (voir
  `src/app/globals.css`) : toute animation est neutralisée et le site reste
  intégralement lisible et utilisable sans mouvement.
- Navigation clavier complète (liens, filtres, points de la chronologie,
  accordéons natifs `<details>`).
- Contraste des couleurs pensé pour un minimum AA (fond ivoire / encre
  anthracite / accent bleu ardoise).

## Déploiement

Le projet est un projet Next.js standard : import direct sur Vercel, sans
configuration additionnelle. Aucune variable d'environnement n'est requise
(pas de backend, pas de base de données).

## À compléter / à vérifier avant mise en ligne

Ces éléments sont volontairement laissés en placeholder — aucune donnée n'a
été inventée pour les remplacer :

- **Email professionnel** — `src/lib/contact-info.ts` → `EMAIL`
- **Téléphone** — `src/lib/contact-info.ts` → `PHONE`
- **Lien LinkedIn** — `src/lib/contact-info.ts` → `LINKEDIN_URL`
- **CV (FR)** et **CV (EN)** — fichiers PDF à déposer + `CV_FR_URL` / `CV_EN_URL`
- **Thèse (PDF)** — fichier à déposer dans `public/documents/` + `THESIS_PDF_URL` dans `src/lib/contact-info.ts` (active l'aperçu intégré et le téléchargement sur `/recherche`). Exporter le PDF depuis Word pour préserver la page de couverture. Le sommaire des chapitres et le résumé exécutif sont déjà en ligne (extraits du mémoire).
- **Liens vers les chroniques publiées** (Journal de l'Étudiant / Inskahier) — `expertise.editorial.linksPlaceholder`
- **[À VÉRIFIER]** Chiffre de ~50 000 abonnés et « meilleur engagement par publication » pour la chronique *La Société c'est toi* — si l'un des deux n'est pas documentable, retirer le chiffre et garder une formulation qualitative (voir `expertise.editorial.verificationNote` et le texte de l'item lui-même)
- **Visuels ZLECAf** (extraits de rapport / slides anonymisées) — à déposer dans `public/images/`, voir section ci-dessus
- **Photos WTC Global Forum** — à déposer dans `public/images/`, voir section ci-dessus

Aucun autre chiffre, qualificatif de séniorité ou montant n'a été ajouté
au-delà de ce qui figurait dans le brief d'origine.
