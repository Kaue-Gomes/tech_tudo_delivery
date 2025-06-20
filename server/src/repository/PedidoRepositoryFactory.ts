import PedidoRepositoryInterface from './interfaces/PedidoRepositoryInterface';
import PedidoPrismaRepository from './PedidoPrismaRepository';
import PedidoMemoryRepository from './PedidoMemoryRepository';

/**
 * Factory Method para criação de repositórios de Pedido.
 * Decide em tempo de execução qual repositório criar (ex: Prisma ou em memória).
 */
export default abstract class PedidoRepositoryFactory {
  static createRepository(): PedidoRepositoryInterface {
    // Lê o tipo de repositório do ambiente (padrão: 'prisma')
    const ambiente = process.env.REPOSITORY_TYPE || 'prisma';

    switch (ambiente) {
      case 'memory':
        // Retorna o repositório em memória (ideal para testes)
        return new PedidoMemoryRepository();
      case 'prisma':
      default:
        // Retorna o repositório que usa o Prisma (produção ou desenvolvimento real)
        return new PedidoPrismaRepository();
    }
  }
}
