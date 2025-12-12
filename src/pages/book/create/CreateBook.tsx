import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../../api/axios";
import "./CreateBook.css";

function CreateBook() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [published, setPublished] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", coverImage!);

      const image = await axiosInstance.post("/book/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await axiosInstance.post("/book", {
        title,
        author,
        isbn,
        published,
        totalQuantity: parseInt(totalQuantity),
        coverImage: image.data.filename,
      });
      toast.success("สร้างหนังสือสำเร็จ!");
      setTimeout(() => navigate("/home"), 1000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "ไม่สามารถสร้างหนังสือได้";
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="create-book-container">
      <div className="create-book-card">
        <h1>สร้างหนังสือใหม่</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-left">
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
                <label htmlFor="isbn">ISBN</label>
                <input
                  type="text"
                  id="isbn"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  placeholder="กรอก ISBN"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="published">ปีที่พิมพ์</label>
                <input
                  type="number"
                  id="published"
                  value={published}
                  onChange={(e) => setPublished(e.target.value)}
                  placeholder="กรอกปีที่พิมพ์"
                  min="1"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="totalQuantity">จำนวนเล่ม</label>
                <input
                  type="number"
                  id="totalQuantity"
                  value={totalQuantity}
                  onChange={(e) => setTotalQuantity(e.target.value)}
                  placeholder="กรอกจำนวนเล่ม"
                  min="1"
                  max="99"
                  required
                />
              </div>
            </div>
            <div className="form-right">
              <div className="form-group">
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                  </div>
                )}
                <input
                  type="file"
                  id="coverImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                />
                <label htmlFor="coverImage" className="upload-button">
                  อัพโหลดหน้าปกหนังสือ
                </label>
              </div>
            </div>
          </div>
          <div className="button-group">
            <button type="submit" className="submit-button">
              สร้างหนังสือ
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBook;
