# Samuel Fernando da Silva Tavares | FrontEnd - Parrot App
Meu projeto final de FrontEnd para a 3ª edição do Bootcamp Excelência FullStack - SysMap Solutions

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Tecnologias utilizadas
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

# Configurando o BackEnd

O projeto conta com um docker-compose que contém todos os serviços de backend necessários. Abaixo está a configuração necessária para o pleno funcionamento dos serviços.

Clone o repositório:

```sh
git clone https://github.com/bc-fullstack-03/Samuel-Fernando_frontend.git
```

Entre no diretório raiz do projeto, e execute o docker-compose para iniciar todos os contêineres e criar todos os serviços de back-end necessários para ele ser funcional:

```sh
cd Samuel-Fernando_frontend
```

```sh
docker-compose up --build -d
```

Após os contêineres serem iniciados, será necessária a criação de um novo perfil e do S3 bucket no contêiner localstack-parrot para o upload de fotos ser funcional na aplicação. Para isso, será necessário executar os seguintes comandos:

```sh
docker exec -it localstack-parrot bash
```
```sh
aws configure --profile default
```
Será aberta uma série de configurações para o perfil, onde será preciso atribuir os seguintes dados:

- AWS Access Key ID [None]: myKey
- AWS Secret Access Key [None]: myKey
- Default region name [None]: us-west-2
- Default output format [None]: json

Após a criação do perfil, o bucket S3 para a aplicação poderá ser criado utilizando o seguinte comando:

```sh
aws s3 mb s3://demo-bucket --endpoint-url http://localhost:4566
```
Com o bucket S3 criado, a configuração do back-end estará completa.

# Iniciando o projeto

Na raiz do projeto, instale todas as depedências:

```sh
yarn
```
ou
```sh
npm install
```

Após as dependências serem instaladas, a aplicação poderá ser iniciada com o comando:

```sh
yarn dev
```
ou
```sh
npm run dev
```

## Repositório do BackEnd
O repositório com o código do backend do projeto pode ser encontrado [aqui](https://github.com/bc-fullstack-03/Samuel-Fernando_backend).
