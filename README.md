# Gerenciador de funcionários

## Visão geral

Este projeto é um simples sistema de gerenciamento de funcionários, onde é possível cadastrar, atualizar, deletar e visualizar funcionários, visando o aprendizado das linguagens.

Este projeto conta com dois subprojetos, um para o front-end feito com ReactJS, e outro para o back-end feito com Spring Boot e utiliza o banco de dados em memória H2, evitando a necessidade de configurar um banco de dados apenas para aprendizado.

No projeto ReactJS (```/codes/front-end```), foram instaladas as seguintes dependências:

* axios
* bootstrap
* react-bootstrap
* react-icons

Já no projeto Spring Boot (```/codes/back-end```), as seguintes dependências foram utilizadas:

* Spring Web
* Spring Data JPA
* H2 Database
* Lombok
* Spring Boot DevTools

## Executando o projeto



### Usando Docker
Para executar este sistema utilizando Docker, basta ter o `Docker` e o `docker-compose` instalados e abrir o terminal e executar `docker-compose up` na pasta do projeto

### Maneira Tradicional
Para executar este sistema, deve-se executar primeiramente o back-end e então o front-end

#### Requisitos

Você deve ter o **JDK8**, o **Maven** e o **NodeJS** instalados em sua maquina para conseguir executar o sistema

#### Executando o back-end

Abra um terminal, va até a pasta ```/codes/back-end``` e execute o seguinte comando:

``` bash
mvn spring-boot:run
```

E então o Maven irá instalar as dependências e executar o projeto.

#### Executando o front-end

Abra um terminal, va até a pasta ```/codes/front-end``` e execute os seguintes comandos:

* **Usando NPM**

``` bash
npm install
npm start
```

* **Usando Yarn**

``` bash
yarn install
yarn start
```

E então o Node irá instalar as dependências e executar o projeto.

> ### ***Licença***
>Este projeto está sob a licença MIT
