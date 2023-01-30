import { Skeleton, Stack } from "@mui/material";
import { useEffect, useState } from "react";

import { useTypedSelector } from "../../hook/useTypedSelector";
import { IPost } from "../../types/types";
import Error from "../Error/Error";
import User from "./User/User";
import styles from "./Users.module.scss";

const Users = () => {
  const [usersCount, setUsersCount] = useState<number>(0);
  const { post, status, error } = useTypedSelector((store) => store.users);
  const { sort } = useTypedSelector((store) => store.sort);
  const [sortedUsers, setSortedUsers] = useState<Array<IPost>>([]);
  const [searchValue, setSearchValue] = useState<string>("");

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
    /* setSortedUsers(usersForSort.sort((a: IPost, b: IPost): number => {
      if (a.address.city > b.address.city) return 1;
      if (a.address.city < b.address.city) return -1;
      return 0;
    })); */
    setSortedUsers(
      usersForSort.filter((item) => {
        console.log(searchValue);
        if (searchValue === "") {
          return sortedUsers;
        } else {
          console.log("true");
          console.log(sortedUsers);
          return item.name.toLowerCase().includes(searchValue.toLowerCase());
        }
      })
    );
  }, [searchValue]);

  useEffect(() => {
    if (searchValue) {
      let usersForSort = [...sortedUsers];
      usersForSort.sort(sortByType(sort, usersForSort));
    } else {
      let usersForSort = [...post];
      usersForSort.sort(sortByType(sort, usersForSort));
    }
  }, [post, sort]);

  useEffect(() => {
    setUsersCount(sortedUsers.length);
  }, [sortedUsers]);

  return (
    <div className={styles.users}>
      <div className={styles.search}>
        <p className={styles.search_user}>Поиск по имени</p>
        <input
          className={styles.input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
          type="text"
          name="search"
          id="search"
        />
      </div>
      {status === "error" ? (
        <Error errorMessage={error} />
      ) : status === "loading" ? (
        <>
          <Stack spacing={1}>
            <Skeleton
              className={styles.load_name}
              variant="text"
              sx={{ fontSize: "1rem" }}
            />
            {[...Array(10)].map(() => (
              <div className={styles.loading}>
                <Skeleton variant="rounded" width={420} height={72} />
              </div>
            ))}
            <Skeleton
              className={styles.load_count}
              variant="text"
              sx={{ fontSize: "1rem" }}
            />
          </Stack>{" "}
        </>
      ) : (
        <>
          <p className={styles.name}>Список пользователей</p>
          {sortedUsers.map((pos) => (
            <User item={pos} />
          ))}
          <p className={styles.count}>Найдено {usersCount} пользователей</p>
        </>
      )}
    </div>
  );
};
export default Users;
