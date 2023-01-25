import { useEffect, useState } from "react";
import { useAppDispatch, useTypedSelector } from "../../hook/useTypedSelector";
import { getAllPosts } from "../../store/users";
import User from "./User/User";
import styles from "./Users.module.scss";
const Users = () => {
  const [usersCount, setUsersCount] = useState<number>(0);
  const { post } = useTypedSelector((store) => store.users);
  const { sort } = useTypedSelector((store) => store.sort);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    
    setUsersCount(post.length);
  }, [post]);
  return (
    <div className={styles.users}>
      <p className={styles.name}>Список пользователей</p>
      {post.map((pos) => (
        <User item={pos} />
      ))}
      <p className={styles.search}>Найдено {usersCount} пользователей</p>
    </div>
  );
};
export default Users;
