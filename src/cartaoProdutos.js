import { adicionarAoCarrinho } from "./menuCarrinho";
import { catalogo } from "./utilidades";

export function renderizarCatalogo() {
    for(const produtoCatalogo of catalogo) {

      const cartaoProduto = `<div class='group shadow-md shadow-black-300 font-sans p-2 border-solid border-2 border-black-500 w-40 m-2 rounded-lg flex flex-col justify-between' id="card-produto-${produtoCatalogo.id}">
        <img class="px-8 py-2 mt-3 group-hover:scale-150 duration-300" src="./assets/img/${produtoCatalogo.nomeArquivoImagem}"
          alt=""
          style="height: 100px;"
        />
    
        <p class="text-xs py-2">${produtoCatalogo.marca}</p>
        <p class="font-semibold text-sm">${produtoCatalogo.nome}</p>
        <p class="font-bold text-base py-2">$ ${produtoCatalogo.preco},00</p>
        <button id="adicionar-${produtoCatalogo.id}" class="bg-amber-400 hover:bg-amber-500 px-4 font-bold text-white gap-8 rounded-full border-solid border-2 border-amber-500">Comprar</button>
        </div>`;
    
       document.getElementById("container-produto").innerHTML += cartaoProduto;
    
    }

    for (const produtoCatalogo of catalogo){
        document
         .getElementById(`adicionar-${produtoCatalogo.id}`)
         .addEventListener("click", () => adicionarAoCarrinho(produtoCatalogo.id))
    }

}