import axios from 'axios';

// Configuração base da API (ajuste a URL conforme seu backend local ou hospedado)
const api = axios.create({
  baseURL: 'http://localhost:3000', // Altere conforme seu servidor
});

// Lista todos os pedidos
export const listarPedidos = () => api.get('/pedidos');

// Cadastra um novo pedido
export const cadastrarPedido = (descricao: string) => api.post('/pedidos', { descricao });

// Marca um pedido como entregue
export const entregarPedido = (id: number) => api.put(`/pedidos/${id}/entregar`);

// Remove todos os pedidos entregues
export const removerEntregues = () => api.delete('/pedidos/entregues');
