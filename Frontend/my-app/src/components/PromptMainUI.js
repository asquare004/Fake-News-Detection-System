import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useAuth } from '../AuthProvider';

//----------ICONS--------------------//
import SendIcon from '@mui/icons-material/Send';
import BookmarkIcon from '@mui/icons-material/Bookmark';


//---FETCHING DATA LOGIC------------//
const fetchData = async (data) => {
    try {
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: { data } }) // Data to be sent in the request body
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
    const [displayedPrompt, setDisplayedPrompt] = useState('');
    const [displaySaveButton, setDisplaySaveButton] = useState(false);
    const { user } = useAuth();

    const handleSubmit = async () => {
        let response = { data: { data: "" }, response: "" };
        let finalReponse = "";
        if (prompt != "") {
            response = await fetchData(prompt);
            finalReponse = user.displayName + ": " + response.data.data + "\n" + "AI: " + response.response;
        }

        setDisplayedPrompt(finalReponse);
        if (prompt != "")
            setDisplaySaveButton(true);
        else
            setDisplaySaveButton(false);

        setPrompt('');
    };

    const handleSave = () => {
        console.log("saved");
        console.log(displayedPrompt);
        setDisplaySaveButton(false);
    };


    return (
        <>
            <Container maxWidth="sm" style={{ marginTop: '50px', textAlign: 'center' }}>

                <Box
                    sx={{
                        border: '1px solid #ccc',
                        padding: '16px',
                        borderRadius: '8px',
                        minHeight: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        overflowY: 'auto',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        backgroundColor: '#f5f5f5',
                        position: 'relative'
                    }}
                    style={{ whiteSpace: 'pre-line' }}
                >
                    <Typography variant="h6">{displayedPrompt || 'Give news articles to Hypervion!'}</Typography>

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


                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        label="Enter your prompt"
                        variant="outlined"
                        fullWidth
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        style={{ marginRight: '8px' }}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                handleSubmit();
                            }
                        }}
                    />

                    <IconButton
                        aria-label="Send"
                        onClick={handleSubmit}
                    >
                        <SendIcon />
                    </IconButton>
                </div>


            </Container>
        </>
    );
}

