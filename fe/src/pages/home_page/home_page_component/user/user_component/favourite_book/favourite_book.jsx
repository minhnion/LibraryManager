import React, { useState, useEffect } from "react";
import "./favourite_book.css";
import { handleRefreshToken } from "../../../../../auth/login_register";

const FavouriteBooks = () => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Quản lý trạng thái của modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  // Hàm gọi API để lấy danh sách sách yêu thích
  useEffect(() => {
    const fetchFavouriteBooks = async () => {
      setLoading(true);
      setError(null);
      await handleRefreshToken();
      const accessToken = localStorage.getItem("access_token");
      try {
        const response = await fetch(
          "https://librarymanager-s6yc.onrender.com/user/favorite",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("No Data.");
        }

        const data = await response.json();
        console.log(data);
        setFavouriteBooks(data.books || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavouriteBooks();
  }, []);

  const openModal = (id) => {
    setSelectedBookId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBookId(null);
  };

  const handleDeleteBook = async () => {
    try {
      await handleRefreshToken();
      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(
        `https://librarymanager-s6yc.onrender.com/user/favorite/${selectedBookId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
      }

      if (!response.ok) {
        throw new Error("Không thể xóa sách.");
      }

      setFavouriteBooks(
        favouriteBooks.filter((book) => book.id !== selectedBookId)
      );
      closeModal();
    } catch (err) {
      setError(err.message);
    }
  };

  // Hiển thị trạng thái
  if (loading) {
    return <div className="centered-message">Loading...</div>;
  }

  if (error) {
    return <div className="centered-message">{error}</div>;
  }

  if (favouriteBooks.length === 0) {
    return (
      <div className="centered-message">
        Không có sách yêu thích để hiển thị.
      </div>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Sách</th>
            <th>Tác giả</th>
            <th style={{ width: "400px" }}>Mô tả</th>
            <th>Hình ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {favouriteBooks.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.description}</td>
              <td className="image-column">
                <img
                  src={book.image_url || "https://via.placeholder.com/150"}
                  alt={book.title}
                />
              </td>
              <td>
                <button
                  onClick={() => openModal(book.id)}
                  className="delete-button"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content-fabook">
            <h3>Bạn chắc chắn muốn xóa sách này chứ?</h3>
            <div className="modal-buttons">
              <button onClick={closeModal} className="cancel-button">
                Không
              </button>
              <button onClick={handleDeleteBook} className="confirm-button">
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavouriteBooks;
