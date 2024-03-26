# Projeto Node.js e MySQL usando JWT

- Simple projeto de criacao de um aplicativo Node.js e MySQL com arquitetura MVC.
- Cadastro e permissões de usuários.

## Pré-requisitos
- Node.js
- npm (gerenciador de pacotes do Node.js)
- MySQL Server

## Configuração do Banco de Dados

1. Certifique-se de ter um servidor MySQL em execução localmente ou em um ambiente acessível.
2. Crie um banco de dados MySQL para o projeto.
3. Crie um arquivo `.env`.
4. Edite o arquivo `.env` e insira as configurações do seu banco de dados:
   ```
    DB_HOST=seu-host
    DB_USER=seu-usuario
    DB_PASSWORD=sua-senha
    DB_DATABASE=seu-banco-de-dados

## Uso

O aplicativo será executado em `http://localhost:3000`.

Você pode usar uma ferramenta como Postman ou curl para fazer solicitações HTTP para os endpoints definidos no aplicativo para criar, listar, atualizar e excluir usuários.

## Arquitetura MVC

O projeto segue uma arquitetura Modelo-Visão-Controlador (MVC) para separar as preocupações em camadas distintas:

- **Modelo**: Lida com a lógica de negócios e a interação com o banco de dados.
- **Visão**: Lida com a apresentação de dados ao usuário (não implementado neste projeto).
- **Controlador**: Gerencia as solicitações do cliente, interage com os modelos e envia as respostas de volta ao cliente.




