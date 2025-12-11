import { useState, useEffect, use } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../../api/axios";
import "./BookDetail.css";

function BookDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBookDetail();
    }
  }, [id]);

  const fetchBookDetail = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/book/${id}`);
      setBook(response.data);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "ไม่สามารถดึงข้อมูลหนังสือได้";
      toast.error(errorMessage);
      navigate("/home");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/home");
  };

  const handleEdit = () => {
    navigate(`/edit-book/${id}`);
  };

  const handleBorrow = async () => {
    try {
      await axiosInstance.post("/book/borrow", {
        bookId: Number(id),
        userId: Number(sessionStorage.getItem("userId")),
        quantity: 1,
      });
      toast.success("ยืมหนังสือสำเร็จ");
      fetchBookDetail();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "ไม่สามารถยืมหนังสือได้";
      toast.error(errorMessage);
    }
  };

  const handleReturn = async () => {
    try {
      await axiosInstance.post(`/book/${book.borrowId}/return`);
      toast.success("คืนหนังสือสำเร็จ");
      fetchBookDetail();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "ไม่สามารถคืนหนังสือได้";
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="book-detail-container">
        <div className="loading-message">กำลังโหลด...</div>
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <div className="book-detail-container">
      <div className="book-detail-card">
        <button onClick={handleBack} className="back-button">
          ← กลับ
        </button>

        <div className="book-detail-content">
          {book.coverImage && (
            <div className="book-detail-cover-container">
              <img
                src={book.coverImage}
                alt={book.title}
                className="book-detail-cover"
              />
            </div>
          )}

          <div className="book-detail-info">
            <h1 className="book-detail-title">{book.title}</h1>
            <p className="book-detail-author">โดย: {book.author}</p>

            <div className="book-info-row">
              <span className="info-label">ISBN:</span>
              <span className="info-value">{book.isbn}</span>
              <span className="info-label">ปีที่พิมพ์:</span>
              <span className="info-value">{book.published}</span>
            </div>

            <div className="book-detail-quantity">
              <p>
                จำนวนในระบบ: <strong>{book.availableQuantity || 0}</strong> เล่ม
              </p>
            </div>

            <div className="book-detail-actions">
              {book.availableQuantity > 0 && !book.isBorrowed && (
                <button onClick={handleBorrow} className="borrow-button">
                  ยืม
                </button>
              )}
              {book.isBorrowed && (
                <button onClick={handleReturn} className="return-button">
                  คืน
                </button>
              )}
              <button onClick={handleEdit} className="edit-button">
                แก้ไข
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
