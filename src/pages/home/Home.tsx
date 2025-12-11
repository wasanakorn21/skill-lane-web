import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axios';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/book');
      setBooks(response.data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'ไม่สามารถดึงข้อมูลหนังสือได้';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userId');
    navigate('/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', search);
    // TODO: Implement search functionality
  };

  const handleCreateBook = () => {
    navigate('/create-book');
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
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              className="search-input"
              placeholder="ค้นหาหนังสือ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="search-button">
              ค้นหา
            </button>
          </form>
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
                <div key={book.id} className="book-card">
                  {book.coverImage && (
                    <img src={book.coverImage} alt={book.title} className="book-cover" />
                  )}
                  <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">โดย: {book.author}</p>
                    <p className="book-description">{book.description}</p>
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
