import React, { useState } from 'react';
import './book_list.css';
import Pagination from '../pagination/pagination';
import BookModal from './book_modal';

const BookList = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  // Giả lập một danh sách sách lớn hơn
  const allBooks = Array(25).fill().map((_, index) => ({
    id: index + 1,
    title: `Book ${index + 1}`,
    author: `Author ${index + 1}`,
    price: `$${(Math.random() * 20 + 10).toFixed(2)}`,
    imageUrl: "https://kenh14cdn.com/thumb_w/600/27fc8f4935/2015/09/09/TTHVTCX%20-%20Official%20poster-cd46e.jpg",
    description: `This is a detailed description for Book ${index + 1}. It contains all the important information about the book that readers might want to know before making a purchase decision...`
  }));

  // Tính toán số trang
  const totalPages = Math.ceil(allBooks.length / booksPerPage);

  // Lấy sách cho trang hiện tại
  const getCurrentBooks = () => {
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    return allBooks.slice(startIndex, endIndex);
  };

  const handleCardClick = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className="book-container">
      <h1 className="book-title">Danh sách sách</h1>

      <div className="book-grid">
        {getCurrentBooks().map((book) => (
          <div key={book.id} className="book-card" onClick={() => handleCardClick(book)}>
            <div className="book-card-header">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="book-image"
              />
            </div>
            <div className="book-card-content">
              <h2 className="book-name">{book.title}</h2>
              <p className="book-author">{book.author}</p>
              <p className="book-description">{book.description}</p>
              <div className="book-card-footer">
                <span className="book-price">{book.price}</span>
                <button
                  className="add-to-cart-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add to cart logic here
                  }}
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        maxPagesToShow={5}
        labels={{
          previous: 'Trước',
          next: 'Sau',
          pageInfo: 'Trang {current} / {total}'
        }}
      />

      {/* Modal */}
      <BookModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        labels={{
          addToCart: 'Thêm vào giỏ'
        }}
      />
    </div>
  );
};

export default BookList;