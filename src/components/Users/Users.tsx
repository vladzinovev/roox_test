import { Skeleton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Observable } from "redux";

import { useTypedSelector } from "../../hook/useTypedSelector";
import { IPost, ISort } from "../../types/types";
import Error from "../Error/Error";
import User from "./User/User";
import styles from "./Users.module.scss";

const Users = () => {
  const { post, status, error } = useTypedSelector((store) => store.users);
  const { sort, arrowCity,arrowCompany } = useTypedSelector((store) => store.sort);
  const [usersCount, setUsersCount] = useState<number>(0);
  const [sortedUsers, setSortedUsers] = useState<Array<IPost>>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const sortByType = (sortType: string, usersForSort: Array<IPost>): any => {
    switch (sortType) {
      case "city":
        setSortedUsers(
          usersForSort.sort((a: IPost, b: IPost): number =>
          arrowCity
              ? a.address.city > b.address.city
                ? 1
                : -1
              : a.address.city < b.address.city
                ? 1
                : -1
          )
        );
        break;
      case "company":
        setSortedUsers(
          usersForSort.sort((a: IPost, b: IPost) =>
            arrowCompany
              ? a.company.name > b.company.name
                ? 1
                : -1
              : a.company.name < b.company.name
                ? 1
                : -1
          )
        );
        break;
      case "alphabet":
        setSortedUsers(
          usersForSort.sort((a: IPost, b: IPost): number =>
            a.name > b.name ? 1 : -1
          )
        );
        break;
    }
  };

  useEffect(() => {
    let usersForSort = [...post];
    setSortedUsers(
      usersForSort.filter((item) =>
        !searchValue
          ? sortedUsers
          : item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
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
  }, [post, sort, arrowCity,arrowCompany]);

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
      {status === "error" && <Error errorMessage={error} />}
      {status === "loading" && (
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
        </Stack>
      )}
      {status === "success" && (
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
