export type Category = {
  id: string;
  title: string;
  image: string;
};

const categories: Category[] = [
  { id: 'popular', title: 'ผลไม้ยอดนิยม', image: '/category/popular.jpg' },
  { id: 'seasonal', title: 'ผลไม้ตามฤดูกาลในประเทศ', image: '/category/seasonal.jpg' },
  { id: 'imported', title: 'ผลไม้นำเข้าจากต่างประเทศ', image: '/category/imported.jpg' },
  { id: 'rare', title: 'ผลไม้พื้นถิ่นหายาก', image: '/category/rare.jpg' },
  { id: 'processed', title: 'ผลไม้แปรรูป', image: '/category/processed.jpg' },
  { id: 'byproduct', title: 'เศษผลไม้เพื่อนำไปแปรรูป', image: '/category/byproduct.jpg' },
];

export default categories;

// lookup map
export const categoryById: Record<string, Category> = Object.fromEntries(
  categories.map((c) => [c.id, c])
);
