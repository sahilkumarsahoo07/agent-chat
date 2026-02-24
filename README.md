# 🤖 Agent AI - Smart Chat Interface

**Agent AI** is a premium, high-performance chat platform designed for seamless interaction with AI models. It features a robust "Projects" system for organizing conversations, custom "Assistants" for specialized tasks, and a beautiful, responsive UI.

---

## 🏗️ Folder Structure

```text
agent-ai/
├── prisma/                  # Database schema & migrations
├── public/                  # Static assets (images, icons)
├── src/                     # Core application source code
│   ├── app/                 # Next.js App Router (pages & API routes)
│   │   ├── api/             # Backend API logic
│   │   ├── assistants/      # Assistant management views
│   │   ├── chat/            # Core chat interface pages
│   │   └── project/         # Project-specific views
│   ├── components/          # Reusable React components
│   │   ├── ui/              # Base UI elements (buttons, inputs)
│   │   ├── chat-interface/  # Complex chat logic components
│   │   └── sidebar/         # Navigation & organization
│   ├── context/             # Global state (ChatContext, etc.)
│   ├── generated/           # Auto-generated Prisma client
│   └── lib/                 # Utility functions & shared logic
├── .env.local               # Local environment variables
├── next.config.mjs          # Next.js configuration
├── package.json             # Dependencies & scripts
└── README.md                # This documentation
```

---

## 🚀 Key Features

*   **Project-Based Organization**: Group your chats into logical projects.
*   **Custom Assistants**: Create and manage AI personalities with specific instructions.
*   **Versioned Messaging**: Support for editing and navigating message versions.
*   **Shared Chats**: Generate shareable links for your AI conversations.
*   **Modern UI/UX**: Built with Framer Motion, Tailwind CSS, and Lucide icons for a premium feel.

---

## 🛠️ Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   Create a `.env.local` file with your API keys and database URL:
   ```env
   DATABASE_URL="postgresql://user:pass@localhost:5432/db"
   OPENAI_API_KEY="sk-..."
   JWT_SECRET="your-secret"
   ```

3. **Database Setup:**
   ```bash
   npx prisma migrate dev
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

---

## 🔧 Maintenance & Troubleshooting

### 1. Database Management
Refer to the [Prisma Guide](file:///c:/Users/ssahoo/source/Agent/agent-ai/PRISMA.md) for schema changes.

### 2. Source Control cleanup
If you see items named `acd` or `gpp` in VS Code Source Control, these are worktrees used by Cursor's AI. To clean them up:
```powershell
Remove-Item -Path "C:/Users/ssahoo/.cursor/worktrees/agent-ai/acd" -Recurse -Force
Remove-Item -Path "C:/Users/ssahoo/.cursor/worktrees/agent-ai/gpp" -Recurse -Force
git worktree prune
```

---

## 👨‍💻 Author

**Sahil Kumar Sahoo**
*   GitHub: [@sahilkumarsahoo07](https://github.com/sahilkumarsahoo07)
*   Role: Lead Developer / Architect

---

## 📄 License & Copyright

© 2026 **Sahil Kumar Sahoo**. All rights reserved.

This project is private and intended for internal use only. Unauthorized copying or distribution of these files is strictly prohibited.

---

## 📚 Learn More

* [Next.js Documentation](https://nextjs.org/docs)
* [Prisma Documentation](https://www.prisma.io/docs)
