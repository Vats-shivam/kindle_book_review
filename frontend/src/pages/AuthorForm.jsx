import React, { useState } from 'react';

const AuthorForm = (props) => {
  const [authorName, setAuthorName] = useState('');
  const [authorBooks, setAuthorBooks] = useState([]);

  const handleInputChange = (e) => {
    setAuthorName(e.target.value);
  };

  const handleFetchBooks = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/author/books/${authorName}`);
      const data = await response.json();

      if (response.ok) {
        setAuthorBooks(data);
        console.log('Fetched books:', data);
      } else {
        console.error('Error fetching books:', data.error);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };
  const handleLogout=()=>{
    props.logout(false)
  }

  return (
    <div className='h-screen w-screen flex flex-col justify-start items-center'>
      <button className="absolute right-0 top-0 w-56 bg-red-800" onClick={handleLogout}>LOG OUT</button>
      <h2>Fetch Author's Books</h2>
      <label>Author Name:</label>
      <input type="text" value={authorName} onChange={handleInputChange} />

      <button type="button" onClick={handleFetchBooks}>Fetch Books</button>

      <div>
        <h3>Author's Books</h3>
        <ul>
          {authorBooks.map((book, index) => (
            <li key={index}>{book.title} - {book.review}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AuthorForm;