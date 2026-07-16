Markdown
# 🎁 Wishlist API

Uma API REST simples e robusta para gerenciar uma lista de desejos (produtos que você quer comprar). A aplicação permite o cadastro de itens com validação rígida de dados, listagem, atualização e exclusão de produtos.

Este projeto foi desenvolvido durante a **Semana 2** do meu cronograma de estudos focado em dominar a stack Node.js, React e Next.js.

---

## 🚀 Tecnologias Utilizadas

*   **Node.js** (Ambiente de execução)
*   **Express.js** (Micro-framework para construção de APIs REST)
*   **Zod** (Biblioteca de declaração e validação de esquemas de dados)
*   **Nodemon** (Ferramenta de live-reload para desenvolvimento rápido)
*   **JavaScript (ES6+)** com ES Modules (`import`/`export`)

---

## ⚙️ Como Instalar e Rodar o Projeto

Para rodar este projeto localmente, você precisará ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### 1. Clonar o repositório
```bash
git clone [https://github.com/SEU_USUARIO/wishlist-api.git](https://github.com/SEU_USUARIO/wishlist-api.git)
```

2. Entrar na pasta do projeto
```bash
cd wishlist-api
```

3. Instalar as dependências

Rode o comando abaixo para instalar as dependências necessárias de forma exata (utilizando o arquivo package-lock.json salvo no repositório):

```bash
npm install
```

4. Iniciar o servidor em modo de desenvolvimento
O projeto já está configurado com o nodemon. O servidor reiniciará automaticamente a cada alteração salva no código:

```bash
npm run dev
```

Retorno esperado no terminal: 🚀 Servidor rodando em http://localhost:3333

🛣️ Rotas da API
Todas as requisições devem ser feitas para a base: http://localhost:3333

1. Listar Produtos da Wishlist
Rota: /products

Método: GET

Resposta (Sucesso - 200 OK):

JSON
[
  {
    "id": "1713456789123",
    "name": "Teclado Mecânico Keychron",
    "price": 549.90,
    "url": "[https://keychron.com](https://keychron.com)",
    "bought": false
  }
]

2. Adicionar Produto à Wishlist
Rota: /products

Método: POST

Corpo da Requisição (JSON):

```JSON
{
  "name": "Teclado Mecânico Keychron",
  "price": 549.90,
  "url": "[https://keychron.com](https://keychron.com)"
}
```

Regras de Validação (Zod):

name: Obrigatório, do tipo texto e com no mínimo 2 caracteres.

price: Obrigatório, do tipo numérico e obrigatoriamente positivo.

url: Opcional, mas se enviado precisa ser uma URL válida.

Resposta (Sucesso - 201 Created):

```JSON
{
  "message": "Produto adicionado com sucesso!",
  "product": {
    "id": "1713456789123",
    "name": "Teclado Mecânico Keychron",
    "price": 549.90,
    "url": "[https://keychron.com](https://keychron.com)",
    "bought": false
  }
}
```

📝 Aprendizados desta semana
Durante o desenvolvimento desta API, consolidei os seguintes conceitos:

Fundamentos de APIs REST: Como utilizar métodos HTTP (GET, POST) e retornar códigos de status apropriados (200 OK, 201 Created, 400 Bad Request).

Middlewares no Express: Compreensão de como o express.json() atua interceptando as requisições para parsear o corpo em formato JSON.

Validação de Dados com Zod: Como criar esquemas de validação rígidos no backend, capturar erros e retornar respostas amigáveis para o cliente.

Fluxo de Trabalho com NPM: A importância de manter o arquivo package-lock.json no controle de versão para garantir a consistência das dependências do projeto.

Desenvolvido com ☕ por Lucas Domingues.