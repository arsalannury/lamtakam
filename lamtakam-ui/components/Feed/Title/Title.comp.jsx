import Image from "next/image";
import styles from "./title.module.scss";

const Title = () => {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.wrapperContent}>
        <Image
          src="/circle.svg"
          className={styles.circleLogo}
          alt="circle"
          width={150}
          height={150}
        />
        <Image
          className={styles.quoteImage}
          src="/quote.png"
          alt="quote"
          width={30}
          height={30}
        />
        <p className={styles.hello}>سلام</p>
        <h1>میگن نوشتن بر هر دردی دواست</h1>
        <p>از همه چی اینجا میگیم </p>
      </div>
    </div>
  );
};

export default Title;
