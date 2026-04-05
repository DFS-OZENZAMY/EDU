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

## Production Deployment on Vercel (CRITICAL)

Ce prototype utilise **SQLite** (`prisma/dev.db`) pour le développement local. Cependant, le système de fichiers de Vercel est **en lecture seule** au moment de l'exécution (runtime).

**Pour déployer en production :**

1.  **Créez une base de données managée :** Utilisez [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) ou un autre fournisseur PostgreSQL (Neon, Supabase).
2.  **Mettez à jour le `.env` :** Ajoutez `POSTGRES_PRISMA_URL` et `POSTGRES_URL_NON_POOLING`.
3.  **Mettez à jour `prisma/schema.prisma` :**
    ```prisma
    datasource db {
      provider = "postgresql"
      url      = env("POSTGRES_PRISMA_URL")
      directUrl = env("POSTGRES_URL_NON_POOLING")
    }
    ```
4.  **Exécutez les migrations :** `npx prisma migrate deploy`

## Développement local

```bash
npm install
npx prisma db push
npx ts-node prisma/seed.ts
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir le résultat.

### Identifiants de test (Seed)
- **Admin :** `admin@edu.ma` / `password123`
- **Professeur :** `salma@edu.ma` / `password123`
- **Parent :** `parent@email.com` / `password123`
