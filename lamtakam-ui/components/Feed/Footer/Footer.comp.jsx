import { Col, Container, Row } from "react-bootstrap";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <>
      <Container fluid className={styles.footerContainer}>
       <p>تمامی مقاله ها با ذکر منبع قابل استفاده هستند</p>
      </Container>
    </>
  );
}

export default Footer;