import PropTypes from 'prop-types';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

// styles

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const TotalIncomeDarkCard = ({ isLoading, title, amount, bgColor, textColor, shapeColor }) => {
    const theme = useTheme();

    const CardWrapper = styled(MainCard)(({ theme }) => ({
        backgroundColor: bgColor,
        color: '#000000',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: 100,
            height: 100,
            // background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
            background: `linear-gradient(25deg, ${shapeColor} 42.98%, rgb(144 202 249 / 0%) 72.49%)`,
            borderRadius: '50%',
            top: -56,
            right: -35
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: 100,
            height: 100,
            background: `linear-gradient(15deg, ${shapeColor} 59.98%, rgba(144, 202, 249, 0) 77.58%)`,
            // background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
            borderRadius: '50%',
            top: 20,
            right: -35
        }
    }));

    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2 }}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45,
                                        pl: 2
                                    }}
                                    primary={
                                        <Typography variant="h4" sx={{ color: textColor }}>
                                            {title}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="subtitle2" sx={{ color: textColor, mt: 0.25 }}>
                                            {amount}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TotalIncomeDarkCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalIncomeDarkCard;
