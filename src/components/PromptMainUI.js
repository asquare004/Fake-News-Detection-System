import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useAuth } from '../AuthProvider';

import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

//----------ICONS and Animations--------------------//
import SendIcon from '@mui/icons-material/Send';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Logo from '../images/Hypervion.png';
import '../animations.css'

//-------------FIREBASE Imports--------------//
import {database} from '../firebase';
import { ref, push } from "firebase/database";


//--------------CONSTANTS--------------//
const timeAlertDisplay = 3000;

//---FETCHING DATA LOGIC------------//
const fetchData = async (data) => {
    try {
        const response = await fetch('https://fake-news-detection-system-8gjm.onrender.com/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data }) // Data to be sent in the request body
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);
        return responseData;

    } catch (error) {
        console.error('Error:', error);
    }
};

//----------------MAIN FUNCTION------------//
export default function PromptMainUI() {
    const [prompt, setPrompt] = useState('');
    const [displayedPrompt, setDisplayedPrompt] = useState(["",""]);
    const [displaySaveButton, setDisplaySaveButton] = useState(false);
    const [displayCircularProgress, setDisplayCircularProgress] = useState(false);
    const [displaySuccessAlert, setDisplaySuccessAlert] = useState(false);
    const [displayFailureAlert, setDisplayFailureAlert] = useState(false);
    
    const { user } = useAuth();
    const dataRef = ref(database,`history/${user.uid}/items`);

    useEffect(() => {
        if (displaySuccessAlert) {
            const timer = setTimeout(() => {
                setDisplaySuccessAlert(false);
            }, timeAlertDisplay); // 5 seconds delay

            return () => clearTimeout(timer);
        }
    }, [displaySuccessAlert]);

    useEffect(() => {
        if (displayFailureAlert) {
            const timer = setTimeout(() => {
                setDisplayFailureAlert(false);
            }, timeAlertDisplay); // 5 seconds delay

            return () => clearTimeout(timer);
        }
    }, [displayFailureAlert]);

    const handleSubmit = async () => {
        setDisplayCircularProgress(true);
        let response = { data: "", response: "" };
        let finalReponse = ["",""];
        let hasError = false;
        if (prompt != "") {
            response = await fetchData(prompt);
            try {
                finalReponse [0] = user.displayName + ":\n" + response.data ;
                finalReponse[1] = " AI: " + response.response;
            }
            catch (e) {
                finalReponse[0] = "Sorry !! Error fetching details!!"
                hasError = true;
            }
        }

        setDisplayCircularProgress(false);
        setDisplayedPrompt(finalReponse);
        if (!hasError && prompt!="")
            setDisplaySaveButton(true);
        else
            setDisplaySaveButton(false);

        setPrompt('');
    };

    const handleSave =async  () => {
        setDisplayCircularProgress(true);
        console.log("saved");
        console.log(displayedPrompt);
        setDisplaySaveButton(false);

        return push(dataRef,displayedPrompt).then(() => {
            console.log("Save successful!");
            setDisplaySuccessAlert(true);
        }).catch(error => {
            console.log(error);
            setDisplaySaveButton(true);
            setDisplayFailureAlert(true);
        }).finally(()=>{
            setDisplayCircularProgress(false);
        });
    };


    return (
        <>
            <Container maxWidth="sm" style={{ marginTop: '80px' }}>
              
                {displaySuccessAlert && <Alert severity="success" style={{marginBottom:"10px"}}>Save successful.</Alert>}
                {displayFailureAlert && <Alert severity="error" style={{marginBottom:"10px"}}>Saving Data Failed!</Alert>}

                <Box
                    sx={{
                        // border: '1px solid #ccc',
                        padding: '16px',
                        borderRadius: '8px',
                        minHeight: '300px',
                        minWidth: '250px',
                        display: 'flex',    
                        overflowY: 'auto',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        // backgroundColor: '#f5f5f5',
                        position: 'relative'
                    }}
                    style={{ whiteSpace: 'pre-line' }}
                >
                    {displayCircularProgress && <img src={Logo} alt="Main Logo" style={{ width: '45%', height:'75%' ,animation:  'rotate360 0.18s linear infinite'}} />}
                    {/* {displayCircularProgress && <CircularProgress style={{ marginTop: "80px" }} />} */}
                    {!displayCircularProgress && displayedPrompt[0]==""  && <img src={Logo} alt="Main Logo" style={{ width: '45%', height:'75%' ,animation:  'slideInTop 1s'}} />}
                        <div className="my-4">
                        {!displayCircularProgress && <Typography variant="h6" style={{ textAlign: 'right' }}>{displayedPrompt[0]}</Typography>}
                        {!displayCircularProgress && <Typography variant="h6" style={{ textAlign: 'left' , marginTop : '30px' }}>{displayedPrompt[1]}</Typography>}
                        </div>

                    <IconButton
                        aria-label="Send"
                        onClick={handleSave}
                        disabled={!displaySaveButton}
                        style={{
                            position: 'absolute',
                            bottom: '8px',
                            right: '8px',
                         
                        }}
                        
                    >
                        <BookmarkIcon />
                    </IconButton>

                </Box>


                <footer style={{ display: 'flex', alignItems: 'center', }}>
                    <TextField
                        label="Enter News articles/headlines"
                        variant="outlined"
                        fullWidth
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        style={{ marginRight: '8px', animation:'slideInRight 1s' }}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                handleSubmit();
                            }
                        }}
                    />

                    <IconButton
                        aria-label="Send"
                        onClick={handleSubmit}
                        style = {{animation:'slideInLeft 1s'}}
                    >
                        <SendIcon style = {{color:'#3f51b5'}}/>
                    </IconButton>
                </footer>


            </Container>
        </>
    );
}

