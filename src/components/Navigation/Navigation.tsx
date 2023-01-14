import styles from './Navigation.module.scss';
const Navigation=()=>{
    return(
        <div className={styles.navigation}>
            <p className='sort'>Сортировка</p>
            <button className='btn_sort'>по городу</button>
            <button className='btn_sort'>по компании</button>
        </div>
    )
}
export default Navigation;