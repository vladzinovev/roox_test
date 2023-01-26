import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTypedSelector } from "../../hook/useTypedSelector";
import { IPost } from "../../types/types";
import styles from "./Edit.module.scss";
const Edit = () => {
  const { post } = useTypedSelector((store) => store.users);
  let params = useParams();
  let navigate = useNavigate();
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
  ]);
  function getUserId() {
    setPostItem(post.find((post) => post.id === Number(params.id)));
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
    const tet = e.target.elements;
    array.forEach(arr=>{
        if(arr.id===Number(params.id)){
            arr["comment"]=tet.comment.value;
        }
    })
    /* array.map((arr) => {
      if (arr.id === Number(params.id)) {
        console.log("вход");
        array.push(tet.comment.value);
        setArray((prev) => ({
          ...prev,
          [arr.name]: e.target.elements.name.value,
        }));
      } else {
        console.log("выход");
        return arr;
      }
    }); */

    /* setPostItem(oldValues=>({...oldValues,[e.target.elements.name]:e.target.elements.name.value})); */

    const names: string = tet.name.value;
    const userName = tet.user_name.value;
    const email = tet.email.value;
    const street = tet.street.value;
    const city = tet.city.value;
    const zipcode = tet.zip_code.value;
    const phone = tet.phone.value;
    const website = tet.website.value;
    const comment = tet.comment.value;
    console.log(
      `${names} ${userName} ${email} ${street} ${city} ${zipcode} ${phone} ${website} ${comment} `
    );

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
    console.log(array);
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
