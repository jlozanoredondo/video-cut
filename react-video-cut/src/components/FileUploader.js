import { Button } from '@mui/material';
import React from 'react';

const FileUploader = ({ onFileChange }) => (
  <Button 
    variant="contained"
    component="label"
    sx={{ margin: '20px' }} // Proporcionar margen
  >
    Upload File
    <input
      type="file"
      hidden
      onChange={onFileChange}
    />
  </Button>
);

export default FileUploader;
