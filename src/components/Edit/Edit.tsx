import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../../hook/useTypedSelector";
import { IPost } from "../../types/types";
import styles from "./Edit.module.scss";
const Edit = () => {
  const { post } = useTypedSelector((store) => store.users);
  let params = useParams();
  const [edit, setEdit] = useState(false);
  const [postItem, setPostItem] = useState<IPost>();

  function getUserId() {
    setPostItem(post.find((post) => post.id === Number(params.id)));
  }

  const onEdit = () => {
    setEdit(true);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const name = e.target.elements.name.value;
  };
  useEffect(() => {
    console.log(params);
    getUserId();
    /* fetchUser(); */
    console.log(postItem);
  }, [params.id]);
  /* useEffect(() => {
    
    console.log(postItem);
  }, [postItem]); */

  return (
    <div className={styles.edit}>
      <div className={styles.flex_sb}>
        <p className={styles.name}>Профиль пользователя</p>
        <button
          onClick={onEdit}
          disabled={edit ? true : false}
          className={`${styles.btn_edit} ${!edit?styles.btn_enabled:styles.btn_disabled}`}
        >
          Редактировать
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label className={styles.label_input} htmlFor="name">
            User
          </label>
          <input
            className={styles.input}
            type="text"
            name="name"
            id="name"
            disabled={!edit ? true : false}
            defaultValue={postItem?.name}
            required
          />
        </div>
        <div>
          <label className={styles.label_input} htmlFor="user_name">
            User name
          </label>
          <input
            className={styles.input}
            type="text"
            name="user_name"
            id="user_name"
            disabled={!edit ? true : false}
            defaultValue={postItem?.username}
            required
          />
        </div>
        <div>
          <label className={styles.label_input} htmlFor="email">
            E-mail
          </label>
          <input
            className={styles.input}
            type="email"
            name="email"
            id="email"
            disabled={!edit ? true : false}
            defaultValue={postItem?.email}
            required
          />
        </div>
        <div>
          <label className={styles.label_input} htmlFor="street">
            Street
          </label>
          <input
            className={styles.input}
            type="text"
            name="street"
            id="street"
            disabled={!edit ? true : false}
            defaultValue={postItem?.address.street}
            required
          />
        </div>
        <div>
          <label className={styles.label_input} htmlFor="city">
            City
          </label>
          <input
            className={styles.input}
            type="text"
            name="city"
            id="city"
            disabled={!edit ? true : false}
            defaultValue={postItem?.address.city}
            required
          />
        </div>
        <div>
          <label className={styles.label_input} htmlFor="zip_code">
            Zip code
          </label>
          <input
            className={styles.input}
            type="text"
            name="zip_code"
            id="zip_code"
            disabled={!edit ? true : false}
            defaultValue={postItem?.address.zipcode}
            required
          />
        </div>
        <div>
          <label className={styles.label_input} htmlFor="phone">
            Phone
          </label>
          <input
            className={styles.input}
            type="phone"
            name="phone"
            id="phone"
            disabled={!edit ? true : false}
            defaultValue={postItem?.phone}
            required
          />
        </div>
        <div>
          <label className={styles.label_input} htmlFor="website">
            Web site
          </label>
          <input
            className={styles.input}
            type="text"
            name="website"
            id="website"
            disabled={!edit ? true : false}
            defaultValue={postItem?.website}
            required
          />
        </div>
        <div>
          <label className={styles.label_input} htmlFor="comment">
            Comment
          </label>
          <input
            className={styles.input_comment}
            type="text"
            name="comment"
            id="comment"
            disabled={!edit ? true : false}
          />
        </div>
        <button
          className={`${styles.btn_submit} ${
            edit ? styles.btn_enabled : styles.btn_disabled
          }`}
          disabled={!edit ? true : false}
          type="submit"
          value="Отправить"
        >
          Отправить
        </button>
      </form>
    </div>
  );
};
export default Edit;
