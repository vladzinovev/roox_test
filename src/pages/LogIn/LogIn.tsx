import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useAppDispatch } from "../../hook/useTypedSelector";
import { getAllPosts } from "../../store/users";

import styles from "./LogIn.module.scss";

const LogIn = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <section className={styles.login}>
      <p className={styles.bd}>БД пользователей</p>

      <button className={styles.btn}>
        <NavLink className={styles.link} to={"/users"}>
          Вход в систему
        </NavLink>
      </button>
    </section>
  );
};
export default LogIn;
