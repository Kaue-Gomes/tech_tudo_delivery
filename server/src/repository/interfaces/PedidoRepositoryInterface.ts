import { Pedido } from '@prisma/client';

/**
 * Interface que define o contrato que todos os repositórios de Pedido devem seguir.
 * Isso garante que tanto o Prisma quanto o Memory Repository implementem os mesmos métodos.
 */
export default interface PedidoRepositoryInterface {
  create(descricao: string): Promise<Pedido>;
  findAll(): Promise<Pedido[]>;
  updateEntrega(id: number, entregue: boolean): Promise<Pedido>;
  deleteEntregues(): Promise<{ count: number }>;
}
