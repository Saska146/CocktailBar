import React from 'react';
import { Typography } from '@mui/material';
import '../style.css'

export default function Footer(){
    return(
        <footer className='footer'>
            <Typography style={{fontSize: "16px"}}>&copy; {new Date().getFullYear()} Coctail Bar</Typography>
            <Typography style={{fontSize: "13px"}}>The website "Coctail Bar" is an online platform dedicated to cocktails and mixed drinks. It serves as a comprehensive resource for cocktail enthusiasts, bartenders, and anyone interested in mixing drinks.</Typography> 
        </footer>
    );
}