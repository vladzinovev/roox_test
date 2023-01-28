
import { NavLink } from "react-router-dom";
import { AllItems } from "../../../types/types";
import styles from "./User.module.scss";
const User = ({ item }: AllItems) => {
  return (
    <div className={styles.user}>
      <div className={styles.flex}>
        <p className={styles.base_text}>ФИО:</p>
        <p className={styles.write_text}>{item.name}</p>
      </div>
      <div className={styles.flex}>
        <p className={styles.base_text}>город:</p>
        <p className={styles.write_text}>{item.address.city}</p>
      </div>
      <div className={styles.flex}>
        <p className={styles.base_text}>компания:</p>
        <p className={styles.write_text}>{item.company.name}</p>
      </div>
      <NavLink className={styles.link} to={`/user/${item.id}`}>
        Подробнее
      </NavLink>
    </div>
  );
};
export default User;
