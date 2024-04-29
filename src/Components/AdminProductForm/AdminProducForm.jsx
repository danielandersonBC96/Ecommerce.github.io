import React from 'react'
import './AdminProducForm.css'

export const AdminProductForm = () => {


  const [ nome, setNome ] = useState('');
  const [ descricao, setDescricao] = useState('');
  const [ preco, setPreco ] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleSubmit = (event) => {
   
    event.preventDefault();

    console.log('Dados do produto', {nome, descricao,preco,categoria})
  
  }


  return (
    <div>
      
      <h1>Cadastro de Produto</h1>
        <form onSubmit={handleSubmit}>
        
        <label htmlFor="nome">Nome do Produto:</label><br />
        <input type='text' id='nome' name='nome' value={nome} onChange={(e) => setNome(e.target.value)}  /><br /><br />

        <label htmlFor="descricao">Descrição:</label><br />
        <textarea id="descricao" name="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea><br /><br />

        <label htmlFor='preco'>Preço:</label>
        <input type='number' id='preco' name ='preco' step={0.01}  value={preco} onChange={(e) => setPreco(e.target.value)}/><br /><br />
        <select id="categoria" name="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                   
                    <option value="Shop">Shop</option>
                    <option value="Mens">Mens</option>
                    <option value="Womens">Womens</option>
                    <option value="Kids">Kids</option>
                    {/* Adicione mais opções conforme necessário */}
                </select><br /><br />

                <input type="submit" value="Cadastrar Produtos"/>

        </form>
      
      </div>


  )
}
