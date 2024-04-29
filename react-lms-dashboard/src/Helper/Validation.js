import WordIcon from 'assets/Icons/word-icon.png';
import PDFIcon from 'assets/Icons/pdf-icon.png';
import ExcelIcon from 'assets/Icons/excel-icon.png';
import PPTIcon from 'assets/Icons/ppt-icon.png';
import { addDays, addMonths, endOfMonth, startOfMonth, subDays } from 'date-fns';

export const fileTypeIcons = {
    'application/pdf': PDFIcon,
    'application/msword': WordIcon,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': WordIcon,
    'application/vnd.ms-excel': ExcelIcon,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ExcelIcon,
    'application/vnd.ms-powerpoint': PPTIcon,
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': PPTIcon,
    'text/csv': ExcelIcon
};

export const DateRangeFilter = [
    {
        label: 'Today',
        value: [new Date(), new Date()],
        placement: 'left'
    },
    {
        label: 'Yesterday',
        value: [addDays(new Date(), -1), addDays(new Date(), -1)],
        placement: 'left'
    },
    {
        label: 'Last 7 Days',
        value: [new Date(new Date() - 7 * 24 * 60 * 60 * 1000), new Date()],
        placement: 'left'
    },
    {
        label: 'Current month',
        value: [startOfMonth(new Date()), new Date()],
        placement: 'left'
    },
    {
        label: 'Last 30 days',
        value: [subDays(new Date(), 29), new Date()],
        placement: 'left'
    },
    {
        label: 'Previous month',
        value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
        placement: 'left'
    },
    {
        label: 'Last 3 Months',
        value: [new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1), new Date()],
        placement: 'left'
    },
    {
        label: 'Last 6 Months',
        value: [new Date(new Date().getFullYear(), new Date().getMonth() - 5, 1), new Date()],
        placement: 'left'
    },
    {
        label: 'Current Year',
        value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
        placement: 'left'
    }
];

export const IMAGES_FILE_SUPPORTED_FORMATS = [
    'image/jpg',
    'image/png',
    'image/jpeg',
    'image/JPG',
    'image/JPEG',
    'image/PNG',
    'image/svg',
    'image/svg+xml',
    'imag/SVG+XML',
    'image/SVG'
];

export const FILE_SUPPORTED_FORMATS = [
    'application/pdf',
    'application/msword',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv' // Add CSV support
];

export const months = [
    { label: 'January' },
    { label: 'February' },
    { label: 'March' },
    { label: 'April' },
    { label: 'May' },
    { label: 'June' },
    { label: 'July' },
    { label: 'August' },
    { label: 'September' },
    { label: 'October' },
    { label: 'November' },
    { label: 'December' }
];

export const handleKeyBlock = (e) => {
    if (e.key === '+' || e.key === '.' || e.key === '-' || e.key === 'e') {
        e.preventDefault();
    }
};
