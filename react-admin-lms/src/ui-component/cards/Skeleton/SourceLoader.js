// material-ui
import { Card, List, ListItem, ListItemAvatar, ListItemText, Skeleton, Typography } from '@mui/material';
import MainCard from '../MainCard';
import { useTheme, styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Grid } from 'rsuite';
import { gridSpacing } from 'store/constant';

// ==============================|| SKELETON - TOTAL INCOME DARK/LIGHT CARD ||============================== //

const CardWrapper = styled(MainCard)(({ theme }) => ({
    display: 'flex',
    margin: '10px',
    overflow: 'hidden',
    position: 'relative'
}));
const SourceLoader = () => (
    <>
        <CardWrapper border={false} content={false}>
            <Box>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12} lg={12} sx={{ '&.MuiGrid-root': { py: '10px', my: 1 } }}>
                        <Skeleton variant="text" width="100%" height={30} />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} sx={{ '&.MuiGrid-root': { py: '10px', my: 1 } }}>
                        <Skeleton variant="text" width="100%" height={30} />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} sx={{ '&.MuiGrid-root': { py: '10px', my: 1 } }}>
                        <Skeleton variant="text" width="100%" height={30} />
                    </Grid>
                </Grid>
            </Box>
        </CardWrapper>
    </>
);

export default SourceLoader;
