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
