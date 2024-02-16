
import CoposReviews from '@/components/copos/copos-review';
import styles from './wrapper-review-image.module.css'; // Certifique-se de criar o arquivo de módulo CSS
import { AddImageButton } from '@/components/buttons/add-image-review-button';

const WrapperReviewImage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <CoposReviews nota={2} />
      <AddImageButton />
    </div>
  );
};

export default WrapperReviewImage;