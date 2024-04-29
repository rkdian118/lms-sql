import PropTypes from 'prop-types';
import { memo } from 'react';
import newRFPmenu from '../../../../menu-items/newRFPmenu';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    linearProgressClasses
} from '@mui/material';
import NavGroup from 'layout/MainLayout/MenuList/NavGroup/newIndex';

const CardStyle = styled(Card)(({ theme }) => ({
    marginBottom: '5px',
    marginTop: '5px',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#ffffff'
}));

// ==============================|| SIDEBAR - MENU CARD ||============================== //

const MenuCard = () => {
    const theme = useTheme();
    const navItems = newRFPmenu.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });
    return (
        <CardStyle>
            <CardContent
                style={{ paddingBottom: '0px' }}
                sx={{
                    padding: '15px'
                }}
            >
                <Typography variant="h4" align="left">
                    RFP
                </Typography>
                <CardStyle>
                    <List sx={{ m: 0, display: 'contents' }}>
                        <ListItem sx={{ p: 0, display: 'contents' }}>{navItems}</ListItem>
                    </List>
                </CardStyle>
            </CardContent>
        </CardStyle>
    );
};

export default memo(MenuCard);
