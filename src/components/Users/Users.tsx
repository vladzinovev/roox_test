import { useEffect, useState } from "react";
import { useTypedSelector } from "../../hook/useTypedSelector";

import { IPost } from "../../types/types";
import User from "./User/User";
import styles from "./Users.module.scss";
const Users = () => {
  const [usersCount, setUsersCount] = useState<number>(0);
  const { post } = useTypedSelector((store) => store.users);
  const { sort } = useTypedSelector((store) => store.sort);
  const [sortedUsers, setSortedUsers] = useState<Array<IPost>>([]);
  

  const sortByType = (sortType: string, usersForSort: Array<IPost>): any => {
    if (sortType === "city") {
      setSortedUsers(usersForSort.sort(sortByCity));
    } else if (sortType === "company") {
      setSortedUsers(usersForSort.sort(sortByCompanyName));
    } else if (sortType === "alphabet") {
      setSortedUsers(usersForSort.sort(sortByUserName));
    }
  };

  const sortByCity = (a: IPost, b: IPost): number => {
    if (a.address.city > b.address.city) return 1;
    if (a.address.city < b.address.city) return -1;
    return 0;
  };

  const sortByCompanyName = (a: IPost, b: IPost): number => {
    if (a.company.name > b.company.name) return 1;
    if (a.company.name < b.company.name) return -1;
    return 0;
  };

  const sortByUserName = (a: IPost, b: IPost): number => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  };



  useEffect(() => {
    let usersForSort = [...post];
    usersForSort.sort(sortByType(sort, usersForSort));
    setUsersCount(post.length);
  }, [post, sort]);

  

  return (
    <div className={styles.users}>
      <p className={styles.name}>Список пользователей</p>
      {sortedUsers.map((pos) => (
        <User item={pos} />
      ))}
      <p className={styles.search}>Найдено {usersCount} пользователей</p>
    </div>
  );
};
export default Users;
