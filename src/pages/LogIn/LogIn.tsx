import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { useInput } from "../../hook/useInput";
import { useAppDispatch } from "../../hook/useTypedSelector";
import { getAllPosts } from "../../store/users";
import styles from "./LogIn.module.scss";

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [cookies, setCookie] = useCookies(["auth"]);
  const [submit, setSubmit] = useState(false);
  const login = { email: "test@mail.ru", password: "1234" };
  const email = useInput("", "", { isEmpty: true, isEmail: true });
  const password = useInput("", "", { isEmpty: true });
  const date = new Date(Date.now() + 60000);

  function showUsers() {
    setCookie("auth", "authorized", { expires: date, path: "/" });
    navigate("/users");
  }

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    setSubmit(false);
    if (login.email === email.value && login.password === password.value) {
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
              required
            />
          </div>
        </div>
        <button
          className={`${styles.btn} ${
            submit || cookies.auth ? styles.enter : null
          }`}
          disabled={submit ? false : cookies.auth ? false : true}
          type="submit"
          value="Вход в систему"
          onClick={showUsers}
        >
          Вход в систему
        </button>
      </form>
    </section>
  );
};
export default LogIn;
