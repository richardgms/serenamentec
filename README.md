# 🌱 Serenamente

Aplicação web mobile-first para suporte e autoconhecimento para pessoas com TEA e TDAH.

## 🎯 Sobre o Projeto

O Serenamente é uma plataforma acolhedora que oferece ferramentas de:
- 🫁 **Respiração guiada** - Exercícios de breathing com padrões personalizáveis
- 🎵 **Acalmação** - Vídeos sensoriais calmantes (natureza, ruído branco, ASMR)
- 💭 **Autoconhecimento** - Jornadas educativas e exploração de tópicos
- 📊 **Tracking** - Registro de humor, crises e conquistas

## 🚀 Stack Tecnológica

- **Framework:** Next.js 14+ (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Banco de Dados:** Supabase (PostgreSQL)
- **ORM:** Prisma
- **Autenticação:** Clerk
- **Deploy:** Vercel

## 📁 Estrutura do Projeto

```
serenamentec/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── sign-in/           # Autenticação
│   ├── sign-up/           # Cadastro
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes base (Button, Card, etc)
│   └── layout/           # Componentes de layout
├── lib/                   # Utilitários e configurações
│   └── prisma.ts         # Cliente Prisma
├── prisma/               # Schema e seeds do banco
│   ├── schema.prisma
│   └── seed.ts
├── public/               # Assets estáticos
├── types/                # Tipos TypeScript
└── plan/                 # Documentação do projeto
```

## 🎨 Design System

### Cores
- **Primary:** `#84C2BE` - Tom acolhedor verde-água
- **Secondary:** `#ACFFF9` - Destaque suave
- **Background:** `#FFFFF9` - Branco quente
- **Surface:** `#EFFFEA` - Verde claro suave

### Princípios
- Mobile-first (max-width: 428px)
- Flat design minimalista
- Tom acolhedor e empático
- Microinterações suaves

## 🛠️ Setup Local

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta no Supabase
- Conta no Clerk

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repo>
cd serenamentec
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Copie `.env.local` e preencha com suas credenciais:
```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
```

4. Configure o banco de dados:
```bash
npm run db:push
npm run db:seed
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Acesse http://localhost:3000

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa linter
- `npm run db:generate` - Gera cliente Prisma
- `npm run db:push` - Sincroniza schema com banco
- `npm run db:studio` - Abre Prisma Studio
- `npm run db:seed` - Popula banco com dados iniciais

## 📊 Status do Projeto

- ✅ **ETAPA 1:** Setup e Configuração Inicial - CONCLUÍDA
- ⏳ **ETAPA 2:** Autenticação e Onboarding - Pendente
- ⏳ **ETAPA 3:** Home e Navegação - Pendente
- ⏳ **ETAPA 4-14:** Em planejamento

## 📄 Licença

Este projeto está em desenvolvimento.

---

Desenvolvido com 💚 para a comunidade neurodivergente
