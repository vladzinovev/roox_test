import { NavLink } from "react-router-dom";
import styles from "./Page404.module.scss";

const Page404 = () => (
  <section className={styles.page404}>
    <p className={styles.error}>404</p>
    <p className={styles.not_found}>страница не найдена</p>

    <p className={styles.description}>
      страница, на которую вы пытаетесь попасть, не существует или была удалена.
    </p>
    <button className={styles.btn}>
      <NavLink className={styles.link} to={"/"}>
        Вернуться на главную страницу
      </NavLink>
    </button>
  </section>
);
export default Page404;
