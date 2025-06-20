import { Request, Response } from 'express';
import PedidoService from '../services/PedidoService';
import { ValidatingSaveStrategy } from '../strategies/ValidatingSaveStrategy';

export default class PedidoController {
  private service = new PedidoService(new ValidatingSaveStrategy());

  async cadastrarPedido(req: Request, res: Response) {
    try {
      const pedido = await this.service.cadastrarPedido(req.body.descricao);
      res.status(201).json(pedido);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async listarPedidos(req: Request, res: Response) {
    try {
      const pedidos = await this.service.listarPedidos();
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar pedidos' });
    }
  }

  async entregarPedido(req: Request, res: Response) {
    try {
      const pedido = await this.service.entregarPedido(parseInt(req.params.id));
      res.json(pedido);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar pedido' });
    }
  }

  async removerEntregues(req: Request, res: Response) {
    try {
      const result = await this.service.removerEntregues();
      res.json({ message: `${result.count} pedidos removidos` });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover pedidos' });
    }
  }
}
