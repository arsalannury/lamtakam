import Image from "next/image";
import Link from "next/link";
import { bubble as Menu } from "react-burger-menu";
import styles from "./header.module.scss";

const HeaderMobile = () => {
  return (
    <>
      <Menu
        id="bubble"
        outerContainerId="outer-container"
        pageWrapId="page-wrap"
        right
      >
        <ul className={styles.navbarMobile}>
          <Image
            quality="high"
            src="/mainlogo.svg"
            alt="logo"
            width={170}
            height={170}
            className={styles.logoImageMobile}
          />
          <h1 className={styles.navbarMobileTitle}>لام تا کام</h1>
          <Link className={styles.navbarLinkMobile} href={"/"}>
            <li>صفحه اصلی</li>
          </Link>
          <Link className={styles.navbarLinkMobile} href={"/aboutus"}>
            <li>درباره ما</li>
          </Link>
        </ul>
      </Menu>
    </>
  );
};

export default HeaderMobile;
