import { apagarDoLocalStorage, desenharProdutoSimplesNoCarrinho, lerLocalStorage, salvarLocalStorage } from "./src/utilidades";

function desenharProdutosCheckout() {
    const idsProdutoCarrinhoQntd = lerLocalStorage('carrinho') ?? {};
    for(const idProduto in idsProdutoCarrinhoQntd){
        desenharProdutoSimplesNoCarrinho(idProduto, "container-produto-checkout", idsProdutoCarrinhoQntd[idProduto])
    }
};

function finalizarCompra(evento) {
    evento.preventDefault();
    const dataAtual = new Date();
    if(Object.keys(idsProdutoCarrinhoQntd).length === 0) {
        return;
    }

    const idsProdutoCarrinhoQntd = lerLocalStorage('carrinho') ?? {};
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutoCarrinhoQntd
    }
    const historicoDePedidos = lerLocalStorage('historico') ?? [];
    const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];

    salvarLocalStorage("historico", historicoDePedidosAtualizado);
    apagarDoLocalStorage('carrinho')

    window.location.href = './pedidos.html';
}

desenharProdutosCheckout();

document.addEventListener("submit", (evt) => finalizarCompra(evt));