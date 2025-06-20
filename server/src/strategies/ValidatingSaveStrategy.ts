import { PedidoStrategy } from './PedidoStrategy';

/**
 * Strategy que valida a descrição do pedido antes de salvar.
 * Implementa a interface PedidoStrategy.
 */
export class ValidatingSaveStrategy implements PedidoStrategy {
  processar(descricao: string): string {
    // Verifica se a descrição está vazia ou só contém espaços em branco
    if (!descricao || descricao.trim() === '') {
      throw new Error('Descrição do pedido não pode ser vazia.');
    }
    // Retorna a descrição tratada (sem espaços nas pontas)
    return descricao.trim();
  }
}
