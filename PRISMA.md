# 🗄️ Prisma Guide — Agent AI Project

> Prisma does **NOT** auto-create tables. You must run commands manually after every schema change.

---

## ⚡ Create ALL Tables (First Time Setup)

If you have a **new database** and want to create all tables at once:

### Step 1 — Set the database in `.env`
```env
DATABASE_URL="postgresql://postgres:Password@localhost:5432/your_db_name"
```

### Step 2 — Create the DB in PostgreSQL (if it doesn't exist)
```sql
CREATE DATABASE your_db_name;
```

### Step 3 — Run this ONE command to create all tables
```bash
npx prisma migrate dev --name init
```

This will create all 6 tables automatically:
- `users`
- `conversations`
- `messages`
- `assistants`
- `projects`
- `shared_chats`

### Step 4 — Regenerate Prisma Client
```bash
npx prisma generate
```

> ⚠️ **Want a fresh start?** (Deletes all data & recreates tables)
> ```bash
> npx prisma migrate reset
> ```

---

## 📁 Project Structure

```
prisma/
  schema.prisma     ← Define all your models/tables here
  migrations/       ← Auto-generated migration history (don't edit manually)

src/generated/client/  ← Auto-generated Prisma Client (don't edit manually)
```

---

## ⚙️ Environment Setup

In your `.env` file:
```env
DATABASE_URL="postgresql://postgres:Password@localhost:5432/agent_chat"
JWT_SECRET="your-secret-key"
```

> 💡 To use a **different database**, just change `agent_chat` to your new DB name in `DATABASE_URL`.

---

## 🚀 Core Commands

### 1. Create & Apply a Migration (Development)
Use this every time you **add/change a model** in `schema.prisma`:
```bash
npx prisma migrate dev --name describe_your_change
```
Example:
```bash
npx prisma migrate dev --name add_user_table
npx prisma migrate dev --name add_email_to_users
```

### 2. Regenerate Prisma Client
Run after **every** schema change so your code picks up the new types:
```bash
npx prisma generate
```

### 3. Apply Migrations (Production)
Use this in production — it only applies pending migrations, does NOT create new ones:
```bash
npx prisma migrate deploy
```

### 4. Open Prisma Studio (GUI for your DB)
Browse and edit your database visually in the browser:
```bash
npx prisma studio
```

### 5. Reset the Database (⚠️ Deletes all data)
Drops all tables and re-runs all migrations from scratch:
```bash
npx prisma migrate reset
```

### 6. Push Schema Without Migrations (Prototyping)
Quick sync without creating migration files — **not for production**:
```bash
npx prisma db push
```

### 7. Pull Schema from Existing Database
If your DB already has tables, generate `schema.prisma` from it:
```bash
npx prisma db pull
```

### 8. Check Migration Status
See which migrations have been applied:
```bash
npx prisma migrate status
```

---

## ➕ How to Add a New Table

### Step 1 — Add a model in `schema.prisma`
```prisma
model YourNewTable {
  id        String   @id @default(uuid())
  name      String
  createdAt DateTime @default(now()) @map("created_at")
  userId    String   @map("user_id")
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("your_new_table")   // ← actual table name in PostgreSQL
}
```

> Don't forget to add the reverse relation in the `User` model too:
> ```prisma
> yourNewTable YourNewTable[]
> ```

### Step 2 — Run migration
```bash
npx prisma migrate dev --name add_your_new_table
```

### Step 3 — Regenerate client
```bash
npx prisma generate
```

### Step 4 — Use it in your code
```js
import { PrismaClient } from '@/generated/client';
const prisma = new PrismaClient();

const record = await prisma.yourNewTable.create({
  data: { name: "Hello", userId: "some-user-id" }
});
```

---

## 🔌 How to Connect a New / Different Database

1. Create the new database in PostgreSQL
2. Update `.env`:
```env
DATABASE_URL="postgresql://postgres:YourPassword@localhost:5432/new_db_name"
```
3. Run migrations to set up tables in the new DB:
```bash
npx prisma migrate deploy
```
Or for a fresh start:
```bash
npx prisma migrate dev
```

---

## 📋 Current Models in This Project

| Model | Table | Description |
|---|---|---|
| `User` | `users` | App users with auth |
| `Conversation` | `conversations` | Chat sessions |
| `Message` | `messages` | Individual chat messages |
| `Assistant` | `assistants` | Custom AI assistants |
| `Project` | `projects` | Chat project groups |
| `SharedChat` | `shared_chats` | Shareable chat links |

---

## ⚠️ Important Rules

- **Always run `prisma generate`** after changing `schema.prisma`
- **Never edit migration files** manually
- **Never edit `src/generated/client/`** — it's auto-generated
- Use `migrate dev` for local/dev, `migrate deploy` for production
- The `@@map()` sets the actual PostgreSQL table name
- The `@map()` sets the actual PostgreSQL column name
