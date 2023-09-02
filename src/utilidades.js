export const catalogo = [{
    id: '1',
    nome: 'Console Playstation 5',
    marca: 'Sony',
    preco: 3499,
    nomeArquivoImagem: 'console-sony-playstation-5.jpg'
},
{
    id: '2',
    nome: 'Console Xbox Series S',
    marca: 'Microsoft',
    preco: 1899,
    nomeArquivoImagem: 'Console-Xbox-Microsoft-Series-S.jpg'
},
{
    id: '3',
    nome: 'Nintendo Switch',
    marca: 'Nintendo',
    preco: 4590,
    nomeArquivoImagem: 'Nintendo-Switch.jpg'
},
{
    id: '4',
    nome: 'Placa de Vídeo RTX 3060',
    marca: 'Asus',
    preco: 1990,
    nomeArquivoImagem: 'Placa-de-Vídeo-RTX-3060-Asus.jpg'
},
{
    id: '5',
    nome: 'Processador Intel Core I5-10400f',
    marca: 'Intel',
    preco: 699,
    nomeArquivoImagem: 'processador-intel-core-i5-10400f.jpg'
},
{
    id: '6',
    nome: 'Headset Gamer HyperX',
    marca: 'HyperX',
    preco: 159,
    nomeArquivoImagem: 'headset-hyperx.jpg'
},
{
    id: '7',
    nome: 'Mouse Gamer HyperX',
    marca: 'HyperX',
    preco: 109,
    nomeArquivoImagem: 'mouse-hyperx.jpg'
},
{
    id: '8',
    nome: 'Apple iPhone 13',
    marca: 'Apple',
    preco: 5999,
    nomeArquivoImagem: 'Apple-iPhone-13.jpg'
},
{
    id: '9',
    nome: 'Apple Airpods 3ª Geracao',
    marca: 'Apple',
    preco: 1099,
    nomeArquivoImagem: 'airpods-apple-3-geracao.jpg'
}];

export function salvarLocalStorage(chave, informacao) {
    localStorage.setItem(chave, JSON.stringify(informacao));
}

export function lerLocalStorage(chave) {
    return JSON.parse(localStorage.getItem(chave));
}

export function apagarDoLocalStorage(chave) {
    localStorage.removeItem(chave);
}

export function desenharProdutoSimplesNoCarrinho(idProduto, idConteinerHtml, quatidadeProduto) {
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutoCarrinho = document.getElementById(idConteinerHtml);
  
    const elementoArticle = document.createElement("article");
    const articleClasses = ["flex", "rounded-lg", "border-solid", "border-2", "border-amber-500", "p-2", "bg-white", "relative", "mb-2", "h-14"]
    
    for (const articleClass of articleClasses) {
      elementoArticle.classList.add(articleClass);
    }
  
    const cartaoProdutoCarrinho = `<img class="h-10 rounded-lg" src="./assets/img/${produto.nomeArquivoImagem}" alt="">
    <div class="px-3 flex flex-col justify-between">
      <p class="text-black text-xs font-semibold">${produto.nome}</p>
      <p class="font-bold text-green-400 text-sm">$ ${produto.preco},00</p>
    </div>
    <div class="flex text-black items-end absolute bottom-1 right-1 text-xs">
      <p id="qntd-${idProduto}" class="ml-2">${quatidadeProduto}</p>
    </div>`;
  
  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  
  containerProdutoCarrinho.appendChild(elementoArticle);
};