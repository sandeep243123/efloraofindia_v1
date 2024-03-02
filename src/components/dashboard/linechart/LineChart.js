import React from 'react'
import { Line } from 'react-chartjs-2'
import styles from './LineChart.module.css'
function LineChart({ lineData }) {
    return (
        <Line className={styles.chartContainer} data={lineData} options={{ maintainAspectRatio: false }}></Line>
    )
}

export default LineChart
