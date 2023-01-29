import error from "../../image/error.gif";
import { IErrorComment } from "../../types/types";
import styles from "./Error.module.scss";

const Error = ({ errorMessage }: IErrorComment) => {
  return (
    <div className={styles.error}>
      <p className={styles.text}>{errorMessage}</p>
      <img className={styles.img} alt="error" src={error} />
    </div>
  );
};

export default Error;
