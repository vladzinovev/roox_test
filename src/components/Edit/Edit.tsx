import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../hook/useTypedSelector";
import { getEditProfile, setId } from "../../store/users";
import { IPost, PostUser } from "../../types/types";
import styles from "./Edit.module.scss";

export const useValidation = (value: string, validations: any) => {
  const [isEmpty, setEmpty] = useState(false);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(true);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case "empty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        case "maxLength":
          value.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          break;
        case "email":
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          re.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || maxLengthError || minLengthError || emailError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, maxLengthError, minLengthError, emailError]);

  return {
    isEmpty,
    minLengthError,
    emailError,
    maxLengthError,
    inputValid,
  };
};

export const useInput = (initialValue: string, validations: any) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    setDirty(true);
  };
  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};

const Edit = () => {
  const email = useInput("", { isEmpty: false, minLength: 3, isEmail: true });
  const password = useInput("", {
    isEmpty: false,
    minLength: 5,
    maxLength: 10,
  });

  const { post, id } = useTypedSelector((store) => store.users);
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const [postItem, setPostItem] = useState<IPost>();

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
    const email = tet.email.value;
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
      email: email,
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

  /* function get(){
    let copy = Object.assign([], array);
    console.log(postItem);
    if(postItem!==undefined){
        copy.push(postItem);
        setArray(copy);
    }
    console.log(array)
  } */
  /* array.forEach((arr) => {
      if (arr.id === Number(params.id)) {
        arr["name"] = tet.name.value;
        arr["username"] = tet.user_name.value;
        arr["email"] = tet.email.value;
        arr["address"]["street"] = tet.street.value;
        arr["address"]["city"] = tet.city.value;
        arr["address"]["zipcode"] = tet.zip_code.value;
        arr["phone"] = tet.phone.value;
        arr["website"] = tet.website.value;
        arr["comment"] = tet.comment.value;
      }
    }); */
  /* setArray(
      array.map((obj) => {
        if (obj.id === Number(params.id)) {
          console.log(params.id);
          console.log(obj.id);
          console.log(obj.name);
          console.log([obj.name]);
          return { ...obj, ["name"]: names };
        } else {
          return obj;
        }
      })
    ); */

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
            <input
              className={styles.input}
              type="email"
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
              type="phone"
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
          disabled={
            !edit
              ? !email.inputValid || !password.inputValid
                ? true
                : false
              : false
          }
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
