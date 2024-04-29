import PropTypes from 'prop-types';

// material-ui
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useNavigate } from 'react-router-dom';
import { DateRangeFilterSetup } from 'store/slices/commonAction';
import { dispatch } from 'store';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// project imports

// ============================|| HOVER DATA CARD ||============================ //

const StaticDataCard = ({
    startOfDate,
    endOfDate,
    type,
    title,
    isLoading,
    bgcolor,
    iconPrimary,
    primary = 0,
    secondary,
    color,
    clickable
}) => {
    const navigate = useNavigate();
    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary !== undefined ? <IconPrimary fontSize="large" sx={{ width: 20, height: 20, color }} /> : null;

    const onRedirectClick = (type) => {
        console.log('🚀 ~ onRedirectClick ~ type:', type);
        // clickable();
        // dispatch(DateRangeFilterSetup({ start: startOfDate, end: endOfDate }));
        // if (type === 1) {
        //     navigate('/leads');
        // } else if (type === 2) {
        //     navigate('/meetings');
        // } else if (type === 3) {
        //     navigate('/proposal');
        // }
    };
    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <MainCard
                    sx={{ cursor: 'not-allowed', boxShadow: '4', '&:hover': { boxShadow: '12' } }}
                    onClick={() => onRedirectClick(type)}
                >
                    <Grid container justifyContent="space-between" alignItems="flex-start">
                        {/* <Grid container justifyContent="space-between" direction="column" alignItems="flex-start"> */}
                        <Grid item sm={8}>
                            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mx: 'auto' }}>
                                {/* {primaryIcon} */}
                                <IconButton
                                    sx={{
                                        cursor: 'not-allowed',
                                        bgcolor,
                                        color,
                                        '& .MuiSvgIcon-root': { fontSize: '1rem' },
                                        fontSize: '12px',
                                        borderRadius: '10%'
                                    }}
                                    // size="large"
                                    aria-label="view icon"
                                >
                                    {primaryIcon}
                                </IconButton>
                                <Typography variant="h4" color="inherit" pl={1}>
                                    {title}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item sm={4}>
                            <Typography variant="h3" color="inherit" align="right" sx={{ my: 1, mx: 'auto' }}>
                                {primary}
                            </Typography>
                        </Grid>
                        {/* <Grid item sm={12}>
                    <Typography variant="body2" color="textSecondary">
                        {secondary}
                    </Typography>
                </Grid> */}
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

StaticDataCard.propTypes = {
    title: PropTypes.string,
    iconPrimary: PropTypes.object,
    primary: PropTypes.number,
    secondary: PropTypes.string,
    color: PropTypes.string
};

export default StaticDataCard;
