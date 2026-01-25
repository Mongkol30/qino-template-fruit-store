export type ProductReview = {
  id: number;
  productId: number;
  username: string;
  avatar: string;
  rating: number; // คะแนนรวม
  qualityText?: string; // รีวิวคุณภาพ (ข้อความ)
  tasteText?: string;   // รีวิวรสชาติ (ข้อความ)
  createdAt: string;   // เช่น '2025-06-05 14:36'
  variantText?: string; // เช่น 'ชิ้นเล็ก/หนัก: 100 กก.'
  body: string;
  image?: string;      // รูปรีวิวด้านขวา
};

const productReviews: ProductReview[] = [
  {
    id: 1,
    productId: 2,
    username: 'the_monster_opal',
    avatar: '/reviewer/user1.png',
    rating: 5,
    qualityText: 'คุณภาพดีมาก',
    tasteText: 'หอมหวาน',
    createdAt: '2025-06-05 14:36',
    variantText: 'ชิ้นเล็ก/หนัก: 100 กก.',
    body:
      'คุณภาพดีมากๆ หอมหวาน เนื้อแน่น ส่งไว แพ็กมาดี ไม่ช้ำเลยครับ ซื้อซ้ำแน่นอน',
    image: '/reviewer/r1.png',
  },
  {
    id: 2,
    productId: 2,
    username: 'karnnary_reviewnew',
    avatar: '/reviewer/user1.png',
    rating: 5,
    qualityText: 'เนื้อแน่น คุณภาพดี ไม่ช้ำ',
    tasteText: 'หวานมัน หอม กำลังดี',
    createdAt: '2025-06-05 14:36',
    variantText: 'ชิ้นเล็ก/หนัก: 100 กก.',
    body:
      'ส่งเร็วมากครับ กลิ่นดี เนื้อสวย แนะนำเลย ราคาดีเมื่อเทียบกับคุณภาพ',
    image: '/reviewer/r2.png',
  },
  {
    id: 3,
    productId: 2,
    username: 'pornnapakumnuck',
    avatar: '/reviewer/user2.png',
    rating: 5,
    qualityText: '',
    tasteText: '',
    createdAt: '2025-06-06 14:36',
    variantText: 'ชิ้นเล็ก/หนัก: 100 กก.',
    body:
      'แพ็กมาดีมาก ไม่ช้ำ รสชาติดี หอมหวาน กินแล้วติดใจเลย',
    image: '/reviewer/r3.png',
  },
];

export default productReviews;
