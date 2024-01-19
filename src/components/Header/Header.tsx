import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 style={{ fontSize: 34 }}>Bookstore</h1>
    </header>
  );
};

export default Header;
