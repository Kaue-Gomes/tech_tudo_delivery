import { useState, useEffect } from 'react';
import { 
  listarPedidos, 
  cadastrarPedido, 
  entregarPedido, 
  removerEntregues 
} from '../services/api';

// Interface representando o modelo de Pedido vindo do backend
interface Pedido {
  id: number;
  descricao: string;
  entregue: boolean;
  createdAt: string;
}

const PedidoLista = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    const response = await listarPedidos();
    setPedidos(response.data);
  };

  const handleCadastrar = async () => {
    if (descricao.trim()) {
      await cadastrarPedido(descricao);
      setDescricao('');
      carregarPedidos();
    }
  };

  const handleEntregar = async (id: number) => {
    await entregarPedido(id);
    carregarPedidos();
  };

  const handleRemoverEntregues = async () => {
    await removerEntregues();
    carregarPedidos();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">TechTudoDelivery</h1>

      {/* Campo de cadastro de novos pedidos */}
      <div className="flex mb-6">
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição do pedido"
          className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none"
        />
        <button
          onClick={handleCadastrar}
          className="bg-blue-500 text-white px-6 py-3 rounded-r-lg hover:bg-blue-600 transition"
        >
          Cadastrar
        </button>
      </div>

      {/* Botão para remover pedidos entregues */}
      <div className="mb-6">
        <button
          onClick={handleRemoverEntregues}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Remover Entregues
        </button>
      </div>

      {/* Lista de pedidos */}
      <div className="space-y-4">
        {pedidos.map((pedido) => (
          <div 
            key={pedido.id}
            className={`p-4 rounded-lg shadow ${
              pedido.entregue ? 'bg-green-50' : 'bg-yellow-50'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-lg">{pedido.descricao}</p>
                <p className="text-sm text-gray-600">
                  {new Date(pedido.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  pedido.entregue 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {pedido.entregue ? 'Entregue' : 'Pendente'}
                </span>

                {!pedido.entregue && (
                  <button
                    onClick={() => handleEntregar(pedido.id)}
                    className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition"
                  >
                    Entregar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PedidoLista;
