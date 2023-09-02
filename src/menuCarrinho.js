import { catalogo, salvarLocalStorage, lerLocalStorage } from "./utilidades";

const idsProdutoCarrinhoQntd = lerLocalStorage('carrinho') ?? {

};

function abrirCarrinho() {
    document.getElementById('carrinho').classList.remove('right-[-280px]');
    document.getElementById('carrinho').classList.add('right-[0px]');
};

function fecharCarrinho() {
    document.getElementById('carrinho').classList.add('right-[-280px]');
    document.getElementById('carrinho').classList.remove('right-[0px]');
};

export function inicializarCarrinho() {
    const botaoFecharCarrinho = document.getElementById('fechar-carrinho');
    const botaoAbrirCarrinho = document.getElementById('abrir-carrinho');
    const botaoIrParaCheckout = document.getElementById("finalizar-compra");

    botaoFecharCarrinho.addEventListener('click', fecharCarrinho);
    botaoAbrirCarrinho.addEventListener('click', abrirCarrinho);
    botaoIrParaCheckout.addEventListener("click", irParaCheckout);

};

function irParaCheckout(){
  if(Object.keys(idsProdutoCarrinhoQntd).length === 0) {
    return;
  }
  window.location.href = "./checkout.html";
}

export function renderizarProdutosCarrinhos() {
  const containerProdutoCarrinho = document.getElementById('produtos-carrinho');
  containerProdutoCarrinho.innerHTML = '';
  for (const idProduto in idsProdutoCarrinhoQntd) {
    desenharProdutoNoCarrinho(idProduto);
  }
}

function removerDoCarrinho(idProduto) {
  delete idsProdutoCarrinhoQntd[idProduto];
  salvarLocalStorage('carrinho', idsProdutoCarrinhoQntd);
  atualizarPrecoCarrinho();
  renderizarProdutosCarrinhos();
}

function incrementarQntdProduto(idProduto) {
  idsProdutoCarrinhoQntd[idProduto]++;
  salvarLocalStorage('carrinho', idsProdutoCarrinhoQntd);
  atualizarPrecoCarrinho();
  atualizarQntd(idProduto);
}

function decrementarQntdProduto(idProduto) {
  if (idsProdutoCarrinhoQntd[idProduto] === 1){
    removerDoCarrinho(idProduto);
  
    return;
  }
  idsProdutoCarrinhoQntd[idProduto]--;
  salvarLocalStorage('carrinho', idsProdutoCarrinhoQntd);
  atualizarPrecoCarrinho();
  atualizarQntd(idProduto);
}

function atualizarQntd(idProduto){
  document.getElementById(`qntd-${idProduto}`).innerText = idsProdutoCarrinhoQntd[idProduto];
}

function desenharProdutoNoCarrinho(idProduto) {
  const produto = catalogo.find((p) => p.id === idProduto);
  const containerProdutoCarrinho = document.getElementById('produtos-carrinho');

  const elementoArticle = document.createElement("article");
  const articleClasses = ["flex", "rounded-lg", "border-solid", "border-2", "border-amber-500", "p-2", "bg-white", "relative"]
  
  for (const articleClass of articleClasses) {
    elementoArticle.classList.add(articleClass);
  }

  const cartaoProdutoCarrinho = ` <button id="remover-item-${produto.id}"><i class="fa-regular fa-circle-xmark text-slate-500 hover:text-red-500 absolute top-1 right-1"></i></button>
  <img class="h-14 rounded-lg" src="./assets/img/${produto.nomeArquivoImagem}" alt="">
  <div class="px-3 py-2 flex flex-col justify-between">
    <p class="text-black text-xs font-semibold">${produto.nome}</p>
    <p class="font-bold text-green-400">$ ${produto.preco},00</p>
  </div>
  <div class="flex text-black items-end absolute bottom-1 right-1 text-xs">
    <button id="decrementar-produto-${produto.id}"><i class="fa-solid fa-minus"></i></button>
    <p id="qntd-${idProduto}" class="ml-2">${idsProdutoCarrinhoQntd[produto.id]}</p>
    <button id="incrementar-produto-${produto.id}" class="ml-2"><i class="fa-solid fa-plus"></i></button>
  </div>`;

elementoArticle.innerHTML = cartaoProdutoCarrinho;

containerProdutoCarrinho.appendChild(elementoArticle);

document.getElementById(`decrementar-produto-${produto.id}`).addEventListener("click", () => decrementarQntdProduto(produto.id));
document.getElementById(`incrementar-produto-${produto.id}`).addEventListener("click", () => incrementarQntdProduto(produto.id));
document.getElementById(`remover-item-${produto.id}`).addEventListener("click", () => removerDoCarrinho(produto.id));
}

export function adicionarAoCarrinho(idProduto) {
    if(idProduto in idsProdutoCarrinhoQntd){
      incrementarQntdProduto(idProduto);
      return;
    }
    idsProdutoCarrinhoQntd[idProduto] = 1;
    salvarLocalStorage('carrinho', idsProdutoCarrinhoQntd);
    atualizarPrecoCarrinho();
    desenharProdutoNoCarrinho(idProduto);
}

export function atualizarPrecoCarrinho() {
  const precoCarrinho = document.getElementById('total-carrinho');
  let precoTotalCarrinho = 0;
  for (const idProdutoNoCarrinho in idsProdutoCarrinhoQntd) {
    precoTotalCarrinho += catalogo.find(p => p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoQntd [idProdutoNoCarrinho];

  }

  precoCarrinho.innerText = `Total: $${precoTotalCarrinho},00`;
    
}