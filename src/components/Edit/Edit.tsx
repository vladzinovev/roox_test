
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInput } from "../../hook/useInput";
import { useAppDispatch, useTypedSelector } from "../../hook/useTypedSelector";
import { getEditProfile, setId } from "../../store/users";
import { IPost, PostUser } from "../../types/types";
import Input from "../Input/Input";
import styles from "./Edit.module.scss";

const Edit = () => {
  const { post } = useTypedSelector((store) => store.users);
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const [postItem, setPostItem] = useState<IPost>();

  const name = useInput(params.id,`${postItem?.name}`, {isEmpty: true, minLength: 2,isName: true});
  const username = useInput(params.id,`${postItem?.username}`, {isEmpty: true, minLength: 3,isUsername: true,});
  const email = useInput(params.id,`${postItem?.email}`, {isEmpty: true,isEmail: true,});
  const street = useInput(params.id,`${postItem?.address.street}`, {isEmpty: true,isStreet: true,});
  const city = useInput(params.id,`${postItem?.address.city}`, {isEmpty: true,isCity: true,});
  const zipcode = useInput(params.id,`${postItem?.address.zipcode}`, {isEmpty: true,isZipcode: true,});
  const phone = useInput(params.id,`${postItem?.phone}`, {isEmpty: true,minLength: 7,isPhone: true,});
  const website = useInput(params.id,`${postItem?.website}`, {isEmpty: true,isWebsite: true,});
  const comment = useInput(params.id,`${postItem?.comment}`,{});

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
    dispatch(
      getEditProfile({
        name:name.value,
        username:username.value,
        email:email.value,
        street:street.value,
        city:city.value,
        zipcode:zipcode.value,
        phone:phone.value,
        website:website.value,
        comment:comment.value
        })
    );
    //для формирования JSON и вывода на консоль
    setArray({
        name:name.value,
        username:username.value,
        email:email.value,
      address: {
        street:street.value,
        city:city.value,
        zipcode:zipcode.value,
      },
      phone:phone.value,
        website:website.value,
        comment:comment.value
    });
  }
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getUserId();
  }, [params.id]);

  /* useEffect(() => {
    console.log(JSON.stringify(array));
  }, [array]);  */
  useEffect(() => {
    console.log(post);
  }, [post]);

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
            {name.isDirty && name.minLengthError && (
              <div className={styles.error}>Мало букв</div>
            )}
            {name.isDirty && name.nameError && (
                <div className={styles.error}>Некорректное имя или не указана фамилия</div>
            )}
            <input
              className={`${styles.input} ${
                name.isEmpty  ? styles.invalid : null
              }`}
              onChange={(e) => name.onChange(e)}
              onBlur={() => name.onBlur()}
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
            {username.isDirty && username.minLengthError && (
              <div className={styles.error}>Мало букв</div>
            )}
            {username.isDirty && username.usernameError && (
                <div className={styles.error}>Некорректное имя</div>
            )}
            <input
              className={`${styles.input} ${
                username.isEmpty ? styles.invalid : null
              }`}
              onChange={(e) => username.onChange(e)}
              onBlur={() => username.onBlur()}
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
              onChange={(e) => email.onChange(e)}
              onBlur={() => email.onBlur()}
              type="text"
              name="email"
              id="email"
              readOnly={!edit ? true : false}
              defaultValue={postItem?.email}
              required
              
            />
          </div>
          <div>
            <label className={styles.label_input} htmlFor="street">
              Street
            </label>
            {street.isDirty && street.streetError && (
                <div className={styles.error}>Некорректный ввод названия улицы</div>
            )}
            <input
              className={`${styles.input} ${
                street.isEmpty ? styles.invalid : null
              }`}
              onChange={(e) => street.onChange(e)}
              onBlur={() => street.onBlur()}
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
            {city.isDirty && city.cityError && (
                <div className={styles.error}>Некорректный ввод названия города</div>
            )}
            <input
              className={`${styles.input} ${
                city.isEmpty ? styles.invalid : null
              }`}
              onChange={(e) => city.onChange(e)}
              onBlur={() => city.onBlur()}
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
            {zipcode.isDirty && zipcode.zipcodeError && (
                <div className={styles.error}>Некорректный zipcode</div>
            )}
            <input
              className={`${styles.input} ${
                zipcode.isEmpty ? styles.invalid : null
              }`}
              onChange={(e) => zipcode.onChange(e)}
              onBlur={() => zipcode.onBlur()}
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
            {phone.isDirty && phone.phoneError && (
                <div className={styles.error}>Некорректный ввод номера телефона</div>
            )}
            <input
              className={`${styles.input} ${
                phone.isEmpty ? styles.invalid : null
              }`}
              onChange={(e) => phone.onChange(e)}
              onBlur={() => phone.onBlur()}
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
            {website.isDirty && website.websiteError && (
                <div className={styles.error}>Некорректный ввод website</div>
            )}
            <input
              className={`${styles.input} ${
                website.isEmpty ? styles.invalid : null
              }`}
              onChange={(e) => website.onChange(e)}
              onBlur={() => website.onBlur()}
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
              onChange={(e) => comment.onChange(e)}
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
          disabled={!edit ? true : !name.inputValid ||!username.inputValid || !email.inputValid ||!street.inputValid ||!city.inputValid ||!zipcode.inputValid ||!phone.inputValid ||!website.inputValid ? true : false}
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
