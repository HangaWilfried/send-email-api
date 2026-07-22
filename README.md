# Fast-Relays Mailer Service

A lightweight Node.js + TypeScript mail service for the **FAST-RELAYS Marketplace**. It exposes an API for sending transactional emails using **Resend**.

## Tech Stack

- Node.js
- TypeScript
- Express
- Resend
- Zod

---

## Prerequisites

- Node.js 18.x
- npm

---

## Installation

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=3000
NODE_ENV=development

# Email provider
RESEND_API_KEY=your_resend_api_key
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with hot reload. |
| `npm run build` | Compile the TypeScript source into the `dist` directory. |
| `npm run serve` | Start the compiled production build. |
| `npm run lint` | Run ESLint. |
| `npm run format` | Format the project with Prettier. |

---

## Development

Start the application in development mode:

```bash
npm run dev
```

The server will start on:

```
http://localhost:3000
```

---

## Production

Build the project:

```bash
npm run build
```

Run the compiled application:

```bash
npm run serve
```

---

## Docker

### Build the image

```bash
docker buildx build -t mailer_service:0.0.2 .
```

### Tag the image

```bash
docker tag mailer_service:0.0.2 fopsi/mailer_service:0.0.2
```

### Push the image

```bash
docker push fopsi/mailer_service:0.0.2
```

---

## Project Structure

```
.
├── src/
│   ├── index.ts
│   └── ...
├── dist/
├── .env
├── package.json
└── README.md
```

---

## License

ISC
