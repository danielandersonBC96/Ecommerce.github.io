import React , { useState } from 'react'
import './AdminCategoryList.css'

export const AdminCategoryList = ({onSubmit}) => {
  const [categoryName, setCategoryName] = useState('')
  
  const handleSubmit = ( event ) => {

    event.preventDefault()
    onSubmit(categoryName);
    setCategory('')
  }
  return (

    <form onSubmit={handleSubmit}>
      <label htmlFor="categoryName">Nome da Categoria:</label>
      <input
        type="text"
        id="categoryName"
        value={categoryName}
        onChange={(event) => setCategoryName(event.target.value)}
        required
      />
      <button type="submit">Adicionar Categoria</button>
    </form>



  )
}
