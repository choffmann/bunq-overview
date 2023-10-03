import {AppBar, Box, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {useAppBar} from "../../context/AppBarContext.tsx";
import {KeyboardArrowLeft} from "@mui/icons-material";
import {useEffect} from "react";

interface TopAppBarProps {

}

const TopAppBar = ({}: TopAppBarProps) => {
    const appBar = useAppBar()

    useEffect(() => {
        return () => appBar.navBar.close()
    }, []);

    const NavIcon = () => {
        switch (appBar.navIcon.variant) {
            case "menu":
                return <MenuIcon/>
            case "navigation":
                return <KeyboardArrowLeft/>
        }
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}
                        onClick={() => appBar.navIcon.onClick()}
                    >
                        <NavIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1}}
                    >
                        {appBar.title}
                    </Typography>
                    {appBar.search.visible &&
                        <IconButton color="inherit">
                            <SearchIcon/>
                        </IconButton>
                    }
                </Toolbar>
                {appBar.loading.isLoading && <LinearProgress/>}
            </AppBar>
        </Box>
    )
}

export default TopAppBar