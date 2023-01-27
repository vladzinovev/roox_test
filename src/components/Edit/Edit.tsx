import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../hook/useTypedSelector";
import { getEditProfile, setId } from "../../store/users";
import { IPost } from "../../types/types";
import styles from "./Edit.module.scss";
const Edit = () => {
  const { post,id} = useTypedSelector((store) => store.users);
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const [postItem, setPostItem] = useState<IPost>();
  const [array, setArray] = useState<IPost[]>([
    {
      id: 8,
      name: "Nicholas Runolfsdottir V",
      username: "Maxime_Nienow",
      email: "Sherwood@rosamond.me",
      address: {
        street: "Ellsworth Summit",
        suite: "Suite 729",
        city: "Aliyaview",
        zipcode: "45169",
        geo: {
          lat: "-14.3990",
          lng: "-120.7677",
        },
      },
      phone: "586.493.6943 x140",
      website: "jacynthe.com",
      company: {
        name: "Abernathy Group",
        catchPhrase: "Implemented secondary concept",
        bs: "e-enable extensible e-tailers",
      },
    },
    {
      id: 1,
      name: "vlad vlad",
      username: "ssss",
      email: "sss@rosamond.me",
      address: {
        street: "ss Summisst",
        suite: "ss 729",
        city: "sssAlissyaview",
        zipcode: "45169",
        geo: {
          lat: "-14.3990",
          lng: "-120.7677",
        },
      },
      phone: "586.493.6943 x140",
      website: "ssjsacynthe.com",
      company: {
        name: "sssAbernathy Group",
        catchPhrase: "ssImplemented secondary concept",
        bs: "e-enable extensible e-tailers",
      },
    },
  ]);
  function getUserId() {
    setPostItem(post.find((post) => post.id === Number(params.id)));
    dispatch(setId(Number(params.id)));
  }
  /* function get(){
    let copy = Object.assign([], array);
    console.log(postItem);
    if(postItem!==undefined){
        copy.push(postItem);
        setArray(copy);
    }
    console.log(array)
  } */

  const onEdit = () => {
    setEdit(!edit);
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    onEdit();
    const tet =e.target.elements;
    const name=tet.name.value;
    const username=tet.user_name.value;
    const email=tet.email.value;
    const street=tet.street.value;
    const city=tet.city.value;
    const zipcode=tet.zip_code.value;
    const phone=tet.phone.value;
    const website=tet.website.value;
    const comment=tet.comment.value;
    dispatch(getEditProfile({name,username,email,street,city,zipcode,phone,website,comment}));
  }
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getUserId();
  }, [params.id]);

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
        <div>
          <label className={styles.label_input} htmlFor="name">
            User
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
          <input
            className={styles.input_comment}
            type="text"
            name="comment"
            id="comment"
            defaultValue={postItem?.comment}
            readOnly={!edit ? true : false}
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
