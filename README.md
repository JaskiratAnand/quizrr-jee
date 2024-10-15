# QuizrrJEE

This project is a test series/mock test web app built in Next.js

Link: https://quizrr-jee.vercel.app/ 

## Getting Started

1. Clone the repository
2. Install the dependencies
```bash
    yarn install
```
3. Setup .env file
```bash
    DATABASE_URL,
    JWT_SECRET,
    NEXTAUTH_URL
```
4. Create Prisma Client
```bash
    yarn db:migrate
    yarn db:generate

    // Seeding database
    yarn db:seed
```
5. Build
```bash
    yarn build
```