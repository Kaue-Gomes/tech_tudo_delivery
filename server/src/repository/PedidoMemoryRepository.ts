import PedidoRepositoryInterface from './interfaces/PedidoRepositoryInterface';
import { Pedido } from '@prisma/client';

/**
 * Implementação fake de repositório, armazenando pedidos apenas em memória.
 * Útil para testes ou ambientes de desenvolvimento sem banco.
 */
export default class PedidoMemoryRepository implements PedidoRepositoryInterface {
  private pedidos: Pedido[] = [];   // Armazena os pedidos em um array
  private idCounter = 1;            // Gera IDs incrementais para os pedidos

  async create(descricao: string): Promise<Pedido> {
    const novoPedido: Pedido = {
      id: this.idCounter++,
      descricao,
      entregue: false
    };
    this.pedidos.push(novoPedido);
    return novoPedido;
  }

  async findAll(): Promise<Pedido[]> {
    // Retorna todos os pedidos salvos em memória
    return this.pedidos;
  }

  async updateEntrega(id: number, entregue: boolean): Promise<Pedido> {
    // Procura o pedido pelo ID
    const pedido = this.pedidos.find(p => p.id === id);
    if (!pedido) {
      throw new Error('Pedido não encontrado');
    }
    // Atualiza o status de entrega
    pedido.entregue = entregue;
    return pedido;
  }

  async deleteEntregues(): Promise<{ count: number }> {
    // Remove os pedidos que estão marcados como entregues
    const antes = this.pedidos.length;
    this.pedidos = this.pedidos.filter(p => !p.entregue);
    const depois = this.pedidos.length;
    return { count: antes - depois };
  }
}
