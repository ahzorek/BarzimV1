
import styles from './review-title.module.css'; 

interface ReviewTitleProps {
  beerName: string;
}

const ReviewTitle: React.FC<ReviewTitleProps> = ({ beerName }) => {
  return (
    <div>
      <h2 className={styles.reviewLabel}>Você está avaliando <span className={styles.beerName}>{beerName}</span></h2>
    </div>
  );
};

export default ReviewTitle;