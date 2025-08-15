# Prisma Database Setup

This project uses Prisma with MySQL as the database provider.

## Database Configuration

The database connection is configured in the `.env` file with the `DATABASE_URL` variable:

```
DATABASE_URL="mysql://username:password@host:port/database_name"
```

## Prisma Schema

The Prisma schema is defined in `prisma/schema.prisma`. It includes two models:
1. `User` - Represents users with wallet information
2. `Payment` - Represents payment transactions

## Database Commands

- `npm run db:push` - Pushes the Prisma schema to the database (useful for development)
- `npm run db:migrate` - Creates and applies migrations (useful for production)

## Initial Setup

The database schema has been pushed to the MySQL database using:
```bash
npx prisma db push
```

This command was used instead of `prisma migrate dev` because the hosting provider doesn't allow creating shadow databases.

## Note on SQLite

This project was previously using SQLite. The `prisma/dev.db` file is still present but no longer used. The database has been migrated to MySQL.
