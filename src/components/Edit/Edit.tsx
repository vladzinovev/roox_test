
import styles from './Edit.module.scss';
const Edit=()=>{

    const handleSubmit = (e:any) => {
        e.preventDefault();

        const name = e.target.elements.name.value;

    };

    return(
        <div className={styles.edit}>
            <div className={styles.flex_sb}>
                <p className={styles.name}>Профиль пользователя</p>
                <button className={styles.btn_edit}>Редактировать</button>
            </div>
            
            <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                    <label className={styles.label_input} htmlFor="name">Name</label>
                    <input className={styles.input} type='text' name="name" id="name" required/>
                </div>
                <div>
                    <label className={styles.label_input} htmlFor="user_name">User name</label>
                    <input className={styles.input} type='text' name="user_name" id="user_name" required/>
                </div>
                <div>
                    <label className={styles.label_input} htmlFor="email">E-mail</label>
                    <input className={styles.input} type='email' name="email" id="email" required/>
                </div>
                <div>
                    <label className={styles.label_input} htmlFor="street">Street</label>
                    <input className={styles.input} type='text' name="street" id="street" required/>
                </div>
                <div>
                    <label className={styles.label_input} htmlFor="city">City</label>
                    <input className={styles.input} type='text' name="city" id="city" required/>
                </div>
                <div>
                    <label className={styles.label_input} htmlFor="zip_code">Zip code</label>
                    <input className={styles.input} type='text' name="zip_code" id="zip_code" required/>
                </div>
                <div>
                    <label className={styles.label_input} htmlFor="phone">Phone</label>
                    <input className={styles.input} type='phone' name="phone" id="phone" required/>
                </div>
                <div>
                    <label className={styles.label_input} htmlFor="website">Web site</label>
                    <input className={styles.input} type='text' name="website" id="website" required/>
                </div>
                <div>
                    <label className={styles.label_input} htmlFor="comment">Comment</label>
                    <input className={styles.input_comment} type='text' name="comment" id="comment"/>
                </div>
                <button className={styles.btn_submit} type="submit" value="Отправить">Отправить</button>
            </form>
        </div>
    )
}
export default Edit;