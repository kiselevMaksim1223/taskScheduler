import React, {useState} from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useAppDispatch, useAppSelector} from "../../Store/Store";
import {logOutTC} from "../../State/auth-reducer";
import {Logout} from "@mui/icons-material";

export const HeaderMui = () => {

    const isLoginIn = useAppSelector<boolean>(state => state.auth.isLoginIn)
    const userID = useAppSelector<number | null>(state => state.app.userID)
    const dispatch = useAppDispatch()

    const onClickLogOutHandler = () => {
        dispatch(logOutTC())
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                {/*{isLoginIn && <Button color="inherit" onClick={onClickLogOutHandler}>LogOut</Button>}*/}
                {/*<Box>*/}
                {/*    <Avatar sx={{bgcolor: deepPurple[500]}}>{userName?.split("")[0]}</Avatar>*/}
                {/*    <Typography variant={"caption"}>{userName}</Typography>*/}
                {/*</Box>*/}
                {isLoginIn && <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ml: 2}}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{width: 32, height: 32}}>
                                TS
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>}
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                >
                    <MenuItem>
                        <Avatar/> Your ID:{userID}
                    </MenuItem>
                    <Divider/>
                    <MenuItem onClick={onClickLogOutHandler}>
                        <ListItemIcon>
                            <Logout fontSize="small"/>
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>

        </AppBar>
    );
};

