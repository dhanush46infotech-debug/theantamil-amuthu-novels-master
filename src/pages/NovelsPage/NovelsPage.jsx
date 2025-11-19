import Header from '../../components/layout/Header/Header';
import Carousel from '../../components/common/Carousel/Carousel';
import styles from './NovelsPage.module.scss';

const NovelsPage = () => {
  return (
    <div className={styles.novelsContainer}>
      <Header />
      <Carousel />
    </div>
  );
};

export default NovelsPage;
