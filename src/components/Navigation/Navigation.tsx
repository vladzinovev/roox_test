import { useAppDispatch, useTypedSelector } from "../../hook/useTypedSelector";
import { setArrowCity, setArrowCompany, setSort } from "../../store/sort";
import styles from "./Navigation.module.scss";
import up from "../../image/up.png";
import down from "../../image/down.png";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const { arrowCity, arrowCompany } = useTypedSelector((store) => store.sort);

  function handleClick(name: string) {
    dispatch(setSort(name));
    name === "city"
      ? dispatch(setArrowCity(!arrowCity))
      : dispatch(setArrowCompany(!arrowCompany));
  }

  return (
    <div className={styles.navigation}>
      <p className={styles.sort}>Сортировка</p>
      <button className={styles.btn_sort} onClick={() => handleClick("city")}>
        по городу{" "}
        {arrowCity ? <img alt="up" src={up} /> : <img alt="up" src={down} />}
      </button>
      <button
        className={styles.btn_sort}
        onClick={() => handleClick("company")}
      >
        по компании{" "}
        {arrowCompany ? <img alt="up" src={up} /> : <img alt="up" src={down} />}
      </button>
    </div>
  );
};
export default Navigation;
