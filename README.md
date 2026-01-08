# Habit Share Frontend

React + TypeScript + Vite frontend for the Habit Share app.

## Requirements
You must have the following installed on your machine:
- Docker (v20+ recommended) (Docker version 29.1.3, build f52814d on my machine)
- Docker Compose (v2+) (Docker Compose version v2.40.3-desktop.1 on my machine)
- Optional: Node.js (LTS recommended) and npm for local (non-Docker) dev

## Setup instructions

1. Clone the repository

```bash
git clone https://github.com/Qasym/habit-share-frontend
cd habit-share-frontend
```

2. Build and start the services

```bash
docker compose up --build
```

This will:

- Build the frontend image
- Start the Vite dev server container

3. Verify the app is running

Open your browser at `http://localhost:5173`.

4. Backend


Follow the backend setup instructions here:
https://github.com/Qasym/habit-share-back


***If you want to contribute to the frontend but lack the needed api, let me know by opening an issue at the repo above. For the time being try to come up with a smart solution that can be easily substituted by the code using the api***


## Run locally (optional)

```bash
npm install
npm run dev
```

Vite serves the app at `http://localhost:5173` by default.

## Contributing

1. Create a feature branch from `master`.
2. Keep changes focused and use clear commit messages.
3. Run `npm run lint` and `npm run build` before opening a PR.
4. Include screenshots or short notes for UI changes.
