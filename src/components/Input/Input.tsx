import styles from "./Input.module.scss";
const Input = ({
    label,
    idLabel,
  title,
  edit,
  defaultValue,
  error,
  textError,
  minLenError,
}:any) => {
    console.log(defaultValue);
  return (
    <div className={styles.input}>
      <label className={styles.label_input} htmlFor="idLabel">
        {label}
      </label>
      {minLenError ? title.isDirty && title.minLengthError && (
        <div className={styles.error}>Мало букв</div>
      ) : null}
      
      {title.isDirty && error && (
        <div className={styles.error}>{textError}</div>
      )}
      <input
        className={`${styles.input} ${title.isEmpty ? styles.invalid : null}`}
        onChange={(e: any) => title.onChange(e)}
        onBlur={() => title.onBlur()}
        type="text"
        name="idLabel"
        id="idLabel"
        defaultValue={defaultValue}
        required
        readOnly={!edit ? true : false}
      />
    </div>
  );
};
export default Input;
