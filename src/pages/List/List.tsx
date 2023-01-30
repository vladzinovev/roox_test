import Navigation from "../../components/Navigation/Navigation";
import Users from "../../components/Users/Users";
import styles from "./List.module.scss";

const List = () => {
  return (
    <div className={styles.list}>
      <Navigation />
      <Users />
    </div>
  );
};
export default List;
