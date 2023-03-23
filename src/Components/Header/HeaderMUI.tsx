import React from 'react';
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const HeaderMui = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Task Scheduler
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>

        </AppBar>
    );
};

