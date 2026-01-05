import HeroSection from './HeroSection';
import ImageSection from './ImageSection';
import styles from './Content.module.css';

export default function Content() {
  return (
    <div className={styles.content}>
      <HeroSection />
      <ImageSection />
    </div>
  );
}
