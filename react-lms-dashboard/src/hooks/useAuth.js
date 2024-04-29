// auth provider
import { useSelector } from 'react-redux';
// ==============================|| AUTH HOOKS ||============================== //

const useAuth = () => {
    const auth = useSelector((state) => state.admin);

    return auth;
};

export default useAuth;
