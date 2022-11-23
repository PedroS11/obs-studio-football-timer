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

export default function App() {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [currentTimeInSeconds, setCurrentTimeInSeconds] = React.useState<number>(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  const handleMinutesChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setMinutes(parseInt(event.target.value) || 0);
  };

  const handleSecondsChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSeconds(parseInt(event.target.value) || 0);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      if(isPlaying) {
        setCurrentTimeInSeconds(currentTimeInSeconds + 0.2);
      }
    }, 200);

    return () => clearInterval(timer);
  }, [currentTimeInSeconds, isPlaying])

  return (
      <Container maxWidth="sm" >
        <Typography variant="h4" component="h1" gutterBottom>
          {Math.floor(currentTimeInSeconds / 60).toString().padStart(2, '0')}:{Math.floor(currentTimeInSeconds % 60).toString().padStart(2, '0')}
        </Typography>
        <Stack direction="row" spacing={2} sx={{marginBottom: "16px"}}>
          <Button variant="outlined" endIcon={<StopIcon />} onClick={() => {
            setIsPlaying(false);
            setCurrentTimeInSeconds(0);
          }}>
            Reset
          </Button>
          <Button variant="outlined" endIcon={<StopIcon />} onClick={() => {
            setIsPlaying(false);
            setCurrentTimeInSeconds(2700);
          }}>
            2nd half
          </Button>
          <Button variant="contained" endIcon={isPlaying? <PauseIcon />: <PlayArrowIcon/>} onClick={() => {
            setIsPlaying(!isPlaying)
          }}>
            {isPlaying? "Pause": "Resume"}
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
          setIsPlaying(false);
          setCurrentTimeInSeconds(minutes * 60 + seconds);
        }} sx={{marginTop: "10px"}}>
          Update time
        </Button>
      </Container>
  );
}
