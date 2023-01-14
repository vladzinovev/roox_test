import Edit from '../../components/Edit/Edit';
import Navigation from '../../components/Navigation/Navigation';

import styles from './Portfolio.module.scss';
const Portfolio=()=>{
    return(
        <div className={styles.portfolio}>
            <Navigation/>
            <Edit/>
        </div>
    )
}
export default Portfolio;