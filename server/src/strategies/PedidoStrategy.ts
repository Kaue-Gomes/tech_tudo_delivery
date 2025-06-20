/**
 * Interface Strategy para o processamento de descrição de pedidos.
 * 
 * Permite definir diferentes estratégias de processamento da descrição,
 * garantindo que todas as estratégias implementem o método processar.
 */
export interface PedidoStrategy {
  /**
   * Método responsável por processar a descrição de um pedido antes de salvar.
   * Cada estratégia pode implementar uma lógica diferente (ex: validar, formatar, etc).
   * 
   * @param descricao - A descrição original do pedido.
   * @returns A descrição processada.
   */
  processar(descricao: string): string;
}
