import User from '../User/User';
import styles from './Users.module.scss';
const Users=()=>{
    return(
        <div className={styles.users}>
            <p className={styles.name}>Список пользователей</p>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
            <p className={styles.search}>Найдено 10 пользователей</p>
        </div>
    )
}
export default Users;