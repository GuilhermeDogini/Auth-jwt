# Resumo projeto

Projeto destiando ao Back-end, Contendo as seguintes Rotas:

### Public Route
- / : (Basicamente dando Boas Vindas)
- /auth/register : (Serve para Registrar um novo usuário uma série de autenticações)
- /auth/login : (Serve para logar o usuário na aplicação com uma série de autenticações)
### Private Route :
- /user/:id : (Serve para pegar as informações do usuário e só é possível pegar essar informações com um Token)

---

## Sobre o projeto

O **Projeto** é uma API usando o Postman para consultas e criações e o mongoDB para como banco de dados.
Na API Authentication fazemos as consultas, verificações de tokens dos usuários e gerenciamente de acessos e privilégios.

*É necessário ter o Postman instalado para a consulta no banco de dados
---

## Stack

Este projeto foi desenvolvido com as seguintes tecnologias:

  - Node
  - MongoDB
  - express
  - Eslint
  - jwt
  - bcrypt
  - herokuy
  
*É necessário possuir a versão 18 ou superior do Node para executar o projeto.*
*Estamos usando a rede Heroku para fazer deploy neste projeto
---

## Início Rápido

Para obter uma cópia do projeto em sua máquina local, abra o terminal e faça a execução dos seguintes comandos:

```bash
# Clonar repositório
$ git clone https://github.com/GuilhermeDogini/Auth-jwt.git
```
---

## Deploy

Neste projeto estamos utilizando a ferramenta **Heroku** :
### Link da aplicação no Heroku : https://app-test-final.herokuapp.com


## Executando Local (se preferir, mas a mesma esta rodando na rede Heroku)

```bash

# Entrar no diretório raíz
$ cd Auth-jwt

# Instalar dependências do repositório de autencicação e iniciar projeto
$ npm install
$ npm run start

```
---


---

## Executando com o Postman

```bash

# Entrar no diretório raíz
Crie um projeto com o nome parecido a esse "API Auth JWT" e adicione as rotas a baixo

*Antes de criarmos as rotas vamos criar Duas variáveis na API a primeira chamada "URL" com o initial value "http://localhost:4001" e o current value "http://localhost:4001"
*E a segunda chamada "TOKEN" com o initial value (Deve ser pego na rota "{{URL}}/auth/login" via POSTMAN) e o current value (Deve ser pego na rota "{{URL}}/auth/login" via POSTMAN)
*Para acessar a variável entre em "API Auth JWT" e em variables e adicione suas variaveis lá 
```
---


## Rotas API CRUD

:grey_exclamation: *Desenvolvedor, para cada rota criada, favor adicionar aqui!*

- Boas vindas (Método GET):
```
  {{URL}}/

```
- Criação de Usuários (Método POST):
```
  {{URL}}/auth/register
  
  *É necessario utilizar o "body" com o filtro "Raw" e a linguagem JSON
  *Pegue o id que vai aparecer na resposta do POSTMAN, será necessario para usar no método (Verificação de uma pessoa apena)

```

- Login de Usuário (Método POST):
```
  {{URL}}/auth/login

*É preciso usar o token pego nesta rota
*É necessario utilizar o "body" com o filtro "Raw" e a linguagem JSON

```

- Verificação de uma pessoa apenas (Método GET):
```
  {{URL}}/user/id

*É preciso usar o token pego na rota Login de Usuário : "{{URL}}/auth/login"
*É preciso do id para verificar a existencia de uma unica pessoa, que pode ser pego na rota "{{URL}}/auth/register"

```


---











