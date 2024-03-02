import React, { useState } from 'react'
import styles from './style.module.css'
import { UserData } from './Data'
import BarChart from './barchart/BarChart'
import LineChart from './linechart/LineChart'
function Dashboard() {
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [{
            label: "Verified Observations",
            data: UserData.map((data) => data.userGain),
            backgroundColor: ["green"],
            barPercentage: 0.5
        },
        {
            label: "Pending Observations",
            data: UserData.map((data) => data.userLost),
            backgroundColor: ["orange"],
            barPercentage: 0.5
        },
        ]
    })
    const [show, setShow] = useState(false)
    return (
        <div className={styles.container}>
            <div className={styles.tileContainer}>
                <div className={styles.verified} onClick={() => setShow(!show)}>
                    <h1>123</h1>
                    <p>Verified Obsevations</p>
                </div>
                <div className={styles.pending}>
                    <h1>123</h1>
                    <p>Pending Observations</p>
                </div>
                <div className={styles.recentlyActive}>
                    <h1>123</h1>
                    <p>Recntly Active user</p>
                </div>
                <div className={styles.contribution}>
                    <h1>123</h1>
                    <p>Contribution</p>
                </div>
                <div className={styles.total}>
                    <h1>123</h1>
                    <p>Total Identified Species</p>
                </div>
            </div>
            <div className={styles.chart}>
                {!show && <BarChart barData={userData}></BarChart>}
                {show && <LineChart lineData={userData}></LineChart>}
            </div>
        </div>
    )
}

export default Dashboard
