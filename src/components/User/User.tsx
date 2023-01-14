import { NavLink } from 'react-router-dom';
import styles from './User.module.scss';
const User=()=>{
    return(
        <div className={styles.user}>
            <div className={styles.flex}><p className='base_text'>ФИО:</p><p className='write_text'>Иван Иванов</p></div>
            <div className={styles.flex}><p className='base_text'>город:</p><p className='write_text'>Москва</p></div>
            <div className={styles.flex}><p className='base_text'>компания:</p><p className='write_text'>ООО Пример</p></div>
            <NavLink className={styles.link} to={`/userid/`}>
                
            </NavLink>
        </div>
    )
}
export default User;