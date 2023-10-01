import {AppBar, Box, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {useAppBar} from "../../context/AppBarContext.tsx";

interface TopAppBarProps {

}

const TopAppBar = ({}: TopAppBarProps) => {
    const appBar = useAppBar()
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
                        onClick={() => appBar.navBar.open()}
                    >
                        <MenuIcon/>
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