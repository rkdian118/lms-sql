import PropTypes from 'prop-types';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project imports
import MainCard from './MainCard';

// ============================|| HOVER DATA CARD ||============================ //

const HoverDataCard = ({ title, type = 0, iconPrimary, primary, secondary, color, clickable }) => {
    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary !== undefined ? <IconPrimary fontSize="large" sx={{ width: 20, height: 20, color }} /> : null;

    const handleOpen = () => {
        clickable();
    };
    return (
        <MainCard
            sx={{ cursor: type !== 1 ? 'pointer' : 'not-allowed', boxShadow: '8', '&:hover': { boxShadow: '18' } }}
            onClick={handleOpen}
        >
            <Grid container justifyContent="space-between" direction="column" alignItems="center">
                {/* <Grid item sm={12}>
                    <Typography variant="h5" color="inherit">
                        {title}
                    </Typography>
                </Grid> */}
                <Grid item sm={12}>
                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1.75, mx: 'auto' }}>
                        {primaryIcon}
                        <Typography variant="h3">{primary}</Typography>
                    </Stack>
                </Grid>
                <Grid item sm={12}>
                    <Typography variant="body2" color="textSecondary">
                        {secondary}
                    </Typography>
                </Grid>
            </Grid>
        </MainCard>
    );
};

HoverDataCard.propTypes = {
    title: PropTypes.string,
    iconPrimary: PropTypes.object,
    primary: PropTypes.number,
    secondary: PropTypes.string,
    color: PropTypes.string
};

export default HoverDataCard;
