import Edit from "../../components/Edit/Edit";
import Navigation from "../../components/Navigation/Navigation";

import styles from "./Profile.module.scss";
const Profile = () => {
  return (
    <div className={styles.profile}>
      <Navigation />
      <Edit />
    </div>
  );
};
export default Profile;
