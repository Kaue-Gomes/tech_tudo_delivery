import PedidoRepositoryFactory from '../repository/PedidoRepositoryFactory';
import PedidoRepositoryInterface from '../repository/interfaces/PedidoRepositoryInterface';
import { Pedido } from '@prisma/client';
import { PedidoStrategy } from '../strategies/PedidoStrategy';
import { SimpleSaveStrategy } from '../strategies/SimpleSaveStrategy';

export default class PedidoService {
  private repository: PedidoRepositoryInterface;
  private strategy: PedidoStrategy;

  /**
   * Construtor da Service, aplicando o Factory Method e a Strategy.
   * @param strategy - Estratégia de processamento da descrição do pedido.
   */
  constructor(strategy?: PedidoStrategy) {
    // Factory Method: cria o repositório baseado no tipo definido (ex: Prisma ou Memory)
    this.repository = PedidoRepositoryFactory.createRepository();

    // Strategy: define a estratégia de processamento da descrição (pode ser trocada no futuro)
    this.strategy = strategy || new SimpleSaveStrategy();
  }

  /**
   * Cadastra um novo pedido, aplicando a estratégia de processamento.
   * @param descricao - Texto da descrição do pedido.
   * @returns Pedido criado.
   */
  async cadastrarPedido(descricao: string): Promise<Pedido> {
    const descricaoProcessada = this.strategy.processar(descricao);
    return this.repository.create(descricaoProcessada);
  }

  /**
   * Lista todos os pedidos existentes.
   * @returns Lista de pedidos.
   */
  async listarPedidos(): Promise<Pedido[]> {
    return this.repository.findAll();
  }

  /**
   * Marca um pedido como entregue.
   * @param id - ID do pedido.
   * @returns Pedido atualizado.
   */
  async entregarPedido(id: number): Promise<Pedido> {
    return this.repository.updateEntrega(id, true);
  }

  /**
   * Remove todos os pedidos que já foram entregues.
   * @returns Quantidade de pedidos removidos.
   */
  async removerEntregues(): Promise<{ count: number }> {
    return this.repository.deleteEntregues();
  }
}
