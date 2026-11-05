# Find a Friend API

An API that connects animal welfare organizations with people interested in adoption. Organizations can register pets and search for them by characteristics or location.

## Tech stack

Node.js, TypeScript, Fastify, Zod, PostgreSQL, Prisma, JWT, Vitest, and Swagger.

## Getting started

Requirements: Node.js, npm, and PostgreSQL (or Docker Compose).

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`. For the included Docker Compose database:

   ```env
   DATABASE_URL="postgresql://docker:docker@localhost:5433/find_a_friend_api?schema=public"
   JWT_SECRET="replace-with-a-secret-key"
   ```

3. Start the database, apply migrations, and generate the Prisma Client:

   ```bash
   docker compose up -d
   npx prisma migrate deploy --config prisma7.config.ts
   npx prisma generate --config prisma7.config.ts
   ```

4. Start the development server:

   ```bash
   npm run start:dev
   ```

The API runs at `http://localhost:3333`. Swagger is available at `http://localhost:3333/docs`;

## Authentication

Register an organization using `POST /organization`, then log in using `POST /session`. Send the returned token as `Authorization: Bearer <token>` on protected routes. Access tokens expire after 10 minutes.

Login also sets an HTTP-only `refreshToken` cookie, valid for 7 days. Send it to `PATCH /token/refresh` to renew the access token. The cookie is marked `Secure`, which affects its use over local HTTP.

## Routes

| Method | Path             | Authentication | Description                     |
| ------ | ---------------- | -------------- | ------------------------------- |
| POST   | `/organization`  | Public         | Register an organization.       |
| POST   | `/session`       | Public         | Authenticate an organization.   |
| PATCH  | `/token/refresh` | Refresh cookie | Renew the access token.         |
| GET    | `/me`            | Bearer token   | Get the organization's profile. |
| POST   | `/pet`           | Bearer token   | Register a pet.                 |
| GET    | `/pets`          | Bearer token   | List pets.                      |
| GET    | `/pets/filter`   | Bearer token   | Filter pets by characteristics. |
| GET    | `/pets/nearby`   | Bearer token   | Find pets within 10 km.         |
| GET    | `/pet/:id`       | Bearer token   | Get a pet by ID.                |

The filter endpoint accepts optional `age`, `petSize`, `energyLevel`, `independenceLevel`, and `suitableEnvironment` query parameters. The nearby endpoint requires `latitude` and `longitude`, and returns 404 when no pets are found.

### Request examples

**Register an organization — `POST /organization`**

```json
{
  "responsiblePersonName": "Maria Silva",
  "email": "maria@example.com",
  "cep": "12345678",
  "address": "123 Flower Street",
  "phoneNumber": "11999999999",
  "password": "password123",
  "confirmPassword": "password123"
}
```

CEP must contain 8 digits, phone number 11 digits, and passwords at least 6 characters. Email addresses must be unique.

**Register a pet — `POST /pet`**

```json
{
  "name": "Amora",
  "about": "Friendly and playful",
  "age": 2,
  "latitude": -23.5505,
  "longitude": -46.6333,
  "petSize": "adult",
  "energyLevel": "MEDIUM",
  "independenceLevel": "LOW",
  "suitableEnvironment": "HOUSE",
  "photos": ["https://example.com/amora.jpg"],
  "adoptionRequirements": ["A home with space"]
}
```

Pet names accept up to 20 characters and ages range from 0.1 to 20. Available characteristic values:

| Field                 | Values                                           |
| --------------------- | ------------------------------------------------ |
| `petSize`             | `little puppy`, `puppy`, `adult`                 |
| `energyLevel`         | `VERY_LOW`, `LOW`, `MEDIUM`, `HIGH`, `VERY_HIGH` |
| `independenceLevel`   | `LOW`, `MEDIUM`, `HIGH`                          |
| `suitableEnvironment` | `HOUSE`, `APARTMENT`, `SPACIOUS_ENVIRONMENT`     |

## Tests

```bash
npm test            # Run tests once
npm run test:watch  # Run tests in watch mode
```

Use case tests use in-memory repositories in `test/repositories`.

## Project structure

- `prisma/` — database schema and migrations.
- `src/core/` — shared configuration, entities, and utilities.
- `src/domain/` — entities, repository contracts, and use cases.
- `src/infra/` — HTTP controllers, routes, Prisma repositories, and Swagger.
- `test/` — factories and in-memory repositories.
