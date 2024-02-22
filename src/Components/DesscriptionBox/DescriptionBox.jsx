
import React, { useState, useEffect } from 'react';
import './DescriptionBox.css';

export const DescriptionBox = ({ productId }) => {
  // Inicializa o estado dos comentários com base no ID do produto
  const initialComments = localStorage.getItem(`product_${productId}_comments`) || '[]';
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState(JSON.parse(initialComments));
  const [editIndex, setEditIndex] = useState(null);
  const [username, setUsername] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username) {
      alert('Por favor, insira seu nome.');
      return;
    }
    if (editIndex !== null) {
      // Se estiver em modo de edição, atualiza o comentário existente
      const updatedComments = [...commentsList];
      updatedComments[editIndex].text = comment;
      setCommentsList(updatedComments);
      setEditIndex(null);
    } else {
      // Se não estiver em modo de edição, adiciona um novo comentário
      const newComment = { user: username, text: comment };
      const newComments = [...commentsList, newComment];
      setCommentsList(newComments);
    }
    // Limpa o campo de comentário após o envio
    setComment('');
  };

  const handleEdit = (index) => {
    // Define o comentário a ser editado na textarea
    setComment(commentsList[index].text);
    // Define o índice do comentário a ser editado
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    // Remove o comentário da lista de comentários
    const updatedComments = [...commentsList];
    updatedComments.splice(index, 1);
    setCommentsList(updatedComments);
  };

  // Efeito para salvar os comentários na localStorage quando houver alterações
  useEffect(() => {
    localStorage.setItem(`product_${productId}_comments`, JSON.stringify(commentsList));
  }, [commentsList, productId]);

  return (
    <div className='descriptionbox'>
      <div className="description-navigator">
        <div className="descriptionbox-nav-box">Product Reviews</div>
        <div className="descrptionbox-nav-box-fade">Reviews({commentsList.length})</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Harum vitae laborum voluptates
          veniam earum sit sequi ipsam! Laboriosam beatae reprehenderit
          consequuntur iste aliquid sed nihil,
          id, nemo quia ab perferendis.
        </p>
        {/* Formulário de comentário */}
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="comment-textarea-wrapper">
            <textarea
             
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Seu nome"
              className="username-input"
            
            />
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Adicione um comentário..."
              className="comment-textarea"
            />
            <button type="submit" className="comment-button">{editIndex !== null ? 'Salvar' : 'Enviar'}</button>
          </div>
        </form>
        {/* Renderiza os comentários na tela */}
        <div className="comments-section">
          <h2>Comentários:</h2>
          <ul>
            {commentsList.map((comment, index) => (
              <li key={index}>
                <strong className='nome'>{comment.user}:</strong> {comment.text}
                <button onClick={() => handleEdit(index)} className='editar'>Editar</button>
                <button onClick={() => handleDelete(index)} className='excluir'>Excluir</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
