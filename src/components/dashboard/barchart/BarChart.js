import React from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import styles from './Barchart.module.css'
function BarChart({ barData }) {
    return (
        <Bar className={styles.chartContainer} data={barData} options={{ maintainAspectRatio: false }}></Bar >
    )
}

export default BarChart
