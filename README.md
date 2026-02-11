# Careway Medical Chatbot

AI-powered medical symptom assessment and consultation application built with Next.js.

## Getting Started

### Local Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
pnpm build
pnpm start
```

## Deployment

### Railway Deployment

This project is configured for Railway deployment.

#### Prerequisites
1. Install Railway CLI: `curl -fsSL https://railway.app/install.sh | sh`
2. Login to Railway: `railway login` (opens browser for authentication)

#### Deploy Steps

1. **Login to Railway:**
   ```bash
   railway login
   ```

2. **Initialize Railway project:**
   ```bash
   railway init
   ```
   This will create a new Railway project or link to an existing one.

3. **Deploy to Railway:**
   ```bash
   railway up
   ```
   This will build and deploy your application to Railway.

4. **Get your deployment URL:**
   ```bash
   railway domain
   ```

#### Alternative: Deploy via Railway Dashboard

1. Go to [railway.app](https://railway.app)
2. Create a new project
3. Connect your GitHub repository: `https://github.com/M3rfan11/caraway-assistant.git`
4. Railway will automatically detect Next.js and deploy

## Configuration

- **Framework:** Next.js 16.1.6
- **Package Manager:** pnpm
- **UI Components:** shadcn/ui with Radix UI
- **Styling:** Tailwind CSS

## Project Structure

```
├── app/              # Next.js app router pages
├── components/        # React components
├── lib/              # Utility functions
├── public/           # Static assets
└── styles/           # Global styles
```
