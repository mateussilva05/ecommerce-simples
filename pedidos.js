import { lerLocalStorage, desenharProdutoSimplesNoCarrinho } from "./src/utilidades";

function criarPedidoHistorico(pedidoComData) {
    const elementoPedido = `<p class="text-xl text-bold">${pedido.dataPedido}</p>
    <section id="container-pedido-${pedidoComData.dataPedido}"></section>
    `;
    const main = document.getElementsByTagName('main')[0];
    main.innerHTML += elementoPedido;

    for (const idProduto in pedidoComData.pedido) {
        desenharProdutoSimplesNoCarrinho(idProduto, `container-pedido-${pedidoComData.dataPedido}`, pedidoComData.pedido[idProduto])
    }
}

function renderizarHistoricoPedidos() {
    const historico = lerLocalStorage('historico');
    for (const pedidoComData of historico) {
        criarPedidoHistorico(pedidoComData);
    }
}

renderizarHistoricoPedidos();