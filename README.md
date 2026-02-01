# Register Form - Boss Room VIP

This project is a registration form for the Boss Room VIP service, built with React, Vite, TypeScript, and other modern web technologies.

## Features

- A welcoming landing page to greet users.
- A comprehensive registration form with validation.
- A thank you page upon successful registration.
- Seamless integration with Supabase for data storage.

## Technologies Used

- **Frontend:**
  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
- **Form Management:**
  - [React Hook Form](https://react-hook-form.com/)
  - [Zod](https://zod.dev/) for schema validation
- **Backend:**
  - [Supabase](https://supabase.io/) for database and authentication

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/register-form-bossroomvip.git
    cd register-form-bossroomvip
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add your Supabase credentials:

    ```
    VITE_SUPABASE_URL=your-supabase-url
    VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

### Running the Project

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

---

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Lints the codebase for errors.
- `npm run preview`: Serves the production build locally for preview.

## Project Structure

```
/
├── public/               # Static assets
├── src/
│   ├── assets/           # Project-specific assets
│   ├── components/       # Reusable React components
│   ├── layouts/          # Layout components (e.g., MainLayout)
│   ├── pages/            # Page components for routing
│   ├── schemas/          # Zod validation schemas
│   ├── services/         # Services (e.g., Supabase client)
│   └── utils/            # Utility functions
├── .env                  # Environment variables (untracked)
├── package.json          # Project metadata and dependencies
└── README.md             # This file
```
