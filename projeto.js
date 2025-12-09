
const carrinho = []

const buttons = document.querySelectorAll('.add')

const baseLanches = {
    nome: 'X-Tudo',
    imagem: 'download (1).jpeg',
    preco: 12.00,
}

const baseBebidas ={
    nome: 'Coca cola',
    imagem: 'images.jpeg',
    preco: 6.00,
}

const basePizzas = {
    nome: 'pizza de calabresa',
    imagem: 'download.jpeg',
    preco: 49.90,
}

for (btn of buttons){
    btn.addEventListener('click', e => {
        adicionar(e)
    })
}

function adicionar(e){  
    const card = e.target.parentNode.parentNode
    
    const tipo = card.getAttribute('data-category')
    
    
    if (tipo === 'lanches'){
        const quantidade = document.querySelector(`[data-category = ${tipo}]`).querySelector('input').value
        
        const produto = {...baseLanches, quantidade: parseInt(quantidade)}
        
        carrinho.push(produto)
    } else if (tipo === 'bebidas'){
        const quantidade = document.querySelector(`[data-category = ${tipo}]`).querySelector('input').value
        
        const produto = {...baseBebidas, quantidade: parseInt(quantidade)}
        
        carrinho.push(produto)
        
    } else {
        const quantidade = document.querySelector(`[data-category = ${tipo}]`).querySelector('input').value
        
        const produto = {...basePizzas, quantidade: parseInt(quantidade)}
        
        carrinho.push(produto)
    }

    atualizarLocalStorage()
}

let listaProdutos = ''

document.addEventListener('DOMContentLoaded' , () => {
    if (document.title === 'Carrinho'){
        listaProdutos = document.getElementById('lista-produtos')
        buscarLocalStorage()
    }
})

function atualizarLocalStorage(){
    localStorage.setItem('carrinho', JSON.stringify([...JSON.parse(localStorage.getItem('carrinho')), ...carrinho]))
}

function buscarLocalStorage(){
    const itens = localStorage.getItem('carrinho')
    carrinho.push(JSON.parse(itens))
    listarProdutos()
}

function listarProdutos(){
    listaProdutos.textContent = ''

    console.log(carrinho[0])
    
    for (item of carrinho[0]){
        listaProdutos.innerHTML += `
        <div class="card" >
        <img src="${item.imagem}" alt=""> 
        <div class="card-info">   
        <h3>${item.nome}</h3>
        <p>pao e carne</p>
        <span class="preço">${item.preco}</span>
        </div>
        <div>
        <p>Quantidade</p>
        <p>${item.quantidade}</p>
                    <button class="add">Adicionar</button>
                </div>
            </div>

        `
    }
}
