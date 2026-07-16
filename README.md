# Wishlist API 🎁

Uma API REST completa para gerenciamento de listas de desejos (Wishlist). Este projeto foi desenvolvido na **Semana 2** para praticar a criação de servidores HTTP, rotas RESTful com Express, tratamento de status HTTP e validação rigorosa de dados de entrada.

## 🛠️ Tecnologias Utilizadas

* **Runtime:** Node.js
* **Framework:** Express.js
* **Validação de Dados:** Zod
* **Ferramenta de Testes:** REST Client (extensão do VS Code via `api.http`)

---

## 🚀 Como Executar o Projeto

### 1. Instalar as Dependências
Navegue até a pasta da Semana 2 e instale os pacotes:
```bash
npm install
```

### 2. Iniciar o Servidor de Desenvolvimento
Inicie a aplicação utilizando o Nodemon (reinicialização automática ao salvar alterações):
```bash
npm run dev
```
O servidor iniciará por padrão em: `http://localhost:3000`

---

## 🚦 Como Testar as Rotas

Neste projeto, utilizamos a extensão **REST Client** do VS Code para disparar requisições. 

### Passos para Testar:
1. Certifique-se de ter a extensão **REST Client** instalada no seu VS Code.
2. Copie o arquivo `api.example.http` para `api.http`:
   ```bash
   cp api.example.http api.http
   ```
3. Abra o arquivo `api.http` e clique em **"Send Request"** acima de cada rota para testar o CRUD!

---

## ⚙️ Funcionalidades & Regras de Negócio

* **GET `/wishlist`**: Lista todos os itens da sua lista de desejos.
* **POST `/wishlist`**: Adiciona um item (valida se o nome já existe na lista para evitar duplicados e usa o **Zod** para garantir que o preço seja positivo e os campos obrigatórios estejam preenchidos).
* **PUT `/wishlist/:id`**: Atualiza as informações de um item existente validando se o novo nome não conflita com outro item.
* **DELETE `/wishlist/:id`**: Remove o item da lista permanentemente.

---

## 📁 Estrutura do Projeto

```text
.
├── src/
│   └── server.js          # Servidor Express, rotas do CRUD e validações Zod
├── .gitignore             # Arquivos ignorados pelo Git (como node_modules e api.http)
├── api.example.http       # Modelo de requisições de teste para o portfólio
├── package.json           # Gerenciamento de pacotes e scripts do Node.js
└── README.md              # Documentação
```