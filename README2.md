# cookenu-Backend-NodeJs

## Project's Description

This projects aims to create a database where we can insert users and recipes in the respective tables. The project will be able to create users and recipes as well as search for them, in addition to logging in. These parameters as considered the MVP of this project.

## Workbench's tables creation

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
CREATE TABLE cookenu_Recipes (
	id VARCHAR (255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR (500) NOT NULL,
    createdAt VARCHAR (10) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES cookenu_Users(id)
);
```

https://github.com/RicardoMejolaro/Projeto-School-Manager-com-NodeJS