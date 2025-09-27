import React from 'react'
import { Modal, Box, Button } from "@mui/material";
import styles from './incidentModal.module.css'

type incidentModalPropType = {
    open: boolean,
    handleClose: () => void
}

const IncidentModal = ({ open, handleClose }: incidentModalPropType) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    className={styles.modal}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 500,
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        boxShadow: 24,
                        p: '20px',
                        outline: 'none'
                    }}
                >
                    <h2>Incident - 1</h2>
                    <hr />
                    <div className={styles.detailsBox}>
                        <div>
                            <h4>Date</h4>
                            <p>11th September</p>
                        </div>
                        <div>
                            <h4>Severity</h4>
                            <p>High</p>
                        </div>
                        <div>
                            <h4>Category</h4>
                            <p>Theft</p>
                        </div>
                        <div>
                            <h4>Location</h4>
                            <p>Agbowo</p>
                        </div>
                        <div>
                            <h4>Description</h4>
                            <p>Theves broke into a house and stole valuables</p>
                        </div>
                    </div>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        sx={{ mt: 3, color: '#208971', border: 1 }}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default IncidentModal