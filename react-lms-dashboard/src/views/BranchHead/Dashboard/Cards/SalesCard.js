import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material';

// =============================|| REVENUE CARD ||============================= //

const SalesCard = ({ primary, secondary, content, iconPrimary, color }) => {
    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

    return (
        <Card sx={{ background: color, position: 'relative', color: '#fff', boxShadow: '4', '&:hover': { boxShadow: '12' } }}>
            <CardContent>
                <Typography
                    variant="body2"
                    sx={{
                        position: 'absolute',
                        right: 13,
                        top: 14,
                        color: '#fff',
                        '&> svg': { width: 100, height: 100, opacity: '0.5' },
                        [theme.breakpoints.down('sm')]: {
                            top: 13,
                            '&> svg': { width: 80, height: 80 }
                        }
                    }}
                >
                    {primaryIcon}
                </Typography>
                <Grid container direction={matchDownXs ? 'column' : 'row'} spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h4" color="inherit">
                            {primary}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3" color="inherit" sx={{ my: 1.75, mx: 'auto' }}>
                            {secondary}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="inherit">
                            {content}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

SalesCard.propTypes = {
    primary: PropTypes.string,
    secondary: PropTypes.string,
    content: PropTypes.string,
    iconPrimary: PropTypes.object,
    color: PropTypes.string
};

export default SalesCard;
