# steps

nest new project-name

- Config ESlint
- Config docker-compose.yml

## Prisma instalation

- npm i prisma -D
- npm i @prisma/client

- npx prisma init

## Create user and questions models

- The relationship of fields indicates that many users can make many questions

than i run migrations with the command

- npx prisma migrate dev

## Connect with database

- now i config my first service, the prisma service to connect with database
- i use the OnModuleInit and OnModuleDestroy to have control about the futures problems that happens

## Create account controller

- in this step i create the create createAccountController, and save the created user in database
- is important check the changes in tsconfig because this changes avoid futures errors
- already in this step i hashed password using
  - npm i bcrypsjs
  - npm i @types/bcryptjs

## Errors validation

- I create validations and schemas, also types using z.infer for can make the body parse of informations
- i create zod-validation-pipe file following nest documentation
- libs used:
  - npm i zod
  - npm i zod-validation-error

## Config Rest client

- Rest client is a extension of vs code and i config a file in root project with http extension for test my requests
