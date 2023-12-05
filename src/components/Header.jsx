import { AppBar, Typography, Toolbar, Tabs, Tab } from "@mui/material";
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { useState } from "react";
import { Link } from 'react-router-dom';
import '../style.css';


export default function Header() {
    const [value, setValue] = useState();

    return(
        <header className="header"> 
            <Toolbar>
            <LocalBarIcon />
            <Tabs textColor='inherit' value={value} onChange={(e, value)=> setValue(value)} indicatorColor="secondary">
                <Tab label='Cocktail Bar' component={Link} to="/"/>
                <Tab label='Categories' component={Link} to="/categories"/>
                <Tab label='Available Glasses' component={Link} to="/glasses"/>
                <Tab label='Ingredients' component={Link} to="/ingredients"/>
                <Tab label='Basic Filtering' component={Link} to="/bartender-beginner"/>
            </Tabs>
            </Toolbar>
        </header>
    );
}