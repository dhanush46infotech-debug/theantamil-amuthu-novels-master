import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from '../styles/slider.module.scss';
import StarEffect from './StarEffect';

const Slider3 = () => {
  return (
    <div className={`${styles.sliderContainer} ${styles.slider3}`}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        speed={800}
      >
        <SwiperSlide>
          <div className={styles.emptySlide}>
            <StarEffect />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider3;
