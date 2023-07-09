import React, { useState } from 'react';
import axios from 'axios';
import FileUploader from './components/FileUploader';
import SubmitButton from './components/SubmitButton';
import Slider from '@mui/material/Slider';
import { Box, Grid, Typography } from '@mui/material';

function App() {
  const [file, setFile] = useState(null);
  const [videoLength, setVideoLength] = useState(null);
  const [videoFilePath, setVideoFilePath] = useState(null);
  const [cutVideo, setCutVideo] = useState(null);
  const [selectedRange, setSelectedRange] = useState([0, 0]); // Default range

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = () => {
    const formData = new FormData(); 
    formData.append('file', file);
    axios.post('http://localhost:5000/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      setVideoLength(response.data.duration);
      setVideoFilePath(response.data.video_file_path);
      setSelectedRange([0, response.data.duration]); // Aquí cambiamos el rango seleccionado

      console.log("Video subido exitosamente");
    });
  };

  const cutFile = () => {
    const cutData = {
      video_file_path: videoFilePath,
      start: selectedRange[0],
      end: selectedRange[1]
    };

    axios.post('http://localhost:5000/api/cut-video', cutData).then(response => {
      setCutVideo(response.data);
      console.log("Video cortado exitosamente");
    });
  };

  return (
    <Grid container direction="column" minHeight="100vh">
      <Box 
        component="header" 
        bgcolor="blue" 
        color="white" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        py={2}
        style={{ height: '15%' }}
      >
        <Typography variant="h4">Video Cut</Typography>
      </Box>
      <Box
        component="main" 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        flexGrow={1}
        style={{ height: '70%', backgroundColor: '#f5f5f5' }}
      >
        {!videoLength && (
          <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            gap={2}
          >
            <FileUploader onFileChange={onFileChange} />
            <SubmitButton onSubmit={uploadFile} text="Upload" />
          </Box>
        )}
        
        {videoLength && (
          <Box 
            display="flex" 
            flexDirection="column" 
            justifyContent="center" 
            alignItems="center" 
            gap={2}
            style={{width:'50%'}}
          >
            <Slider
              value={selectedRange}
              onChange={(e, newValue) => setSelectedRange(newValue)}
              valueLabelDisplay="on"
              min={0}
              max={videoLength}
              getAriaValueText={(value) => `${Math.floor(value / 60)}:${(value % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 })}`}
              valueLabelFormat={(value) => `${Math.floor(value / 60)}:${(value % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 })}`}
            />
            <SubmitButton onSubmit={cutFile} text="Cut" />
          </Box>
        )}

        {cutVideo && <p>Video cortado con éxito</p>}
      </Box>
      <Box 
        component="footer" 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        py={2}
        style={{ height: '15%' }}
      >
        {cutVideo && <p>Video cortado con éxito</p>}
      </Box>
    </Grid>
  );
}

export default App;
