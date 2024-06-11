import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';


import { useAuth } from './AuthProvider';
import { useEffect, useState } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function ProfileFragement({open, handleClose}) {
    const { user } = useAuth();

  
    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
           
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Profile Info
                </DialogTitle>

               
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>


                <DialogContent dividers >
                    <Avatar alt="DP" src={user.photoURL} style={{ marginLeft: '128px' }}/ >
                    <br/>
                    <Typography gutterBottom>
                        Name: {user.displayName}
                    </Typography>
                    <Typography gutterBottom>
                        Email: {user.email}
                    </Typography>
                    <Typography gutterBottom>
                        UID: {user.uid}
                    </Typography>
                    <Typography gutterBottom>
                        Logged in via : {user.providerData[0]?.providerId}
                    </Typography>
                </DialogContent>

            </BootstrapDialog>
        </React.Fragment>
    );
}
