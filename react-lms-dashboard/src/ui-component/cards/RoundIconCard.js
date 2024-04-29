import PropTypes from 'prop-types';

// material-ui
import { Grid, IconButton, Stack, Typography } from '@mui/material';

// project imports
import MainCard from './MainCard';
import { styled } from '@mui/material/styles';

// ============================|| ROUND ICON CARD ||============================ //
const IconWrapper = styled('div')({
    position: 'absolute',
    left: '-17px',
    bottom: '-27px',
    color: '#fff',
    transform: 'rotate(25deg)',
    '&> svg': {
        width: '100px',
        height: '100px',
        opacity: '0.35'
    }
});

const RoundIconCard = ({ primary, secondary, content, iconPrimary, color, bgcolor }) => {
    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

    return (
        <MainCard sx={{ boxShadow: '4', '&:hover': { boxShadow: '12' } }}>
            <Grid container alignItems="center" spacing={0} justifyContent="space-between">
                <Grid item>
                    <Stack spacing={1}>
                        <Typography variant="h3">{secondary}</Typography>
                        <Typography variant="h5" color="inherit">
                            {primary}
                        </Typography>
                        <Typography variant="subtitle2" color="inherit">
                            {content}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item>
                    <IconButton
                        sx={{ bgcolor, color, '& .MuiSvgIcon-root': { fontSize: '1.5rem' }, cursor: 'not-allowed' }}
                        size="large"
                        aria-label="view icon"
                    >
                        {primaryIcon}
                    </IconButton>
                </Grid>
            </Grid>
        </MainCard>
    );
};

RoundIconCard.propTypes = {
    primary: PropTypes.string,
    secondary: PropTypes.string,
    content: PropTypes.string,
    iconPrimary: PropTypes.object,
    color: PropTypes.string,
    bgcolor: PropTypes.string
};

export default RoundIconCard;
