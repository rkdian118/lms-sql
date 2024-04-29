import { Outlet } from 'react-router-dom';

// project imports
import Customization from '../Customization';
import { DEV_CUSTOMIZE } from 'config';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
    <>
        <Outlet />
        {/* <Customization /> */}
        {DEV_CUSTOMIZE ? <Customization /> : ''}
    </>
);

export default MinimalLayout;
