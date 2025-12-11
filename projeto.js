const carrinho = []

const buttons = document.querySelectorAll('.add')

const baseLanches = {
    nome: 'X-Tudo',
    imagem: 'burg.jpeg',
    preco: 12.00,
}

const baseBebidas = {
    nome: 'Coca cola',
    imagem: 'coca.jpeg',
    preco: 6.00,
}

const basePizzas = {
    nome: 'pizza de calabresa',
    imagem: 'pizza.jpeg',
    preco: 49.90,
}

for (btn of buttons) {
    btn.addEventListener('click', e => {
        adicionar(e)
    })
}

function adicionar(e) {
    const card = e.target.parentNode.parentNode
    const tipo = card.getAttribute('data-category')

    let baseProduto

    if (tipo === 'lanches') baseProduto = baseLanches
    else if (tipo === 'bebidas') baseProduto = baseBebidas
    else baseProduto = basePizzas

    const quantidade = card.querySelector('input').value
    const produto = { ...baseProduto, quantidade: parseInt(quantidade) }

    carrinho.push(produto)

    atualizarLocalStorage()
    mostrarToast()
}

// ------------------------------------------------------------------
// CARRINHO (página carrinho.html)
// ------------------------------------------------------------------

let listaProdutos = ''

document.addEventListener('DOMContentLoaded', () => {
    if (document.title === 'Carrinho') {
        listaProdutos = document.getElementById('lista-produtos')
        buscarLocalStorage()
    }
})

function atualizarLocalStorage() {
    const itensAtual = JSON.parse(localStorage.getItem('carrinho')) || []
    const novosItens = [...itensAtual, ...carrinho]

    localStorage.setItem('carrinho', JSON.stringify(novosItens))
}

function buscarLocalStorage() {
    const itens = JSON.parse(localStorage.getItem('carrinho')) || []

    carrinho.length = 0
    carrinho.push(...itens)

    listarProdutos()
}

function listarProdutos() {
    listaProdutos.textContent = ''

    carrinho.forEach((item, i) => {
        listaProdutos.innerHTML += `
        <div class="card">
            <img src="${item.imagem}" alt=""> 

            <div class="card-info">   
                <h3>${item.nome}</h3>
                <p>pao e carne</p>
             <span class="preço">R$ ${item.preco.toFixed(2)}</span>
            </div>

            <div class="acoes">
            <div class="quantidade-box">
                <span>Qtd:</span>
                <span>${item.quantidade}</span>
            </div>

            <button class="remover" data-index="${i}">
                Remover
            </button>
        </div>

</div>

        </div>`;
    })
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remover")) {
        const index = e.target.getAttribute("data-index")

        carrinho.splice(index, 1)
        localStorage.setItem("carrinho", JSON.stringify(carrinho))

        listarProdutos()
    }
})

// ------------------------------------------------------------------
// TOAST
// ------------------------------------------------------------------

function mostrarToast() {
    const toast = document.getElementById("toast")

    toast.classList.add("show")

    setTimeout(() => {
        toast.classList.remove("show")
    }, 2000)
}
document.addEventListener("DOMContentLoaded", () => {
    const btnFinalizar = document.querySelector(".btn-final");

    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", () => {
            localStorage.removeItem("carrinho");
            carrinho.length = 0;
            alert("Pedido finalizado com sucesso!");
            window.location.href = "projeto.html";
        });
    }
});
