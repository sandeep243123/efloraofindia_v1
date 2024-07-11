import React from 'react'
import styles from './style.module.css';
import Selector from './Selector'
function AddContribution(props) {

    return (
        <div className={`${styles["modalBackground"]}`}>
            <div className={`${styles["modalContainer"]}`}>
                <div className={`${styles["modald1"]}`}>
                    <div className={`${styles["title"]}`}>
                        Add Contribution
                    </div>
                    <button onClick={() => props.closeAddContribution(false)}>X</button>
                </div>
                <div className={styles.body}>
                    <Selector postID={props.postID}></Selector>
                </div>
            </div>

        </div>
    )
}

export default AddContribution