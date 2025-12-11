import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../../../api/axios';
import './CreateBook.css';

function CreateBook() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/books', {
        title,
        author,
        description,
        coverImage,
      });

      toast.success('สร้างหนังสือสำเร็จ!');
      setTimeout(() => navigate('/'), 1000);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'ไม่สามารถสร้างหนังสือได้';
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="create-book-container">
      <div className="create-book-card">
        <h1>สร้างหนังสือใหม่</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">ชื่อหนังสือ</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="กรอกชื่อหนังสือ"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">ผู้แต่ง</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="กรอกชื่อผู้แต่ง"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">คำอธิบาย</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="กรอกคำอธิบายหนังสือ"
              rows={4}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="coverImage">URL รูปปก</label>
            <input
              type="url"
              id="coverImage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="กรอก URL รูปปกหนังสือ"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="submit-button">
              สร้างหนังสือ
            </button>
            <button type="button" onClick={handleCancel} className="cancel-button">
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBook;
