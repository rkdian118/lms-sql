import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'ui-component/Logo';
import { dispatch } from 'store';
import { openPopupModel } from 'store/slices/menu';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
    const handleClick = () => {
        dispatch(openPopupModel({ openItemKey: '', modalState: false }));
    };
    return (
        <Link component={RouterLink} to={DASHBOARD_PATH} aria-label="berry logo" onClick={handleClick}>
            <Logo />
        </Link>
    );
};

export default LogoSection;
