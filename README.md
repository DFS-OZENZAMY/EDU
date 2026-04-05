# EDU Clone - Gestion Scolaire au Maroc

Ce projet est un clone de la landing page de [EDU](https://minassa.ma/), une solution de gestion scolaire spécifiquement conçue pour le marché marocain.

## Technologies utilisées

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (Icones)
- **Framer Motion** (Animations)

## Déploiement sur Vercel

Pour déployer ce projet sur Vercel, suivez ces étapes :

1. Connectez votre dépôt GitHub à Vercel.
2. Dans les paramètres du projet (**Project Settings**) :
   - **Framework Preset** : Choisissez `Next.js`.
   - **Root Directory** : Laissez vide (ou `./` si demandé) car le projet est à la racine.
   - **Build Command** : `npm run build`
   - **Install Command** : `npm install`
   - **Output Directory** : `.next` (par défaut pour Next.js)

Le fichier `vercel.json` à la racine configure automatiquement ces paramètres.

## Développement local

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir le résultat.
