
import styles from './Edit.module.scss';
const Edit=()=>{
    return(
        <div className={styles.edit}>
            <div className={styles.flex_sb}>
                <p className={styles.name}>Профиль пользователя</p>
                <button className={styles.edit_btn}>Редактировать</button>
            </div>
            
            <form className={styles.form}>

            </form>
        </div>
    )
}
export default Edit;