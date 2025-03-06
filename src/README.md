# 📂 src/
Contém todo o código-fonte do backend.


## Explicação
📂 */config* → Configurações do projeto*<br/>
----| **database.ts** → Configuração do banco de dados (ex.: conexão com Prisma, Sequelize, etc.).<br/>
----| **env.ts** → Centraliza a leitura de variáveis de ambiente (process.env).<br/>
----| **jwt.ts** → Configuração de autenticação JWT, como secret key e tempo de expiração.<br/>
<br/>
📂 */controllers* → Controladores que lidam com as requisições HTTP<br/>
----| **auth.controller.ts** → Lida com login, logout, renovação de tokens, etc.<br/>
----| **user.controller.ts** → Gerencia operações sobre usuários, como criação, listagem, etc.<br/>
<br/>
📂 */middlewares* → Funções intermediárias para requisições<br/>
----| **auth.middleware.ts** → Middleware para validar JWT em rotas protegidas.<br/>
----| **error.middleware.ts** → Middleware global para tratamento de erros.<br/>
<br/>
📂 */models* → Representação dos dados do banco<br/>
----| **user.model.ts** → Modelo do usuário (se usar Prisma, Sequelize ou outro ORM).<br/>
<br/>
📂 */repositories* → Camada de acesso aos dados<br/>
----| **user.repository.ts** → Funções para interagir com o banco de dados (ex.: findByEmail, createUser).<br/>
<br/>
📂 */routes* → Definição das rotas da API<br/>
----| **auth.routes.ts** → Rotas de autenticação (/login, /register, etc.).<br/>
----| **user.routes.ts** → Rotas de gerenciamento de usuários.<br/>
----| **index.ts** → Junta todas as rotas e exporta para o app.ts.<br/>
<br/>
📂 */services* → Lógica de negócio do sistema<br/>
----| **auth.service.ts** → Implementa a lógica de login, geração de JWT, etc.<br/>
----| **user.service.ts** → Contém regras de negócio para criação e atualização de usuários.<br/>
<br/>
📂 */types* → Definição de tipos e interfaces do TypeScript<br/>
----| **user.types.ts** → Interface para User.<br/>
<br/>
📂 */utils* → Funções utilitárias reutilizáveis<br/>
----| **hash.ts** → Funções para hash de senhas (ex.: bcrypt).<br/>
----| **jwt.ts** → Funções para manipulação de tokens JWT.<br/>
<br/>
Arquivos principais<br/>
** app.ts** → Configuração principal do Express.<br/>
** server.ts** → Inicia o servidor.