import PropTypes from 'prop-types';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Card, Grid, Typography, useMediaQuery } from '@mui/material';
import { dispatch } from 'store';
import { DateRangeFilterSetup, LeadStatusRedirection, SelectedBdeDataFilter } from 'store/slices/commonAction';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TotalIncomeCard from './Skeleton/TotalIncomeCard';
import moment from 'moment';
// =============================|| SIDE ICON CARD ||============================= //

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

const SideIconCard = ({
    bdeData = '',
    startOfDate,
    endOfDate,
    isLoading,
    id,
    iconPrimary,
    primary,
    secondary,
    secondarySub,
    color,
    bgcolor
}) => {
    // console.log('🚀 ~ bdeData:', bdeData);
    // console.log('🚀startOfDate: icon', startOfDate);
    // console.log('🚀endOfDate: icon', endOfDate);
    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    // const { getDashboardLoading } = useSelector((state) => state.businessAction);

    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary !== undefined ? <IconPrimary /> : null;

    // const startMonthDate = moment(startOfDate?.bdTargets?.month_start_date).format('YYYY-MM-DD');
    // const endMonthDate = moment().format('YYYY-MM-DD');

    const onRedirectionLead = () => {
        dispatch(LeadStatusRedirection({ leadtype: secondary, leadStatusId: id }));
        dispatch(DateRangeFilterSetup({ start: startOfDate, end: endOfDate }));
        dispatch(SelectedBdeDataFilter({ bdId: bdeData }));
        navigate('/leads');
    };

    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <Card
                    sx={{
                        bgcolor: bgcolor || '',
                        position: 'relative',
                        cursor: 'pointer',
                        boxShadow: '4',
                        '&:hover': { boxShadow: '12' }
                    }}
                    onClick={() => onRedirectionLead()}
                >
                    <IconWrapper>{primaryIcon}</IconWrapper>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item xs={4} sx={{ background: color, py: 3.5, px: 0 }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    textAlign: 'center',
                                    color: '#fff',
                                    '& > svg': {
                                        width: 32,
                                        height: 32
                                    }
                                }}
                                align="center"
                            >
                                {primaryIcon}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid
                                container
                                direction="column"
                                justifyContent="space-between"
                                spacing={1}
                                alignItems={matchDownXs ? 'center' : 'flex-start'}
                            >
                                <Grid item sm={12}>
                                    <Typography
                                        variant="h3"
                                        sx={{ cursor: 'pointer', color: bgcolor ? '#fff' : '', ml: 2 }}
                                        onClick={() => onRedirectionLead()}
                                    >
                                        {primary}
                                    </Typography>
                                </Grid>
                                <Grid item sm={12}>
                                    <Typography
                                        variant="body2"
                                        align="left"
                                        sx={{ cursor: 'pointer', color: bgcolor ? '#fff' : 'grey.700', ml: 2 }}
                                        onClick={() => onRedirectionLead()}
                                    >
                                        {secondary} <span style={{ color }}>{secondarySub}</span>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            )}
        </>
    );
};

SideIconCard.propTypes = {
    iconPrimary: PropTypes.object,
    primary: PropTypes.string,
    secondary: PropTypes.string,
    secondarySub: PropTypes.string,
    color: PropTypes.string,
    bgcolor: PropTypes.string
};

export default SideIconCard;
