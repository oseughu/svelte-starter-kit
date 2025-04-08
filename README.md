# Svelte Starter Kit by Ose Ughu

This repository is a Laravel + Inertia + Svelte 5 + Progressive Web App (PWA) Starter Kit, designed to help you kickstart your web application development. It integrates modern tools like SQLite, Bun, TailwindCSS and ShadCN UI to provide a fully functional foundation for building reactive and scalable web applications. This is a more opinionated starter kit compared to the main branch of the svelte-starter-kit repository, which is more of a boilerplate.

## Key Features

- Laravel + Inertia: A robust backend combined with a reactive front end.
- Svelte 5: Utilizes the latest version of Svelte for seamless front-end interactivity.
- Progressive Web App (PWA): Configured to work offline and feel like a native app.
- Bun: Ultra-fast JavaScript runtime for bundling and running your front-end assets.
- TailwindCSS: Rapid UI development with utility-first CSS.
- [ShadCN](https://next.shadcn-svelte.com): Modern and accessible UI components out of the box.

### Requirements (Recommended)

- PHP: 8.3 or later
- Composer
- [Bun](https://bun.sh)
- SQLite (default) or another database engine of your choice

### Getting Started

Clone the Repository:

```bash
git clone -b forge https://github.com/oseughu/svelte-starter-kit.git # https
# or
git clone -b forge git@github.com:oseughu/svelte-starter-kit.git # ssh

cd svelte-starter-kit && rm -rf .git
```

Install PHP dependencies (this also sets up the SQLite database, app key and creates the .env file):

```bash
composer install
```

Run the following command to start up everything (Backend Server, Frontend Server, Queue, and Mailer):

```bash
composer dev
```

### Subdomain Routing Example

If subdomain routing is required for your project, you can add it by either: 1. Uncommenting the configuration in the `RouteServiceProvider`. 2. Adding a `routes/admin.php` file with the routes for the subdomain.

### PWA Customization

This starter kit is preconfigured as a Progressive Web App (PWA), enabling offline functionality and native app-like behaviour.

To customise the behaviour or appearance of the PWA:

1. Modify the `public/scripts/service-worker-template.js` file to control how the service worker handles caching and offline functionality.
2. Update the `public/scripts/manifest-template.json` file to define the app’s metadata (e.g., name, theme colour, icons).

No other files need to be modified for PWA customization.

This starter kit is highly customizable! Clone the repository and delete any files or features you don’t need. It’s flexible enough to support a wide range of use cases, from small side projects to large-scale applications.

### Contributions

I welcome contributions! Whether it’s bug fixes, feature additions, or general improvements, feel free to submit a pull request.

I regularly update packages and dependencies to ensure the codebase stays modern and secure.

Happy coding! 🚀
