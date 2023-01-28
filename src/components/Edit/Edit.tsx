import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInput } from "../../hook/useInput";
import { useAppDispatch, useTypedSelector } from "../../hook/useTypedSelector";
import { getEditProfile, setId } from "../../store/users";
import { IPost, PostUser } from "../../types/types";
import styles from "./Edit.module.scss";

const Edit = () => {
  const { post } = useTypedSelector((store) => store.users);
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const [postItem, setPostItem] = useState<IPost>();

  const name = useInput(`${postItem?.name}`, {isEmpty: true, minLength: 2,isEmail: true,});
  const username = useInput(`${postItem?.username}`, {isEmpty: true,minLength: 3,isEmail: true,});
  const email = useInput(`${postItem?.email}`, {isEmpty: true,minLength: 3,isEmail: true,});
  const street = useInput(`${postItem?.address.street}`, {isEmpty: true,minLength: 3,isEmail: true,});
  const city = useInput(`${postItem?.address.city}`, {isEmpty: true,minLength: 3,isEmail: true,});
  const zipcode = useInput(`${postItem?.address.zipcode}`, {isEmpty: true,minLength: 3,isEmail: true,});
  const phone = useInput(`${postItem?.phone}`, {isEmpty: true,minLength: 3,isEmail: true,});
  const website = useInput(`${postItem?.website}`, {isEmpty: true,minLength: 3,isEmail: true,});
  const comment = useInput(`${postItem?.comment}`,{});

  //для формирования JSON и вывода на консоль
  const [array, setArray] = useState<PostUser>({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      city: "",
      zipcode: 0,
    },
    phone: "",
    website: "",
  });

  function getUserId() {
    setPostItem(post.find((post) => post.id === Number(params.id)));
    dispatch(setId(Number(params.id)));
  }

  const onEdit = () => {
    setEdit(!edit);
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    onEdit();

    const tet = e.target.elements;
    const name: string = tet.name.value;
    const username = tet.user_name.value;
    const emails = tet.email.value;
    console.log(emails)
    console.log(email.value)
    const street: string = tet.street.value;
    const city = tet.city.value;
    const zipcode = tet.zip_code.value;
    const phone = tet.phone.value;
    const website = tet.website.value;
    const comment = tet.comment.value;
    dispatch(
      getEditProfile({
        name,
        username,
        email,
        street,
        city,
        zipcode,
        phone,
        website,
        comment,
      })
    );
    //для формирования JSON и вывода на консоль
    setArray({
      name: name,
      username: username,
      email: emails,
      address: {
        street: street,
        city: city,
        zipcode: zipcode,
      },
      phone: phone,
      website: website,
      comment: comment,
    });
  }
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getUserId();
  }, [params.id]);

  useEffect(() => {
    console.log(JSON.stringify(array));
  }, [array]);

  return (
    <div className={styles.edit}>
      <div className={styles.flex_sb}>
        <button
          onClick={goBack}
          className={`${styles.btn_edit} ${styles.btn_enabled}`}
        >
          Назад
        </button>
        <p className={styles.name}>Профиль пользователя</p>
        <button
          onClick={onEdit}
          disabled={edit ? true : false}
          className={`${styles.btn_edit} ${
            !edit ? styles.btn_enabled : styles.btn_disabled
          }`}
        >
          Редактировать
        </button>
      </div>

      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.block}>
          <div>
            <label className={styles.label_input} htmlFor="name">
              Name
            </label>
            <input
              className={styles.input}
              type="text"
              name="name"
              id="name"
              defaultValue={postItem?.name}
              required
              readOnly={!edit ? true : false}
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
              readOnly={!edit ? true : false}
              defaultValue={postItem?.username}
              required
            />
          </div>
          <div>
            <label className={styles.label_input} htmlFor="email">
              E-mail
            </label>
            {email.isDirty && email.emailError && (
              <div className={styles.error}>Некорректный email</div>
            )}
            <input
              className={`${styles.input} ${
                email.isEmpty ? styles.invalid : null
              }`}
              type="text"
              name="email"
              id="email"
              readOnly={!edit ? true : false}
              defaultValue={postItem?.email}
              required
              onChange={(e) => email.onChange(e)}
              onBlur={() => email.onBlur()}
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
              readOnly={!edit ? true : false}
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
              readOnly={!edit ? true : false}
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
              readOnly={!edit ? true : false}
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
              type="text"
              name="phone"
              id="phone"
              readOnly={!edit ? true : false}
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
              readOnly={!edit ? true : false}
              defaultValue={postItem?.website}
              required
            />
          </div>
          <div>
            <label className={styles.label_input} htmlFor="comment">
              Comment
            </label>
            <textarea
              className={styles.input_comment}
              name="comment"
              id="comment"
              defaultValue={postItem?.comment}
              readOnly={!edit ? true : false}
            />
          </div>
        </div>

        <button
          className={`${styles.btn_submit} ${
            edit ? styles.btn_enabled : styles.btn_disabled
          }`}
          disabled={!edit ? true : !email.inputValid ? true : false}
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
