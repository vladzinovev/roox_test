import { useAppDispatch } from "../../hook/useTypedSelector";
import { setSort } from "../../store/sort";
import styles from "./Navigation.module.scss";

const Navigation = () => {
  const dispatch = useAppDispatch();

  function handleClick(e:React.ChangeEvent<HTMLButtonElement>) {
    if (e.target.innerHTML === "по городу") {
      dispatch(setSort("city"));
    } else if (e.target.innerHTML === "по компании") {
      dispatch(setSort("company"));
    }
  }
  return (
    <div className={styles.navigation}>
      <p className={styles.sort}>Сортировка</p>
      <button className={styles.btn_sort} onClick={(e:any)=>handleClick(e)}>
        по городу
      </button>
      <button className={styles.btn_sort} onClick={(e:any)=>handleClick(e)}>
        по компании
      </button>
    </div>
  );
};
export default Navigation;
