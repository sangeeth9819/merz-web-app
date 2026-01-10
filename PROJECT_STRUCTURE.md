# Merz Banking Portal - Project Structure

## 📁 Directory Structure

```
merz-web-app/
├── app/
│   ├── (auth)/              # Authentication routes (grouped)
│   │   └── login/
│   ├── (dashboard)/         # Protected dashboard routes (grouped)
│   │   ├── dashboard/       # Main dashboard
│   │   ├── transactions/    # Transaction history
│   │   ├── recipients/      # Manage recipients
│   │   ├── accounts/        # Account management
│   │   └── settings/        # User settings
│   ├── api/                 # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── payments/        # Payment processing
│   │   └── transactions/    # Transaction queries
│   ├── globals.css          # Global styles with shadcn variables
│   ├── layout.tsx           # Root layout with font config
│   └── page.tsx             # Home page (redirects to dashboard)
│
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── dashboard/           # Dashboard-specific components
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   ├── account-balance.tsx
│   │   └── recent-transactions.tsx
│   ├── payment/             # Payment flow components
│   └── auth/                # Authentication components
│
├── lib/
│   ├── utils.ts             # Utility functions (cn, etc.)
│   ├── auth/                # Authentication logic
│   │   └── session.ts
│   ├── validations/         # Input validation
│   │   └── payment.ts
│   └── db/                  # Database utilities
│
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript type definitions
│   └── index.ts
│
├── public/
│   └── fonts/               # Google Sans Flex font files
│
└── config files...
```

## 🔐 Security Features Implemented

1. **HTTP Security Headers** (next.config.ts):
   - HSTS (Strict Transport Security)
   - X-Frame-Options (Clickjacking protection)
   - X-Content-Type-Options (MIME type sniffing)
   - CSP (Content Security Policy)
   - XSS Protection
   - Referrer Policy
   - Permissions Policy

2. **Authentication & Authorization**:
   - Session management utilities
   - Rate limiting for sensitive operations
   - Auth guards for protected routes

3. **Input Validation**:
   - Payment data validation
   - Account number validation
   - XSS prevention in descriptions

4. **Type Safety**:
   - Full TypeScript coverage
   - Strict type definitions for all entities

## 🎨 Design System

- **UI Framework**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **Font**: Google Sans Flex (configured for local hosting)
- **Theme**: Light/Dark mode support with CSS variables
- **Colors**: 
  - Primary: Teal/Turquoise (matching reference design)
  - Secondary: Slate
  - Accent colors for charts and data visualization

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Download Google Sans Flex font**:
   - Visit: https://fonts.google.com/specimen/Google+Sans+Flex
   - Download Regular (400), Medium (500), Bold (700) weights
   - Place .woff2 files in `public/fonts/`

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run development server**:
   ```bash
   pnpm dev
   ```

## 📦 Next Steps

1. **Authentication**:
   - Install NextAuth.js: `pnpm add next-auth`
   - Configure providers (Email, OAuth, etc.)
   - Implement login/logout flows

2. **Database**:
   - Choose DB (PostgreSQL recommended for banking)
   - Install Prisma or Drizzle ORM
   - Create schema based on types in `types/index.ts`

3. **Payment Integration**:
   - Integrate payment gateway APIs
   - Implement payment processing workflows
   - Add transaction status tracking

4. **Additional Components**:
   - Payment form with recipient selection
   - Bulk payment interface
   - Transaction filtering and search
   - Account statements

5. **Testing**:
   - Unit tests (Vitest)
   - Integration tests (Playwright)
   - E2E tests for critical payment flows

6. **Monitoring**:
   - Set up error tracking (Sentry)
   - Add analytics (PostHog, etc.)
   - Implement audit logging

## 🛡️ Security Checklist

- [ ] Implement proper authentication (NextAuth.js)
- [ ] Add CSRF protection
- [ ] Implement API rate limiting
- [ ] Add request validation middleware
- [ ] Set up SSL/TLS certificates
- [ ] Implement audit logging
- [ ] Add 2FA for sensitive operations
- [ ] Encrypt sensitive data at rest
- [ ] Regular security audits
- [ ] Implement session timeout
- [ ] Add device tracking
- [ ] Set up backup systems

## 📝 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Font**: Google Sans Flex

## 🎯 Features (Based on Reference)

1. ✅ Dashboard with balance overview
2. ✅ Transaction history
3. ✅ Account management
4. ⏳ Payment processing (Single & Bulk)
5. ⏳ Recipient management
6. ⏳ Multiple payment methods (CEFT, SLIP, RGTS)
7. ⏳ Transaction filtering and search
8. ⏳ Settings & user management
9. ⏳ Real-time notifications
10. ⏳ Export functionality

✅ = Implemented | ⏳ = Pending
