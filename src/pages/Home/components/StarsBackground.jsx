import { useState } from 'react';
import { generateStars } from '../../../utils/generateStars';
import { CAROUSEL_SETTINGS } from '../../../utils/constants';
import styles from '../Home.module.scss';

const StarsBackground = () => {
  const [stars] = useState(() => generateStars(CAROUSEL_SETTINGS.TOTAL_STARS));

  return (
    <div className={styles.starsBackground}>
      {stars.map((star) => (
        <div
          key={star.id}
          className={styles.star}
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`
          }}
        />
      ))}
    </div>
  );
};

export default StarsBackground;
