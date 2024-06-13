import * as React from 'react';
import { useAuth } from './AuthProvider';
import { database } from './firebase';
import { get, ref, remove } from 'firebase/database';
import { useState } from 'react';

//------------------MUI Imports------------------//
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';

//------------------Constants------------------//
const header = "History";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function HistoryFragment({ open, handleClose }) {
    const { user } = useAuth();
    const dataRef = ref(database, `history/${user.uid}/items`)
    const [data, setData] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage,setSnackBarMessage] = useState('');


    get(dataRef).then((snapshot) => {
        const data = snapshot.val();
        const items = data ? Object.values(data) : [];
        setData(items.reverse());
    }).catch((error) => {
        console.error("Error fetching data:", error);
    });

    const deleteHistory = () => {
        remove(dataRef).then(() => {
            setSnackBarMessage("Deleted successfully!!");
            setOpenSnackbar(true);
            console.log("Delete successful!!");
        }).catch((error) => {
            setSnackBarMessage("Error while deleting data!!");
            setOpenSnackbar(true);
            console.log(error);
        })
    }

    const handleSnackbarClose = ()=>{
        setOpenSnackbar(false);
    }

    return (
        <React.Fragment>
                    <Dialog
                        fullScreen
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                        sx = {{
                            '& .MuiDrawer-paper': {
                                backgroundColor: 'inherit',
                            }
                        }}
                    >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {header}
                        </Typography>
                        <Button  color="inherit" onClick={deleteHistory} sx={{ marginLeft: 'auto' }}>
                            Delete
                        </Button>
                    </Toolbar>
                </AppBar>

                <List>
                    {data.map((item, index) => (
                        <React.Fragment key={index}>
                            <ListItemText style={{ marginLeft: "20px" }}>
                                <ListItemText primary={item} />
                            </ListItemText>
                            <Divider />
                        </React.Fragment>
                    ))}

                </List>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    message={snackbarMessage}
                />
            </Dialog>
        </React.Fragment>
    );
}
