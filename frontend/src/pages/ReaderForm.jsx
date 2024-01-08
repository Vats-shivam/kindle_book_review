import React, { useState, useEffect } from 'react';

const ReaderForm = (props) => {
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    publication: '',
    genre: '',
    review: '',
    rating: '',
  });

  const [allBooks, setAllBooks] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/reader/addBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookDetails),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Book added successfully:', data);
        // Optionally, you can reset the form after successful submission
        setBookDetails({
          title: '',
          author: '',
          publication: '',
          genre: '',
          review: '',
          rating: '',
        });
        // After adding a book, refresh the list of all books
        fetchAllBooks();
      } else {
        console.error('Failed to add book:', data.error);
      }
    } catch (error) {
      console.error('Error during book submission:', error);
    }
  };

  const fetchAllBooks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/reader/books');
      const data = await response.json();

      if (response.ok) {
        setAllBooks(data);
        console.log('Fetched all books:', data);
      } else {
        console.error('Error fetching books:', data.error);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  useEffect(() => {
    // Fetch all books when the component mounts
    fetchAllBooks();
  }, []);

  const handleLogout=()=>{
    props.logout(false)
  }


  return (
    <div className='h-screen w-screen flex flex-col items-center'>
      <button className="absolute right-0 top-0 w-56 bg-red-800" onClick={handleLogout}>LOG OUT</button> 
      <h2>Add Book Review</h2>
      <form className='flex flex-col h-screen gap-50'>
        <label>Title:</label>
        <input type="text" name="title" value={bookDetails.title} onChange={handleInputChange} />

        <label>Author:</label>
        <input type="text" name="author" value={bookDetails.author} onChange={handleInputChange} />

        <label>Publication:</label>
        <input type="text" name="publication" value={bookDetails.publication} onChange={handleInputChange} />

        <label>Genre:</label>
        <input type="text" name="genre" value={bookDetails.genre} onChange={handleInputChange} />

        <label>Review:</label>
        <textarea name="review" value={bookDetails.review} onChange={handleInputChange}></textarea>

        <label>Rating:</label>
        <input type="number" name="rating" value={bookDetails.rating} onChange={handleInputChange} />

        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>

      <div>
        <h2>All Books</h2>
        <ul>
          {allBooks.map((book, index) => (
            <li key={index}>
              <strong>Title:</strong> {book.title} | <strong>Author:</strong> {book.author} | <strong>Rating:</strong> {book.rating}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReaderForm;
