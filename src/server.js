import express from 'express';
import { z } from 'zod';

const app = express();

// Middleware para o Express entender JSON no corpo das requisições
app.use(express.json());

// Nosso banco de dados temporário em memória
let wishlist = [];

// =========================================================================
// 1. READ: Listar todos os produtos
// =========================================================================
app.get('/products', (request, response) => {
  return response.json(wishlist);
});

// =========================================================================
// 2. CREATE: Adicionar um produto (com validação Zod e bloqueio de duplicados)
// =========================================================================
app.post('/products', (request, response) => {
  const productSchema = z.object({
    name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
    price: z.number().positive({ message: "O preço deve ser um número positivo" }),
    url: z.string().url().optional()
  });

  try {
    const parsedData = productSchema.parse(request.body);

    // Evitar produtos duplicados (case-insensitive)
    const productExists = wishlist.some(
      (product) => product.name.toLowerCase() === parsedData.name.toLowerCase()
    );

    if (productExists) {
      return response.status(409).json({
        error: "Conflito de dados",
        message: `O produto "${parsedData.name}" já está na sua lista de desejos.`
      });
    }

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
    return response.status(400).json({
      error: "Dados inválidos",
      details: error.errors ? error.errors.map(err => err.message) : error.message
    });
  }
});

// =========================================================================
// 3. UPDATE: Atualizar dados de um produto existente pelo ID
// =========================================================================
app.put('/products/:id', (request, response) => {
  const { id } = request.params;

  // Schema de validação para a atualização (inclui o campo 'bought')
  const updateProductSchema = z.object({
    name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
    price: z.number().positive({ message: "O preço deve ser um número positivo" }),
    url: z.string().url().optional(),
    bought: z.boolean({ required_error: "O campo 'bought' (comprado) é obrigatório e deve ser true ou false" })
  });

  try {
    const parsedData = updateProductSchema.parse(request.body);

    // Procuramos o índice do produto na nossa lista
    const productIndex = wishlist.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      return response.status(404).json({
        error: "Não encontrado",
        message: `Produto com o ID ${id} não foi encontrado.`
      });
    }

    // REGRA DE NEGÓCIO: Se alterou o nome, garantir que não vai duplicar outro existente
    const nameExists = wishlist.some(
      (product) => product.id !== id && product.name.toLowerCase() === parsedData.name.toLowerCase()
    );

    if (nameExists) {
      return response.status(409).json({
        error: "Conflito de dados",
        message: `Já existe outro produto com o nome "${parsedData.name}" na lista.`
      });
    }

    // Atualiza o produto mantendo o ID original
    wishlist[productIndex] = {
      id,
      ...parsedData
    };

    return response.json({
      message: "Produto atualizado com sucesso!",
      product: wishlist[productIndex]
    });
  } catch (error) {
    return response.status(400).json({
      error: "Dados inválidos",
      details: error.errors ? error.errors.map(err => err.message) : error.message
    });
  }
});

// =========================================================================
// 4. DELETE: Remover um produto pelo ID
// =========================================================================
app.delete('/products/:id', (request, response) => {
  const { id } = request.params;

  const productIndex = wishlist.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    return response.status(404).json({
      error: "Não encontrado",
      message: `Produto com o ID ${id} não foi encontrado.`
    });
  }

  // Remove o item da lista
  wishlist.splice(productIndex, 1);

  return response.json({
    message: `Produto com ID ${id} foi removido com sucesso.`
  });
});

// Inicializa o servidor
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});