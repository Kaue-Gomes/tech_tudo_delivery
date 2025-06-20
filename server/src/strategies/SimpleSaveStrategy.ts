import { PedidoStrategy } from './PedidoStrategy';

/**
 * Implementação simples da Strategy.
 * 
 * Apenas retorna a descrição original sem nenhum processamento adicional.
 * Útil como default para casos em que nenhuma validação ou transformação é necessária.
 */
export class SimpleSaveStrategy implements PedidoStrategy {
  processar(descricao: string): string {
    // Apenas retorna a descrição como está, sem alterações.
    return descricao;
  }
}
