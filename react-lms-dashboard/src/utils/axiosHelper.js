import axios from 'axios';
import { BASE_PATH } from 'config';
import { Navigate } from 'react-router-dom';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';

const axiosApiHelper = async (requestMethod, BaseUrl, body) => {
    const auth = localStorage.getItem('adminToken');
    try {
        // const response = await axios.post(`${PROXY}create-manager`, data);
        const response = await axios({
            method: requestMethod,
            url: BaseUrl,
            data: body,
            config: (axios.defaults.headers.common.Authorization = `Bearer ${auth}`)
        });
        // console.log('🚀api response:', response);
        if (response.status === 207 && response.data.succeeded === false) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: response.data.ResponseMessage,
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    transition: 'Fade',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' }
                })
            );
            // window.location.replace(BASE_PATH);
            // window.location.href = BASE_PATH;
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminRole');
            setTimeout(() => {
                window.location.replace(BASE_PATH);
            }, 2000);
        }
        return response;
    } catch (error) {
        dispatch(
            openSnackbar({
                open: true,
                message: error?.response?.data?.ResponseMessage,
                variant: 'alert',
                alert: {
                    color: 'error'
                },
                transition: 'Fade',
                anchorOrigin: { vertical: 'top', horizontal: 'right' }
            })
        );
        return error?.response;
    }
};

export default axiosApiHelper;
