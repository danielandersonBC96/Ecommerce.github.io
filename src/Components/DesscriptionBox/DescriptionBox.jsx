import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DescriptionBox.css';

export const DescriptionBox = () => {
  const { productId } = useParams();
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
      const updatedComments = [...commentsList];
      updatedComments[editIndex].text = comment;
      setCommentsList(updatedComments);
      setEditIndex(null);
    } else {
      const newComment = { user: username, text: comment, productId: productId };
      const newComments = [...commentsList, newComment];
      setCommentsList(newComments);
      localStorage.setItem(`product_${productId}_comments`, JSON.stringify(newComments));
    }
    setComment('');
  };

  const handleEdit = (index) => {
    setComment(commentsList[index].text);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedComments = [...commentsList];
    updatedComments.splice(index, 1);
    setCommentsList(updatedComments);
    localStorage.setItem(`product_${productId}_comments`, JSON.stringify(updatedComments));
  };

  useEffect(() => {
    const initialComments = localStorage.getItem(`product_${productId}_comments`) || '[]';
    setCommentsList(JSON.parse(initialComments));
  }, [productId]);

  return (
    <div className='descriptionbox'>
      <div className="description-navigator">
        <div className="descriptionbox-nav-box">Product Reviews</div>
        <div className="descrptionbox-nav-box-fade">Reviews({commentsList.length})</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Leave a comment about the product
        </p>
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
