import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Drawer, Fab, Grid, IconButton, Tooltip } from '@mui/material';
import { IconSettings } from '@tabler/icons';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import BorderRadius from './BorderRadius';
import Layout from './Layout';
import PresetColor from './PresetColor';
import FontFamily from './FontFamily';
import InputFilled from './InputFilled';
import BoxContainer from './BoxContainer';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// ==============================|| LIVE CUSTOMIZATION ||============================== //

const Customization = () => {
    const theme = useTheme();

    // drawer on/off
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <>
            {/* toggle button */}
            <Tooltip title="Live Customize">
                <Fab
                    component="div"
                    onClick={handleToggle}
                    size="medium"
                    variant="circular"
                    color="secondary"
                    sx={{
                        borderRadius: 0,
                        borderTopLeftRadius: '50%',
                        borderBottomLeftRadius: '50%',
                        borderTopRightRadius: '50%',
                        borderBottomRightRadius: '4px',
                        top: '25%',
                        position: 'fixed',
                        right: 10,
                        zIndex: 1200,
                        boxShadow: theme.customShadows.secondary
                    }}
                >
                    <AnimateButton type="rotate">
                        <IconButton color="inherit" size="large" disableRipple aria-label="live customize">
                            <IconSettings />
                        </IconButton>
                    </AnimateButton>
                </Fab>
            </Tooltip>

            <Drawer
                anchor="right"
                onClose={handleToggle}
                open={open}
                PaperProps={{
                    sx: {
                        width: 280
                    }
                }}
            >
                {open && (
                    <PerfectScrollbar component="div">
                        <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                            {/* layout type */}
                            <Grid item xs={12}>
                                <Layout />
                            </Grid>
                            {/* font family */}
                            <Grid item xs={12}>
                                <FontFamily />
                            </Grid>
                            {/* Theme Preset Color */}
                            <Grid item xs={12}>
                                <PresetColor />
                            </Grid>
                            {/* border radius */}
                            <Grid item xs={12}>
                                {/* <BorderRadius /> */}
                            </Grid>
                            {/* filled with outline textfield */}
                            <Grid item xs={12}>
                                {/* <InputFilled /> */}
                            </Grid>
                            {/* box container */}
                            <Grid item xs={12}>
                                {/* <BoxContainer /> */}
                            </Grid>
                        </Grid>
                    </PerfectScrollbar>
                )}
            </Drawer>
        </>
    );
};

export default Customization;
