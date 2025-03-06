# 📂 Estrutura de pastas
Arquitetura de pastas organizada para um projeto **Node.js + TypeScript + Express + JWT**. Essa estrutura segue boas práticas para manter o código modular, escalável e fácil de manter.


## 📂 Estrutura de pastas

📂 /projeto-backend<br/>
│── 📂 /src <br/>
│   ├── 📂 /config <br/>
│   │   ├── database.ts <br/>
│   │   ├── env.ts <br/>
│   │   ├── jwt.ts <br/>
│   ├── 📂 /controllers <br/>
│   │   ├── auth.controller.ts <br/>
│   │   ├── user.controller.ts <br/>
│   ├── 📂 /middlewares <br/>
│   │   ├── auth.middleware.ts <br/>
│   │   ├── error.middleware.ts <br/>
│   ├── 📂 /models <br/>
│   │   ├── user.model.ts <br/>
│   ├── 📂 /repositories <br/>
│   │   ├── user.repository.ts <br/>
│   ├── 📂 /routes <br/>
│   │   ├── auth.routes.ts <br/>
│   │   ├── user.routes.ts <br/>
│   │   ├── index.ts <br/>
│   ├── 📂 /services <br/>
│   │   ├── auth.service.ts <br/>
│   │   ├── user.service.ts <br/>
│   ├── 📂 /types <br/>
│   │   ├── user.types.ts <br/>
│   ├── 📂 /utils <br/>
│   │   ├── hash.ts <br/>
│   │   ├── jwt.ts <br/>
│   ├── app.ts <br/>
│   ├── server.ts <br/>
│── 📂 /prisma (se utilizar Prisma ORM) <br/>
│   ├── schema.prisma <br/>
│── 📂 /tests <br/>
│   ├── 📂 /integration <br/>
│   │   ├── auth.test.ts <br/>
│   │   ├── user.test.ts <br/>
│   ├── 📂 /unit <br/>
│   │   ├── authService.test.ts <br/>
│   │   ├── userService.test.ts <br/>
│── 📂 /public (se necessário armazenar arquivos públicos) <br/>
│── 📂 /scripts (para scripts auxiliares, como migrações manuais) <br/>
│── 📂 /docs (documentação do projeto, como API Swagger) <br/>
│── .env <br/>
│── .gitignore <br/>
│── package.json <br/>
│── tsconfig.json <br/>
│── README.md <br/>


## 🚀 Vantagens dessa estrutura:
✅ Organização e modularização;<br/>
✅ Escalabilidade;<br/>
✅ Reaproveitamento de códigos centralizados;<br/>
✅ Manutenção;

### Observação
O foco do repo é demonstrar uma possível arquitetura de pasta para projetos nodejs, e não tem como foco a execução da aplicação.