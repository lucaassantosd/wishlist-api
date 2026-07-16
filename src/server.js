import express from 'express';
import { z } from 'zod';

const app = express();

// Middleware obrigatório para o Express entender JSON no corpo (body) das requisições
app.use(express.json());

// Nosso "banco de dados" temporário em memória
let wishlist = [];

// 1. ROTA GET: Listar todos os desejos
app.get('/products', (request, response) => {
  return response.json(wishlist);
});

// 2. ROTA POST: Adicionar um item à lista (com validação Zod)
app.post('/products', (request, response) => {
  // Criamos o esquema de validação
  const productSchema = z.object({
    name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
    price: z.number().positive({ message: "O preço deve ser um número positivo" }),
    url: z.string().url().optional()
  });

  try {
    // Validamos o que veio no body da requisição
    const parsedData = productSchema.parse(request.body);

    const newProduct = {
      id: Date.now().toString(),
      ...parsedData,
      bought: false
    };

    wishlist.push(newProduct);

    return response.status(201).json({
      message: "Produto adicionado com sucesso!",
      product: newProduct
    });
  } catch (error) {
    // Se a validação falhar, retornamos os erros amigáveis do Zod
    return response.status(400).json({
      error: "Dados inválidos",
      details: error.errors ? error.errors.map(err => err.message) : error.message
    });
  }
});

// Inicializa o servidor na porta 3333
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});