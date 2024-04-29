import React , { useState } from "react"



export const AdminProductList = () => {

 const [nomeProduto , setNomeProduto] = useState('');
 const [descricaoProduto , setDescricaoProduto ] = useState('');
 const [precoProduto , setPrecoProduto  ]= useState('');
 const [categoria , setCategoria ] = useState('Shop');
 const [produto, setProduto ] = useState([])

 const handelSubmit = (event) =>{

   event.preventDefault();
   const novoProduto ={

         nome: nomeProduto,
         descricao: descricaoProduto,
         preco: precoProduto,
         categoria:categoria

   }

   setProduto([...produto, nomeProduto]);
   setNomeProduto('');
   setDescricaoProduto('');
   setPrecoProduto('')

 }



  return (
    <div>
    <h2>Criar Novo Produto</h2>
    <form onSubmit={ handelSubmit}>
        <label htmlFor="nomeProduto">Nome do Produto:</label><br />
        <input type="text" id="nomeProduto" value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)} required /><br /><br />

        <label htmlFor="descricaoProduto">Descrição:</label><br />
        <textarea id="descricaoProduto" value={descricaoProduto} onChange={(e) => setDescricaoProduto(e.target.value)} required></textarea><br /><br />

        <label htmlFor="precoProduto">Preço:</label><br />
        <input type="number" id="precoProduto" value={precoProduto} onChange={(e) => setPrecoProduto(e.target.value)} required /><br /><br />

        <label htmlFor="categoria">Categoria:</label><br />
        <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="Shop">Shop</option>
            <option value="Mens">Mens</option>
            <option value="Womens">Womens</option>
            <option value="Kids">Kids</option>
            {/* Adicione mais opções conforme necessário */}
        </select><br /><br />

        <button type="submit">Adicionar Produto</button>
    </form>

    <h2>Lista de Produtos:</h2>
    <ul>
        {produtos.map((produto, index) => (
            <li key={index}>
                <strong>Nome:</strong> {produto.nome}, <strong>Descrição:</strong> {produto.descricao}, <strong>Preço:</strong> {produto.preco}, <strong>Categoria:</strong> {produto.categoria}
            </li>
        ))}
    </ul>
</div>
);
  
}
