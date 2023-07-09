import { Button } from '@mui/material';
import React from 'react';

const SubmitButton = ({ onSubmit, text }) => (
  <Button 
    variant="contained" 
    color="primary" 
    onClick={onSubmit} 
    sx={{ margin: '20px' }} // Proporcionar margen
  >
    {text}
  </Button>
);

export default SubmitButton;
