'use client'
import React, { useState } from 'react'
import styles from './reports.module.css'
import { appIcons } from '@/app/assets/icons/icons'
import IncidentModal from '@/app/components/incidentModal/incidentModal'

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

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className={styles.reportHistory} >
            <div className={styles.header}>
                <h3>Report History</h3>

                <div className={styles.selectContainer}>
                    <div>
                        <appIcons.dropdownIcon className={styles.icon} size={24} />
                        <select name="category" id="category">
                            <option value="all">All category</option>
                            <option value="all">Theft</option>
                        </select>
                    </div>
                    <div>
                        <appIcons.dropdownIcon className={styles.icon} size={24} />
                        <select name="severity" id="severity">
                            <option value="all">All severity</option>
                            <option value="all">low</option>
                            <option value="all">moderate</option>
                            <option value="all">high</option>
                            <option value="all">critcal</option>
                        </select>
                    </div>

                </div>
            </div>

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
                        <tr key={report.id} onClick={handleOpen}>
                            <td>{report.id}</td>
                            <td>{report.category}</td>
                            <td>{report.description}</td>
                            <td>{report.severity}</td>
                            <td>{report.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <IncidentModal open={open} handleClose={handleClose} />
        </div>
    )
}

export default ReportsPage