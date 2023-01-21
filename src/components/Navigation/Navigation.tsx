import styles from "./Navigation.module.scss";
const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <p className={styles.sort}>Сортировка</p>
      <button className={styles.btn_sort}>по городу</button>
      <button className={styles.btn_sort}>по компании</button>
    </div>
  );
};
export default Navigation;
