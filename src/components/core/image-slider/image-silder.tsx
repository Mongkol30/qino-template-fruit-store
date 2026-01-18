import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

type ImageSliderProps = {
  images: string[];
  height?: string;
};

const ImageSlider: FC<ImageSliderProps> = ({
  images,
  height = 'h-[320px]',
}) => {
  return (
    <div className={`w-full overflow-hidden rounded-2xl ${height}`}>
      <Swiper
        modules={[Autoplay, Pagination]}
        className="h-full w-full"
        loop
        speed={600}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          swiper.autoplay.start();
        }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="h-full w-full">
            <img
              src={src}
              alt={`slide-${index}`}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
