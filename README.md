# Wishlist API 🎁 (Semana 2)

Uma API REST completa para gerenciamento de listas de desejos (Wishlist). Este projeto foi desenvolvido na **Semana 2** para praticar a criação de servidores HTTP, rotas RESTful com Express, tratamento de status HTTP e validação rigorosa de dados de entrada usando Zod.

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
Inicie a aplicação utilizando o Nodemon:
```bash
npm run dev
```
O servidor iniciará por padrão em: `http://localhost:3000`

---

## 🚦 Exemplos Práticos de Requisições (Endpoints)

Aqui estão os formatos de dados esperados e retornados pela API ao interagir com as rotas:

### 1. Adicionar Item à Lista (POST `/wishlist`)
* **Corpo da requisição (JSON):**
```json
{
  "name": "PlayStation 5 Pro",
  "description": "Console de última geração para jogar nos finais de semana.",
  "price": 6999.90
}
```
* **Resposta de sucesso (201 Created):**
```json
{
  "message": "Item adicionado com sucesso!",
  "item": {
    "id": "e8a21f8a-c603-4bc7-938b-d760b2984fe7",
    "name": "PlayStation 5 Pro",
    "description": "Console de última geração para jogar nos finais de semana.",
    "price": 6999.90,
    "createdAt": "2026-07-16T22:30:00.000Z"
  }
}
```

### 2. Listar Itens (GET `/wishlist`)
* **Resposta de sucesso (200 OK):**
```json
[
  {
    "id": "e8a21f8a-c603-4bc7-938b-d760b2984fe7",
    "name": "PlayStation 5 Pro",
    "price": 6999.90
  }
]
```

### 3. Exemplo de Erro de Validação (Preço negativo ou nome ausente)
* **Resposta de erro (400 Bad Request):**
```json
{
  "error": "Dados inválidos",
  "details": [
    "O preço deve ser um número positivo"
  ]
}
```

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