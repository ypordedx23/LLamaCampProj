import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

interface Props {
    modal_message: string,
    open: boolean
}

const MessageModal = (props: Props) => {
    const [ modal_message, setModalMessage ] = useState(props?.modal_message );
    const [open, setOpen] = useState(props?.open );
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 260
            }}
        >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Wait a few seconds
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        { modal_message }
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default MessageModal;
