export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  published: string;
  totalQuantity: number;
  availableQuantity: number;
  coverImage: string;
  isBorrowed: boolean;
  borrowId?: number;
  createdAt: string;
  updatedAt: string;
}
