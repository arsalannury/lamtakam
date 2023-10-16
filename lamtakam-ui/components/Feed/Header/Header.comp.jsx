import Image from "next/image";
import { Container } from "react-bootstrap";
import styles from "./header.module.scss";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data, status } = useSession();
  return (
    <>
      <Container fluid className={styles.headerContainer}>
        <div className={styles.headerLogoSection}>
          <Image
            quality="high"
            src="/mainlogo.svg"
            alt="logo"
            width={150}
            height={140}
          />
          <span>لام تا کام</span>
        </div>
        <ul className={styles.navbar}>
          <Link className={styles.navbarLink} href={"/"}>
            <li>صفحه اصلی</li>
          </Link>
          <Link className={styles.navbarLink} href={"/aboutus"}>
            <li>درباره ما</li>
          </Link>
          {/* <Link className={styles.navbarLink} href={"/aboutus"}> */}
          <li
            style={{ cursor: "pointer" }}
            onClick={
              status === "loading" || status === "unauthenticated"
                ? signIn
                : signOut
            }
          >
            {data ? "خروج از حساب" : "ورود"}
          </li>
          {/* </Link> */}
        </ul>
      </Container>
    </>
  );
};

export default Header;
