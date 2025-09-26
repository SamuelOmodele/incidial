import React from 'react'
import styles from './reports.module.css'

const reportHistory = [
    { id: 1, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
    { id: 2, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
    { id: 3, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
    { id: 4, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
    { id: 5, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
    { id: 6, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
    { id: 7, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
    { id: 8, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
]

const ReportsPage = () => {

    return (
        <div className={styles.reportHistory} >
            <h3>Report History</h3>
            <table>
                <thead>
                    <tr className={styles.head}>
                        <th>Id</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Severity</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {reportHistory.map((report) => (
                        <tr key={report.id}>
                            <td>{report.id}</td>
                            <td>{report.category}</td>
                            <td>{report.description}</td>
                            <td>{report.severity}</td>
                            <td>{report.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default ReportsPage