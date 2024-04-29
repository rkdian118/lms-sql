import React from 'react';
import { Avatar, Grid } from '@mui/material';

const ProfileAvatar = ({ file }) => {
    const [preview, setPreview] = React.useState(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        // console.log(file, "file in onLoad");
        if (!file) {
            // console.log("inside !file");
            setPreview(null);
        } else if (!file.name.match(/\.(jpg|jpeg|png|svg|svg+xml|JPG|JPEG|PNG|SVG|SVG+XML)$/)) {
            // console.log("inside not-match");
            setPreview(null);
        } else {
            // console.log("inside setFile");
            setPreview(reader.result);
        }
    };
    return (
        <>
            {preview && (
                <Avatar
                    alt="preview"
                    src={preview}
                    // sx={{
                    //     width: '130px',
                    //     height: '130px',
                    //     border: '3px solid #98528d'
                    // }}
                    sx={{ width: 150, height: 150, margin: '0 auto' }}
                    outline
                    color="success"
                />
            )}
        </>
    );
};

export default ProfileAvatar;
