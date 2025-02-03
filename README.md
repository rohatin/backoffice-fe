# Setup

This project was built as part of an interview assignment to demonstrate ability to work with unfamiliar technologies and implement a functional backoffice application.

trigger redeploy

## Tech Stack Rationale

- **React + Context API**: While more familiar with Next.js and Zustand, this stack was chosen specifically to work outside my comfort zone and demonstrate adaptability with different state management approaches.

- **TanStack Router**: Selected both as a learning opportunity and proof-of-concept implementation. Having seen it featured on Daily.dev, it provided a chance to evaluate how I handle adopting entirely new technologies under project constraints.

- **API Communication**: Implemented using a custom-built SDK that's automatically generated based on the backend API routes, ensuring type-safety and consistent integration.

- **Authentication**: Utilizes a combination of Auth.js with Hono for robust auth management, providing a secure and maintainable authentication layer.

## Pre-requisite

- Node.js v20.xx
- Biome.js VSC Extension (for VS Code users)

## Core Dependencies

- React v18.2.0 with TypeScript
- Axios for data fetching
- TanStack Router for routing
- TanStack Query for server state management
- Tailwind CSS for styling
- Shadcn UI component library

## Getting Started

1. Install dependencies:

## Dependencies Used

- React v18.2.0 with Typescript
- built in fetch (for Data Fetching)
- Tanstack Router (for Routing): <https://tanstack.com/router/latest>
- Tanstack Query (for Server Side State): <https://tanstack.com/router/latest>
- Tailwind CSS (CSS Alternative): <https://tailwindcss.com/>
- Shadcn (Component Library): <https://ui.shadcn.com/>

## How to use

1. Install dependencies

```
yarn install
```

2. Run the project

```
yarn dev
```


```typescript
//leave it here so i do not lose, but useful for later
Generated new client with api key { apiKey: 'c3e3c9f1-1b13-468d-a4a1-8e17a72d8746', name: 'Web Client' }
Generated new client with api key {
  apiKey: '59d18ed0-fd85-4e19-8de3-40bac30ad6a1',
  name: 'The fairy tale casino'
}
```
