// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://www.webmobril.com/" target="_blank" underline="hover">
            WebMobril Technologies
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://www.wmgamingstudioz.com/" target="_blank" underline="hover">
            &copy; wmgamingstudioz.com
        </Typography>
    </Stack>
);

export default AuthFooter;
