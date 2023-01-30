import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useInput } from "../../hook/useInput";
import { useAppDispatch } from "../../hook/useTypedSelector";
import { getAllPosts } from "../../store/users";
import styles from "./LogIn.module.scss";

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [submit, setSubmit] = useState(false);
  const login = { email: "test@mail.ru", password: "1234" };
  const valueLocalStorage = (name: string) => {
    const storage = localStorage.getItem(name);
    if (storage !== null) {
      return JSON.parse(storage);
    }
    return "";
  };
  const email = useInput("", valueLocalStorage("email"), {isEmpty: true,isEmail: true,});
  const password = useInput("", valueLocalStorage("password"), {isEmpty: true,});

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    if (login.email === email.value && login.password === password.value) {
      window.localStorage.setItem("email", JSON.stringify(email.value));
      window.localStorage.setItem("password", JSON.stringify(password.value));
      setSubmit(true);
    }
  }, [email.value, password.value]);

  return (
    <section className={styles.login}>
      <p className={styles.bd}>БД пользователей</p>
      <form className={styles.form}>
        <div className={styles.block}>
          <div className={styles.block_input}>
            <label className={styles.label_input} htmlFor="email">
              Email
            </label>
            <input
              className={`${styles.input} ${
                email.isEmpty ? styles.invalid : null
              }`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                email.onChange(e)
              }
              onBlur={() => email.onBlur()}
              type="text"
              name="email"
              id="email"
              defaultValue={valueLocalStorage("email")}
              required
            />
          </div>
          <div className={styles.block_input}>
            <label className={styles.label_input} htmlFor="password">
              Password
            </label>
            <input
              className={`${styles.input} ${
                password.isEmpty ? styles.invalid : null
              }`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                password.onChange(e)
              }
              onBlur={() => password.onBlur()}
              type="text"
              name="password"
              id="password"
              defaultValue={valueLocalStorage("password")}
              required
            />
          </div>
        </div>
        <button
          className={`${styles.btn} ${submit ? styles.enter : null}`}
          disabled={submit ? false : true}
          type="submit"
          value="Вход в систему"
          onClick={() => navigate("/users")}
        >
          Вход в систему
        </button>
      </form>
    </section>
  );
};
export default LogIn;
