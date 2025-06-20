import { PrismaClient, Pedido } from '@prisma/client';
import PedidoRepositoryInterface from './interfaces/PedidoRepositoryInterface';

const prisma = new PrismaClient();

/**
 * Implementação real do repositório usando Prisma e banco de dados.
 * Cumpre o contrato da interface PedidoRepositoryInterface.
 */
export default class PedidoPrismaRepository implements PedidoRepositoryInterface {
  async create(descricao: string): Promise<Pedido> {
    // Cria um novo pedido no banco
    return prisma.pedido.create({
      data: { descricao }
    });
  }

  async findAll(): Promise<Pedido[]> {
    // Retorna todos os pedidos
    return prisma.pedido.findMany();
  }

  async updateEntrega(id: number, entregue: boolean): Promise<Pedido> {
    // Atualiza o campo 'entregue' de um pedido
    return prisma.pedido.update({
      where: { id },
      data: { entregue }
    });
  }

  async deleteEntregues(): Promise<{ count: number }> {
    // Deleta todos os pedidos que estão com status 'entregue'
    return prisma.pedido.deleteMany({
      where: { entregue: true }
    });
  }
}
