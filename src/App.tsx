import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import StopIcon from '@mui/icons-material/Stop';
import { Divider, styled, TextField } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from "react";
import { formatTime } from "./utils";

const HALF_TIME_IN_MILLISECONDS = 2700000 // 45 minutes in milliseconds

const ButtonsRow = styled(Stack)`
  margin-bottom: 16px;
`

const SetTimeTypography = styled(Typography)`
  padding: 10px 0;
`

const UpdateTimeButton = styled(Button)`
  margin-top: 16px;
`

const InputNumber = styled(TextField)`
  margin-right: 20px;
`

export default function App() {
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [referenceTime, setReferenceTime] = useState(Date.now());

    const handleMinutesChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setMinutes(parseInt(event.target.value) || 0);
    };

    const handleSecondsChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSeconds(parseInt(event.target.value) || 0);
    };

    const pauseResumeHandler = () => {
        if(!isRunning) {
            setReferenceTime(Date.now)
        }
        setIsRunning(!isRunning)
    }

    const resetHandler = () => {
        setIsRunning(false);
        setTime(0);
    }

    const secondHalfHandler = () => {
        setIsRunning(false);
        setTime(HALF_TIME_IN_MILLISECONDS);
    }

    const updateTimeHandler = () => {
        setIsRunning(false);
        setTime((minutes * 60 * 1000) + (seconds * 1000));
    }

    useEffect(() => {
        let interval:NodeJS.Timer;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    const now = Date.now();
                    const interval = now - referenceTime;

                    setReferenceTime(now);
                    return prevTime + interval;
                });
            }, 1);
        } else if (!isRunning) {
            // @ts-ignore
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [time, isRunning]);

  return (
      <Container maxWidth="sm" >
        <Typography variant="h4" component="h1" gutterBottom>
          {formatTime(Math.floor(time / 60 /1000))}:{formatTime(Math.floor(time /1000 % 60))}
        </Typography>
        <ButtonsRow direction="row" spacing={2}>
          <Button variant="outlined" endIcon={<StopIcon />} onClick={resetHandler}>
            Reset
          </Button>
          <Button variant="outlined" endIcon={<StopIcon />} onClick={secondHalfHandler}>
            2nd half
          </Button>
          <Button variant="contained" endIcon={isRunning? <PauseIcon />: <PlayArrowIcon/>} onClick={pauseResumeHandler}>
            {isRunning? "Pause": "Resume"}
          </Button>
        </ButtonsRow>
        <Divider />
        <SetTimeTypography variant="h5" gutterBottom>
          Set specific game time
        </SetTimeTypography>
        <Box>
          <InputNumber
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
          />
          <InputNumber
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
        <UpdateTimeButton variant="outlined" endIcon={<SaveIcon />} onClick={updateTimeHandler}>
          Update time
        </UpdateTimeButton>
      </Container>
  );
}
