import type { FC } from 'react';
import { useMemo, useState } from 'react';

import ImageSlider from '@components/core/image-slider/image-silder';
import { Pagination } from '@components/core/pagination';

import listProduct, { type Product } from '@/mockItem/listProduct';
import { Link } from 'react-router-dom';

type Category = {
  id: string;
  title: string;
  image: string;
};

const StarIcon = ({
  variant,
}: {
  variant: 'full' | 'half' | 'empty';
}) => {
  // SVG star: ใช้ currentColor คุมสีด้วย className
  if (variant === 'half') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        {/* เทาเป็นฐาน */}
        <path
          fill="currentColor"
          opacity="0.25"
          d="M12 17.3l-6.18 3.73 1.64-7.03L2 9.24l7.19-.62L12 2l2.81 6.62 7.19.62-5.46 4.76 1.64 7.03z"
        />
        {/* ครึ่งซ้าย */}
        <defs>
          <clipPath id="half">
            <rect x="0" y="0" width="12" height="24" />
          </clipPath>
        </defs>
        <path
          clipPath="url(#half)"
          fill="currentColor"
          d="M12 17.3l-6.18 3.73 1.64-7.03L2 9.24l7.19-.62L12 2l2.81 6.62 7.19.62-5.46 4.76 1.64 7.03z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        opacity={variant === 'empty' ? 0.25 : 1}
        d="M12 17.3l-6.18 3.73 1.64-7.03L2 9.24l7.19-.62L12 2l2.81 6.62 7.19.62-5.46 4.76 1.64 7.03z"
      />
    </svg>
  );
};

const StarRating: FC<{ rating: number }> = ({ rating }) => {
  const stars = Array.from({ length: 5 }).map((_, i) => {
    const idx = i + 1;
    if (rating >= idx) return 'full' as const;
    if (rating >= idx - 0.5) return 'half' as const;
    return 'empty' as const;
  });

  return (
    <div className="flex items-center gap-0.5 text-orange-500">
      {stars.map((v, i) => (
        <StarIcon key={i} variant={v} />
      ))}
    </div>
  );
};

const HomeContent: FC = () => {
  const bannerImages = ['/banner.png', '/banner2.png', '/banner3.png'];

  // หมวดหมู่ (ทำในไฟล์เดียวให้ก่อน)
  const fruitCategories: Category[] = [
    { id: 'popular', title: 'ผลไม้ยอดนิยม', image: '/category/popular.jpg' },
    { id: 'seasonal', title: 'ผลไม้ตามฤดูกาลในประเทศ', image: '/category/seasonal.jpg' },
    { id: 'imported', title: 'ผลไม้นำเข้าจากต่างประเทศ', image: '/category/imported.jpg' },
    { id: 'rare', title: 'ผลไม้พื้นถิ่นหายาก', image: '/category/rare.jpg' },
    { id: 'processed', title: 'ผลไม้แปรรูป', image: '/category/processed.jpg' },
    { id: 'byproduct', title: 'เศษผลไม้เพื่อนำไปแปรรูป', image: '/category/byproduct.jpg' },
  ];

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectCategory = (categoryId: string | null) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  const filteredItems = useMemo(() => {
    if (!activeCategory) return listProduct;
    return listProduct.filter((p) => p.categoryId === activeCategory);
  }, [activeCategory]);

  /* ================= PAGINATION LOGIC ================= */
  const ITEMS_PER_PAGE = 32;
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      {/* Slider */}
      <ImageSlider images={bannerImages} height="h-[300px]" />

      {/* ===== Top info 3 items ===== */}
      <div className="mt-8">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-3">
            <div className="flex items-start gap-4 justify-center md:justify-start">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 text-xl bg-white dark:bg-neutral-800">
                📦
              </div>
              <div className="leading-tight">
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">ผลไม้</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">จัดส่งภายใน 24 ชั่วโมง</p>
              </div>
            </div>

            <div className="flex items-start gap-4 justify-center md:justify-start">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 text-xl bg-white dark:bg-neutral-800">
                🏆
              </div>
              <div className="leading-tight">
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">คืนสินค้าได้ภายใน 24 ชั่วโมง</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">รับประกันคืนเงิน 100%</p>
              </div>
            </div>

            <div className="flex items-start gap-4 justify-center md:justify-start">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 text-xl bg-white dark:bg-neutral-800">
                🎧
              </div>
              <div className="leading-tight">
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">บริการให้ความช่วยเหลือตลอด 24 ชั่วโมง</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">ติดต่อ FRUIT FOR YOU</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CATEGORY GRID ================= */}
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">หมวดหมู่จากผลไม้ยอดนิยม</p>
          <button
            className="text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
            onClick={() => handleSelectCategory(null)}
          >
            ดูทั้งหมด
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {fruitCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={[
                  'rounded-xl border p-3 bg-white dark:bg-neutral-900',
                  'border-neutral-200 dark:border-neutral-700',
                  'hover:shadow-md transition text-left',
                  isActive ? 'ring-2 ring-neutral-900 dark:ring-neutral-100' : '',
                ].join(' ')}
              >
                <img src={cat.image} alt={cat.title} className="h-20 w-full rounded-lg object-cover" />
                <p className="mt-2 text-sm text-neutral-800 dark:text-neutral-200 line-clamp-2">
                  {cat.title}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= PRODUCT LIST ================= */}
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            {activeCategory
              ? `กำลังแสดงหมวด: ${fruitCategories.find((c) => c.id === activeCategory)?.title ?? activeCategory}`
              : 'กำลังแสดง: ทั้งหมด'}
          </p>

          {activeCategory && (
            <button
              className="text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
              onClick={() => handleSelectCategory(null)}
            >
              ล้างตัวกรอง
            </button>
          )}
        </div>

        {currentItems.length === 0 ? (
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-10 text-center">
            <p className="text-neutral-700 dark:text-neutral-200">หมวดนี้ยังไม่มีสินค้า กรุณกากด “ดูทั้งหมด” หรือเลือกหมวดหมู่อื่น</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {currentItems.map((item: Product) => (
              <div
                key={item.id}
                className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition overflow-hidden"
              >
                <Link
                  key={item.id}
                  to={`/details/${item.id}`}
                  className="block bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative">
                    {!!item.badge && (
                      <span
                        className={[
                          'absolute left-2 top-2 z-10 rounded-md px-3 py-1 text-xs font-semibold',
                          item.badgeBg ?? 'bg-yellow-300 text-black',
                        ].join(' ')}
                      >
                        {item.badge}
                      </span>
                    )}

                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="h-52 w-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* ⭐ Rating */}
                    <div className="flex items-center gap-2">
                      <StarRating rating={item.rating} />
                      <span className="text-sm text-neutral-500">
                        ({item.reviews})
                      </span>
                    </div>

                    {/* Name */}
                    <p className="mt-2 text-sm text-neutral-800 dark:text-neutral-200 line-clamp-2">
                      {item.name}
                    </p>

                    {/* Price */}
                    <div className="mt-2 flex items-center gap-2">
                      {item.originalPrice && (
                        <span className="text-sm text-neutral-400 line-through">
                          ${item.originalPrice}
                        </span>
                      )}
                      <span className="text-blue-500 font-semibold">
                        ${item.price}
                      </span>
                    </div>
                  </div>
                </Link>

              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              siblingCount={1}
              showFirstLast
            />
          </div>
        )}
      </div>
    </>
  );
};

export default HomeContent;
