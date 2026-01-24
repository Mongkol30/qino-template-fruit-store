export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string[];
  rating: number;
  reviews: number;
  badge?: string;
  badgeBg?: string;
  categoryId?: string;
  shopId: number;
};


const listProduct: Product[] = [
  {
    id: 1,
    name: 'ลิ้นจี่สด เกรดพรีเมียม',
    originalPrice: 1600,
    price: 1200,
    image: ['/product/lychee.jpg','/product/lychee2.jpg','/product/lychee3.jpg'],
    rating: 4.5,
    reviews: 877,
    badge: '25% OFF',
    badgeBg: 'bg-yellow-300 text-black',
    categoryId: 'popular',
    shopId: 2,
  },
  {
    id: 2,
    name: 'ทุเรียนหมอนทอง คัดสวน',
    originalPrice: 1900,
    price: 1490,
    image: ['/product/durian.jpg'],
    rating: 5,
    reviews: 738,
    badge: 'BEST DEALS',
    badgeBg: 'bg-blue-500 text-white',
    categoryId: 'seasonal',
    shopId: 2,
  },
  {
    id: 3,
    name: 'เงาะโรงเรียน สดใหม่',
    originalPrice: 399,
    price: 299,
    image: ['/product/rambutan.jpg'],
    rating: 4,
    reviews: 312,
    badge: 'HOT',
    badgeBg: 'bg-red-500 text-white',
    categoryId: 'seasonal',
    shopId: 1,
  },
  {
    id: 4,
    name: 'มังคุดคัดเกรด',
    price: 25,
    image: ['/product/mangosteen.jpg','/product/mangosteen2.jpg','/product/mangosteen3.jpg'],
    rating: 4.5,
    reviews: 120,
    categoryId: 'popular',
    shopId: 3,
  },

  {
    id: 5,
    name: 'แตงโมสด (คัดเกรด) แตงโมหวานฉ่ำ',
    originalPrice: 1600,
    price: 1200,
    image: ['/product/watermelon.jpg'],
    rating: 4.0,
    reviews: 877,
    badge: '25% OFF',
    badgeBg: 'bg-yellow-300 text-black',
    categoryId: 'popular',
    shopId: 4,
  },
  {
    id: 6,
    name: 'มะม่วงสีทอง พันธุ์ใหญ่',
    originalPrice: 1600,
    price: 1200,
    image: ['/product/mango.jpg'],
    rating: 4.0,
    reviews: 877,
    badge: '25% OFF',
    badgeBg: 'bg-yellow-300 text-black',
    categoryId: 'popular',
    shopId: 5,
  },
];

export default listProduct;
