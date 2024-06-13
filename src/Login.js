// pages/login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, googleProvider, facebookProvider, microsoftProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import BackgroundSlideshow from './components/BackgroundSlideshow';


//-------------MUI Imports--------------------//
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


//------------ LOGO imports-------------------//
import GoogleLogo from './images/google_logo.png'
import MicrosoftLogo from './images/Microsoft_logo.png'
import FacebookLogo from './images/facebook_logo.png'
import ImageButton from './components/ImageButton';



const Login = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isMidSizedScreens = useMediaQuery(theme.breakpoints.down('md'));
    const isLargeSizedScreens = useMediaQuery(theme.breakpoints.down('lg'));
    

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/home');
        } catch (err) {
            console.log(err);
        }
    };

    const signInWithFacebook = async () => {
        try {
            await signInWithPopup(auth, facebookProvider);
            navigate('/home');
        } catch (err) {
            console.log(err);
        }
    };

    // const signInWithMicrosoft = async () => {
    //     try {
    //         await signInWithPopup(auth, microsoftProvider);
    //         navigate('/home');
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    if (loading) return <div>Loading...</div>;
    if (user) navigate('/home');

    return (
        <>
            <BackgroundSlideshow />
            <div>
                <Card  sx={{ alignSelf: 'center' , marginX: isMobile? 5: isMidSizedScreens? 25: isLargeSizedScreens?40: 60,  marginY: isMobile? 15:isMidSizedScreens? 20: 25, backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(5px)', borderRadius: 5 }} elevation={3} >
                    <CardContent>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                            <Stack marginTop={2}>
                                {/*project logo goes here */}
                            </Stack>

                            <Typography variant="h2" gutterBottom marginTop={3} color="#7169dd">
                                Login
                            </Typography>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                                Sign in Using
                                <Divider />
                                <div>

                                    <ImageButton
                                        src={GoogleLogo}
                                        alt="Google"
                                        onClick={signInWithGoogle}

                                    />

                                    {/* <ImageButton
                                        src={MicrosoftLogo}
                                        alt="Microsoft"
                                        onClick={signInWithMicrosoft}

                                    /> */}

                                    <ImageButton
                                        src={FacebookLogo}
                                        alt="Facebook"
                                        onClick={signInWithFacebook}

                                    />
                                </div>


                            </div>
                        </div>
                    </CardContent>
                 
                </Card>
            </div>
        </>
    );
};


export default Login;
