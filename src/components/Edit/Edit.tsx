import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInput } from "../../hook/useInput";
import { useAppDispatch, useTypedSelector } from "../../hook/useTypedSelector";
import { getEditProfile, setId } from "../../store/users";
import { IPost, PostUser } from "../../types/types";
import Input from "./Input/Input";
import styles from "./Edit.module.scss";
import { Skeleton, Stack } from "@mui/material";

const Edit = () => {
  const { post } = useTypedSelector((store) => store.users);
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState<boolean>(false);
  const [postItem, setPostItem] = useState<IPost>();
  const [loading, setloading] = useState<boolean>(false);

  const name = useInput(params.id, `${postItem?.name}`, {isEmpty: true,minLength: 2,isName: true,});
  const username = useInput(params.id, `${postItem?.username}`, {isEmpty: true,minLength: 3,isUsername: true,});
  const email = useInput(params.id, `${postItem?.email}`, {isEmpty: true,isEmail: true,});
  const street = useInput(params.id, `${postItem?.address.street}`, {isEmpty: true,isStreet: true,});
  const city = useInput(params.id, `${postItem?.address.city}`, {isEmpty: true,isCity: true,});
  const zipcode = useInput(params.id, `${postItem?.address.zipcode}`, {isEmpty: true,isZipcode: true,});
  const phone = useInput(params.id, `${postItem?.phone}`, {isEmpty: true,minLength: 7,isPhone: true,});
  const website = useInput(params.id, `${postItem?.website}`, {isEmpty: true,isWebsite: true,});
  const comment = useInput(params.id, `${postItem?.comment}`, {});

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onEdit();
    dispatch(
      getEditProfile({
        name: name.value,
        username: username.value,
        email: email.value,
        street: street.value,
        city: city.value,
        zipcode: zipcode.value,
        phone: phone.value,
        website: website.value,
        comment: comment.value,
      })
    );
    //для формирования JSON и вывода на консоль
    setArray({
      name: name.value,
      username: username.value,
      email: email.value,
      address: {
        street: street.value,
        city: city.value,
        zipcode: zipcode.value,
      },
      phone: phone.value,
      website: website.value,
      comment: comment.value,
    });
  }
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setloading(true);
    getUserId();
    setloading(false);
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
      {loading ? (
        <>
          <Stack spacing={1}>
            <Skeleton className={styles.loading} variant="rounded" width={436} height={464}/>
            <Skeleton className={styles.load_count} variant="text" sx={{ fontSize: "1rem" }}/>
          </Stack>{" "}
        </>
      ) : (
        <form className={styles.form} onSubmit={(e:React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
          <div className={styles.block}>
            <Input
              label="Name"
              idLabel="name"
              title={name}
              edit={edit}
              error={name.nameError}
              textError="Некорректное имя или не указана фамилия"
              minLenError={true}
              defaultValue={postItem?.name}
            />
            <Input
              label="User name"
              idLabel="user_name"
              title={username}
              edit={edit}
              error={username.usernameError}
              textError="Некорректное имя"
              minLenError={true}
              defaultValue={postItem?.username}
            />
            <Input
              label="E-mail"
              idLabel="email"
              title={email}
              edit={edit}
              error={email.emailError}
              textError="Некорректный email"
              defaultValue={postItem?.email}
            />
            <Input
              label="Street"
              idLabel="street"
              title={street}
              edit={edit}
              error={street.streetError}
              textError="Некорректный ввод названия улицы"
              defaultValue={postItem?.address.street}
            />
            <Input
              label="City"
              idLabel="city"
              title={city}
              edit={edit}
              error={city.cityError}
              textError="Некорректный ввод названия города"
              defaultValue={postItem?.address.city}
            />
            <Input
              label="Zip code"
              idLabel="zip_code"
              title={zipcode}
              edit={edit}
              error={zipcode.zipcodeError}
              textError="Некорректный zipcode"
              defaultValue={postItem?.address.zipcode}
            />
            <Input
              label="Phone"
              idLabel="phone"
              title={phone}
              edit={edit}
              error={phone.phoneError}
              textError="Некорректный ввод номера телефона"
              minLenError={true}
              defaultValue={postItem?.phone}
            />
            <Input
              label="Web site"
              idLabel="website"
              title={website}
              edit={edit}
              error={website.websiteError}
              textError="Некорректный ввод website"
              defaultValue={postItem?.website}
            />
            <div>
              <label className={styles.label_input} htmlFor="comment">
                Comment
              </label>
              <textarea
                onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => comment.onChange(e)}
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
                ? true
                : !name.inputValid ||
                  !username.inputValid ||
                  !email.inputValid ||
                  !street.inputValid ||
                  !city.inputValid ||
                  !zipcode.inputValid ||
                  !phone.inputValid ||
                  !website.inputValid
                ? true
                : false
            }
            type="submit"
            value="Отправить"
          >
            Отправить
          </button>
        </form>
      )}
    </div>
  );
};
export default Edit;
