# EDU - Solution de Gestion Scolaire (Maroc)

Solution complète de gestion scolaire inspirée par [Minassa](https://minassa.ma/), optimisée pour le marché marocain.

## Fonctionnalités Clés

- **Tableaux de bord multi-rôles :** Admin, Enseignants, Parents.
- **Gestion des Élèves & Classes :** Inscriptions, affectations, export CSV.
- **Cahier de Texte Digital :** Suivi des leçons et devoirs en temps réel.
- **Système de Notation :** Saisie des notes par les professeurs, consultation par les parents.
- **Pointage & Présences :** Pointage des enseignants (Clock-in) et présence des élèves.
- **Messagerie Interne :** Communication fluide entre l'administration, les profs et les parents.
- **Notifications :** Alertes en temps réel pour les notes, absences et messages.
- **Cantine & Finances :** Gestion des menus et suivi des paiements des frais de scolarité.

## Technologies Utilisées

- **Frontend :** Next.js 15 (App Router), Tailwind CSS, Framer Motion, Lucide React, Recharts.
- **Backend/Base de données :** Prisma ORM, PostgreSQL (Compatible Supabase/Neon/Vercel Postgres).
- **Sécurité :** Authentification JWT sécurisée (HttpOnly Cookies), Hachage Bcryptjs.

## Déploiement sur Vercel

1. **Base de données :** Créez une instance PostgreSQL (ex: [Supabase](https://supabase.com/) ou [Neon](https://neon.tech/)).
2. **Configuration Vercel :**
   - Connectez votre dépôt à Vercel.
   - Ajoutez les variables d'environnement suivantes dans les paramètres du projet :
     - `DATABASE_URL` : Votre URL de connexion PostgreSQL.
     - `DIRECT_URL` : Votre URL directe PostgreSQL.
     - `JWT_SECRET` : Une chaîne aléatoire longue et sécurisée.
3. **Build :** Le déploiement lancera automatiquement `prisma generate` via le script `postinstall`.

## Installation Locale

```bash
# 1. Cloner le projet
git clone <votre-repo>

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.example .env
# Remplissez .env avec vos accès PostgreSQL

# 4. Initialiser la base de données
npx prisma db push
npx prisma db seed

# 5. Lancer le serveur
npm run dev
```

### Identifiants de test (après Seed)
- **Admin :** `admin@edu.ma` / `password123`
- **Professeur :** `salma@edu.ma` / `password123`
- **Parent :** `parent@email.com` / `password123`
