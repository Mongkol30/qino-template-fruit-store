import type { FC } from 'react';
import { useState } from 'react';
import ImageSlider from '@components/core/image-slider/image-silder';
import { Pagination } from '@components/core/pagination';
import listProduct from '@/mockItem/listProduct';

const HomeContent: FC = () => {
  const bannerImages = [
    '/banner.png',
    '/banner2.png',
    '/banner3.png',
  ];

  

  /* ================= PAGINATION LOGIC ================= */
  const ITEMS_PER_PAGE = 32;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(listProduct.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = listProduct.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <>
      {/* Slider */}
      <ImageSlider images={bannerImages} height="h-[300px]" />

      
      <div className="mt-8 ">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-3">
            
            {/* ITEM 1 */}
            <div className="flex items-start gap-4 justify-center md:justify-start">
              <div className="
                mt-1 flex h-10 w-10 items-center justify-center rounded-full border
                border-neutral-300 dark:border-neutral-700
                text-xl
                bg-white dark:bg-neutral-800
              ">
                📦
              </div>
              <div className="leading-tight">
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                  ผลไม้
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  จัดส่งภายใน 24 ชั่วโมง
                </p>
              </div>
            </div>

            {/* ITEM 2 */}
            <div className="flex items-start gap-4 justify-center md:justify-start">
              <div className="
                mt-1 flex h-10 w-10 items-center justify-center rounded-full border
                border-neutral-300 dark:border-neutral-700
                text-xl
                bg-white dark:bg-neutral-800
              ">
                🏆
              </div>
              <div className="leading-tight">
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                  คืนสินค้าได้ภายใน 24 ชั่วโมง
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  รับประกันคืนเงิน 100%
                </p>
              </div>
            </div>

            {/* ITEM 3 */}
            <div className="flex items-start gap-4 justify-center md:justify-start">
              <div className="
                mt-1 flex h-10 w-10 items-center justify-center rounded-full border
                border-neutral-300 dark:border-neutral-700
                text-xl
                bg-white dark:bg-neutral-800
              ">
                🎧
              </div>
              <div className="leading-tight">
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                  บริการให้ความช่วยเหลือตลอด 24 ชั่วโมง
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  ติดต่อ FRUIT FOR YOU
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>



      {/* ================= PRODUCT LIST ================= */}
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-neutral-200 hover:shadow-md transition"
            >
              <div className="relative">
                <span
                  className={`absolute left-2 top-2 rounded px-2 py-0.5 text-xs font-semibold text-white ${item.badgeColor}`}
                >
                  {item.badge}
                </span>

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-44 w-full object-cover rounded-t-lg"
                />
              </div>

              <div className="p-4">
                <p className="text-sm text-neutral-700 line-clamp-2">
                  {item.name}
                </p>
                <p className="mt-2 font-semibold text-blue-500">
                  ${item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="mt-10 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            siblingCount={1}
            showFirstLast
          />
        </div>
      </div>
    </>
  );
};

export default HomeContent;
