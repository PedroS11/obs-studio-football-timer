import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import StopIcon from '@mui/icons-material/Stop';
import { Divider, TextField } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from "react";

export default function App() {
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  const handleMinutesChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setMinutes(parseInt(event.target.value) || 0);
  };

  const handleSecondsChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSeconds(parseInt(event.target.value) || 0);
  };

    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    useEffect(() => {
        let interval:NodeJS.Timer;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!running) {
            // @ts-ignore
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

  return (
      <Container maxWidth="sm" >
        <Typography variant="h4" component="h1" gutterBottom>
          {Math.floor(time / 60 /1000).toString().padStart(2, '0')}:{Math.floor(time /1000 % 60).toString().padStart(2, '0')}
        </Typography>
        <Stack direction="row" spacing={2} sx={{marginBottom: "16px"}}>
          <Button variant="outlined" endIcon={<StopIcon />} onClick={() => {
              setRunning(false);
            setTime(0);
          }}>
            Reset
          </Button>
          <Button variant="outlined" endIcon={<StopIcon />} onClick={() => {
              setRunning(false);
            setTime(2700000);
          }}>
            2nd half
          </Button>
          <Button variant="contained" endIcon={running? <PauseIcon />: <PlayArrowIcon/>} onClick={() => {
              setRunning(!running)
          }}>
            {running? "Pause": "Resume"}
          </Button>
        </Stack>
        <Divider />
        <Typography variant="h5" component="h1" gutterBottom sx={{marginTop: "10px", marginBottom: "10px"}}>
          Set specific game time
        </Typography>
        <Box>
          <TextField
              id="outlined-number"
              label="Minutes"
              type="number"
              inputProps={{
                step:1,
                min: 0,
                max: 200
              }}
              defaultValue={minutes}
              onChange={handleMinutesChange}
              sx={{
                marginRight: "20px"
              }}
          />
          <TextField
              id="outlined-number"
              label="Seconds"
              type="number"
              inputProps={{
                step: 1,
                min: 0,
                max: 59
              }}
              defaultValue={seconds}
              onChange={handleSecondsChange}
          />
        </Box>
        <Button variant="outlined" endIcon={<SaveIcon />} onClick={() => {
          setRunning(false);
          setTime((minutes * 60 * 1000) + (seconds * 1000));
        }} sx={{marginTop: "10px"}}>
          Update time
        </Button>
      </Container>
  );
}
