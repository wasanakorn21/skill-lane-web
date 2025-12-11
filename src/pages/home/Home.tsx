import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axios";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, [search]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/book", {
        params: { search },
      });
      setBooks(response.data);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "ไม่สามารถดึงข้อมูลหนังสือได้";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userId");
    navigate("/login");
  };

  const handleCreateBook = () => {
    navigate("/create-book");
  };

  const handleBorrow = async (e: React.MouseEvent, bookId: number) => {
    e.stopPropagation();
    try {
      await axiosInstance.post("/book/borrow", {
        bookId: Number(bookId),
        userId: Number(sessionStorage.getItem("userId")),
        quantity: 1,
      });
      toast.success("ยืมหนังสือสำเร็จ");
      fetchBooks();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "ไม่สามารถยืมหนังสือได้";
      toast.error(errorMessage);
    }
  };

  const handleReturn = async (e: React.MouseEvent, borrowId: number) => {
    e.stopPropagation();
    try {
      await axiosInstance.post(`/book/${borrowId}/return`);
      toast.success("คืนหนังสือสำเร็จ");
      fetchBooks();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "ไม่สามารถคืนหนังสือได้";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Skill Lane</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>
      <main className="home-content">
        <div className="search-section">
          <div className="search-form">
            <input
              type="text"
              className="search-input"
              placeholder="ค้นหาหนังสือ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={handleCreateBook} className="create-book-button">
            + สร้างหนังสือ
          </button>
        </div>
        <div className="books-container">
          {loading ? (
            <p className="loading-message">กำลังโหลด...</p>
          ) : books.length === 0 ? (
            <p className="no-books-message">ยังไม่มีหนังสือ</p>
          ) : (
            <div className="books-grid">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="book-card"
                  onClick={() => navigate(`/book/${book.id}`)}
                >
                  {book.coverImage && (
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="book-cover"
                    />
                  )}
                  <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">โดย: {book.author}</p>
                    <p className="book-description">{book.description}</p>
                    <div className="book-footer">
                      <p className="book-quantity">
                        จำนวนในระบบ: {book.availableQuantity || 0} เล่ม
                      </p>
                      {book.availableQuantity > 0 && !book.isBorrowed && (
                        <button
                          onClick={(e) => handleBorrow(e, book.id)}
                          className="card-borrow-button"
                        >
                          ยืม
                        </button>
                      )}
                      {book.isBorrowed && (
                        <button
                          onClick={(e) => handleReturn(e, book.borrowId)}
                          className="card-return-button"
                        >
                          คืน
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
