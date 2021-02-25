<h1 align="center">
    Cookenu
</h1>

# Índice

- [Descrição](#-Descrição-do-projeto)

- [Tecnologias utilizadas](#-Tecnologias-utilizadas)

- [Instalação](#-Como-baixar-o-projeto)

---

## 🖋 Descrição do projeto

O projeto **Cookenu** foi desenvolvido durante o **Bootcamp da Labenu**, com o intuito de colocarmos em prática o conteúdo estudado durante o curso. Trata-se de uma rede social, na qual os usuários podem dividir informações relevantes sobre comidas e receitas que tenham experimentado. 

---

## 🚀 Tecnologias utilizadas

o projeto foi desenvolvido usando as seguintes tecnologias:

- [Node.js](https://nodejs.org/pt-br/docs/)
- [Express.js](http://expressjs.com/pt-br/)
- [Knex](http://knexjs.org/)
- Cors
- mySQL
- UUID
- JWT
- Bcryptjs

---

## 💾 Como baixar o projeto

- Primeiro instale o [Git](https://git-scm.com/), [Node.jS](https://nodejs.org/pt-br/download/) + [npm](https://www.npmjs.com/get-npm)
```bash
# Clonar o repositório
git clone https://github.com/Isabelar07/cookenu-Backend-NodeJs.git

# Entrar no diretório
cd cookenu-Backend-NodeJs

# Instalar as dependências
npm install

# Rodar o projeto
npm run dev
```

---

## Tabelas criadas no Workbench

### Usuários
```sql
CREATE TABLE cookenu_Users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    email VARCHAR (100) UNIQUE NOT NULL,
    password VARCHAR (255) NOT NULL
);
```

### Receitas
```sql
CREATE TABLE Recipe_cookenu (
    recipe_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    createAT VARCHAR(255) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES User_profile_cookenu(id) 
);
```

### Seguir outros usuários
```sql
CREATE TABLE Users_relation (
    user_id VARCHAR(255),
    user_to_follow_id VARCHAR(255) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES User_profile_cookenu(id),
    FOREIGN KEY(user_to_follow_id) REFERENCES User_profile_cookenu(id)
 );
```

---

Desenvolvido com 🧡 por Isabela Rocha Silveira
