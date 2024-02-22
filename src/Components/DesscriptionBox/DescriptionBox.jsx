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
  const [averageRating, setAverageRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);

  useEffect(() => {
    // Filter comments based on product ID
    const filteredComments = JSON.parse(initialComments).filter(comment => comment.productId === productId);
    setCommentsList(filteredComments);

    // Calculate average rating for filtered comments
    const calculateAverageRating = () => {
      if (filteredComments.length === 0) {
        return 0;
      }
      const totalRating = filteredComments.reduce((acc, comment) => acc + (comment.rating || 0), 0);
      return totalRating / filteredComments.length;
    };
    const average = calculateAverageRating();
    setAverageRating(average);
  }, [initialComments, productId]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username) {
      alert('Please enter your name.');
      return;
    }
    if (editIndex !== null) {
      const updatedComments = [...commentsList];
      updatedComments[editIndex].text = comment;
      updatedComments[editIndex].rating = rating; // Add the rating to the edited comment
      setCommentsList(updatedComments);
      setEditIndex(null);
    } else {
      const newComment = { user: username, text: comment, rating: rating, productId: productId };
      const newComments = [...commentsList, newComment];
      setCommentsList(newComments);
      localStorage.setItem(`product_${productId}_comments`, JSON.stringify(newComments));
    }
    setComment('');
    setRating(0);
  };

  const handleEdit = (index) => {
    setComment(commentsList[index].text);
    setRating(commentsList[index].rating || 0); // Set the rating when editing
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedComments = [...commentsList];
    updatedComments.splice(index, 1);
    setCommentsList(updatedComments);
    localStorage.setItem(`product_${productId}_comments`, JSON.stringify(updatedComments));
  };

  const handleRatingSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }
    setIsRatingSubmitted(true);
    const newRatingComment = { user: username, rating: rating, productId: productId };
    const newComments = [...commentsList, newRatingComment];
    setCommentsList(newComments);
    localStorage.setItem(`product_${productId}_comments`, JSON.stringify(newComments));
    setRating(0);
  };

  return (
    <div className='descriptionbox'>
      <div className="description-navigator">
        <div className="descriptionbox-nav-box">Product Reviews</div>
        <div className="descrptionbox-nav-box-fade">Reviews({commentsList.length})</div>
       
      </div>
      <div className="descriptionbox-description">
        <p>Leave a comment about the product</p>
        <div className="average-rating-section">
          <h2>Rating :</h2>  
          <p>{averageRating.toFixed(1)}</p>
        </div>
      
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="comment-textarea-wrapper">

          <select value={rating} onChange={handleRatingChange} className='ratting'>
              <option value={0}>rating </option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Your name"
              className="username-input"
            />
             
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              className="comment-textarea"
            />
           
            <button type="submit" className="comment-button">{editIndex !== null ? 'Save' : 'Submit'}</button>
          </div>
        </form>
        <div className="comments-section">
          <h1> Comentários :</h1>
          
          <ul className='coments-box'>
            {commentsList.map((comment, index) => (
              <li key={index}>
                <strong className='nome'>{comment.user}:</strong> {comment.text} {/* Display the comment */}
                {comment.rating && <span> - Rating: {comment.rating}</span>} {/* Display the rating if it exists */}
                <button onClick={() => handleEdit(index)} className='editar'>Edit</button>
                <button onClick={() => handleDelete(index)} className='excluir'>Delete</button>
              </li>
            ))}
          </ul>
        </div>
       
        </div>
    </div>
  );
};