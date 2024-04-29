/* eslint-disable array-callback-return */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { ButtonBase, Tooltip } from '@mui/material';

// third-party
import { CSVLink } from 'react-csv';

// assets
import { IconDeviceFloppy } from '@tabler/icons';
import moment from 'moment';

// ==============================|| CSV Export ||============================== //

export const CSVExport = ({ data, filename, type }) => {
    // console.log('🚀 headers:', headers);
    // console.log('🚀 data:', data);
    const theme = useTheme();
    // const headers = [
    //     { label: 'S No', key: `${data?.leadStatusData?.status_name}` },
    //     { label: 'Lead Assigned Date', key: `${moment(data?.createdAt).format('DD-MMM-YYYY hh-mm a')}` },
    //     { label: 'Lead Source', key: `${data?.leadSourceData?.status_name}` },
    //     { label: 'Lead Type', key: `${data?.leadTypeData?.status_name}` },
    //     { label: 'Requirement Type', key: `${data?.reqTypeData?.status_name}` },
    //     { label: 'Country', key: `${data?.client_country}` },
    //     { label: 'Client Name', key: `${data?.client_name}` },
    //     { label: 'Email', key: `${data?.leadStatusData?.client_email}` },
    //     { label: 'LinkedIn', key: `${data?.leadStatusData?.client_linkedin}` },
    //     { label: 'Contact No.', key: `${data?.leadStatusData?.client_number}` },
    //     { label: 'WhatsApp No.', key: `${data?.leadStatusData?.client_whatsapp_num}` }
    // ];
    const headers = [
        'S No',
        'Lead Assigned Date',
        'Lead Source',
        'Lead Type',
        'Requirement Type',
        'Country',
        'Client Name',
        'Email',
        'Linkedin',
        'Contact No.',
        'WhatsApp No.'
    ];
    const array = [];
    const upworkArray = [];
    data.map((item, index) => {
        if (item?.leadTypeData?.status_name === 'Upwork') {
            upworkArray.push({
                'S No': index + 1,
                'Lead Assigned Date': moment(item?.createdAt).format('DD-MMM-YYYY hh-mm a'),
                'Lead Source': item?.leadSourceData?.status_name,
                'Lead Type': item?.leadTypeData?.status_name,
                'Requirement Type': item?.reqTypeData?.status_name,
                Country: item?.client_country,
                'Client Name': item?.client_name,
                Email: item?.client_email,
                Linkedin: item?.client_linkedin,
                'Contact No.': item?.client_number,
                'WhatsApp No.': item?.client_whatsapp_num,
                Address: item?.address
            });
        } else {
            array.push({
                'S.No.': index + 1,
                'Lead Assigned Date': moment(item?.createdAt).format('DD-MMM-YYYY hh-mm a'),
                'Lead Source': item?.leadSourceData?.status_name,
                'Lead Type': item?.leadTypeData?.status_name,
                'Requirement Type': item?.reqTypeData?.status_name,
                Country: item?.client_country,
                'Client Name': item?.client_name,
                Email: item?.client_email,
                Linkedin: item?.client_linkedin,
                'Contact No.': item?.client_number,
                'WhatsApp No.': item?.client_whatsapp_num,
                Address: item?.address
            });
        }
    });
    // console.log('🚀array:', array);
    return (
        <Tooltip title={type === 1 ? 'Email & LinkedIn Leads Export' : 'Upworks Leads Export'} placement="top">
            <ButtonBase sx={{ mt: 0 }}>
                <CSVLink data={type === 1 ? array : upworkArray} filename={type === 1 ? filename : `Upworks ${filename}`}>
                    <IconDeviceFloppy
                        color={type === 1 ? theme.palette.secondary.main : theme.palette.primary.main}
                        aria-label="Export CSV File"
                    />
                </CSVLink>
            </ButtonBase>
        </Tooltip>
    );
};
CSVExport.propTypes = {
    data: PropTypes.object,
    filename: PropTypes.string
};
