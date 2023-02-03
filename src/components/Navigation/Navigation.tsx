import { useAppDispatch } from "../../hook/useTypedSelector";
import { setSort } from "../../store/sort";
import styles from "./Navigation.module.scss";

const Navigation = () => {
  const dispatch = useAppDispatch();

  function handleClick(name: string) {
    dispatch(setSort(name));
  }

  return (
    <div className={styles.navigation}>
      <p className={styles.sort}>Сортировка</p>
      <button className={styles.btn_sort} onClick={() => handleClick("city")}>
        по городу
      </button>
      <button className={styles.btn_sort} onClick={() => handleClick("company")}>
        по компании
      </button>
    </div>
  );
};
export default Navigation;
