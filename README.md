# Boss Room VIP Registration

[![Deploy to GitHub Pages](https://github.com/your-username/register-form-bossroomvip/actions/workflows/deploy.yml/badge.svg)](https://your-username.github.io/register-form-bossroomvip/)

This repository contains the source code for the Boss Room VIP registration form, a modern, single-page application (SPA) designed to provide a seamless and intuitive user registration experience.

Built with a robust and scalable technology stack, this project leverages the power of React, Vite, and TypeScript to deliver a high-performance, type-safe, and maintainable application.

## Key Features

- **Intuitive User Interface:** A clean and user-friendly interface that guides users through the registration process.
- **Performant & Scalable:** Built with Vite for a lightning-fast development experience and optimized production builds.
- **Type-Safe Codebase:** TypeScript ensures a high level of code quality and developer productivity.
- **Component-Based Architecture:** A modular and reusable component structure for easy maintenance and scalability.
- **Declarative Routing:** A clear and concise routing implementation using `react-router`.
- **Schema-Driven Form Validation:** Robust and reliable form validation powered by `zod` and `react-hook-form`.
- **Seamless Data Persistence:** Effortless integration with `Supabase` for secure and reliable data storage.
- **Responsive Design:** A fully responsive layout that provides an optimal user experience across all devices.

## Technologies

| Category          | Technology                                                                          |
| ----------------- | ----------------------------------------------------------------------------------- |
| **Core**          | [React](https://react.dev/)                                                         |
| **Build Tool**    | [Vite](https://vitejs.dev/)                                                         |
| **Language**      | [TypeScript](https://www.typescriptlang.org/)                                       |
| **Routing**       | [React Router](https://reactrouter.com/)                                            |
| **Styling**       | [Tailwind CSS](https://tailwindcss.com/)                                            |
| **Form Handling** | [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)             |
| **Backend**       | [Supabase](https://supabase.com/)                                                   |
| **Linting**       | [ESLint](https://eslint.org/)                                                       |
| **Deployment**    | [GitHub Pages](https://pages.github.com/)                                           |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [pnpm](https://pnpm.io/installation) (recommended)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/register-form-bossroomvip.git
    cd register-form-bossroomvip
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Configure environment variables:**

    Create a `.env.local` file in the root of the project and add your Supabase credentials.

    ```env
    VITE_SUPABASE_URL=your-supabase-url
    VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

### Development

To start the development server, run the following command:

```bash
pnpm dev
```

## Deployment

This project is configured for easy deployment to GitHub Pages.

To deploy the application, run the following command:

```bash
pnpm deploy
```

This will build the application and push the `dist` folder to the `gh-pages` branch.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.