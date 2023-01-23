
import { useEffect } from "react";
import { useAppDispatch, useTypedSelector } from "../../hook/useTypedSelector";
import { getAllPosts } from "../../store/users";
import User from "../User/User";
import styles from "./Users.module.scss";
const Users = () => {
    const {post}=useTypedSelector(store=>store.users);
    console.log(post);
    const dispatch=useAppDispatch();

    useEffect(() => {
        dispatch(getAllPosts());
      }, []);
  return (
    <div className={styles.users}>
      <p className={styles.name}>Список пользователей</p>
      <User />
      <User />
      <User />
      <User />
      <User />
        {post.map((pos)=>(
            <div>{pos}</div>
        ))}
      <p className={styles.search}>Найдено 10 пользователей</p>
    </div>
  );
};
export default Users;
