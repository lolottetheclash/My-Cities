import { ChangeEvent } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { IconButton, Input, makeStyles } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { PhotoCamera } from '@material-ui/icons';

import { ITravel, TravelProp } from '../../stores/TravelStore';

import './NewTravel.css';
// Move MUI styles
const useStyles = makeStyles({
  title: { width: '300px', marginTop: '30px ' },
  description: {
    marginTop: '30px ',
  },
  nextButton: {
    margin: '10px',
  },
  download: { width: '20px', height: '20px' },
  deleteIcon: {
    color: 'red',
    cursor: 'pointer',
    alignSelf: 'center',
    marginRight: '10px',
  },
  paper: {
    display: 'flex',
    padding: '0 0 20px 20px',
  },
});

const getSteps = () => {
  return ['Travel Description', 'Travel Images'];
};

interface ILocalState {
  activeStep: number;
  setActiveStep: (step: number) => void;
  travel: ITravel;
  setTravel: (label: TravelProp, value: string) => void;
}

const NewTravel = observer(
  (): JSX.Element => {
    const classes = useStyles();
    const localState: ILocalState = useLocalObservable(() => ({
      activeStep: 0,
      setActiveStep: (step) => {
        localState.activeStep = step;
      },
      travel: {
        title: '',
        city: '',
        description: '',
        pictures: [],
        author: '',
      },
      setTravel: (label, value) => {
        if (label === 'pictures') {
          localState.travel.pictures?.push(value);
        } else {
          localState.travel[label] = value;
        }
      },
    }));

    const handleChange = (label: TravelProp) => (
      e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      localState.setTravel(label, e.target.value);
    };

    const getStepContent = (step: number) => {
      switch (step) {
        case 0:
          return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Input
                id="title-input"
                placeholder="Title"
                onChange={handleChange('title')}
                className={classes.title}
              />
              <Input
                id="description-input"
                placeholder="Description"
                onChange={handleChange('description')}
                multiline
                rows="5"
                className={classes.description}
              />
            </div>
          );
        case 1:
          return (
            <div>
              <span>Add some pictures</span>
              <label htmlFor="icon-button-file">
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  hidden
                />
                <IconButton color="primary" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>
          );
        default:
          return 'Unknown step';
      }
    };

    const steps = getSteps();

    const handleNext = () => {
      localState.setActiveStep(localState.activeStep + 1);
    };

    const handleBack = () => {
      localState.setActiveStep(localState.activeStep - 1);
    };

    const handleReset = () => {
      localState.setActiveStep(0);
    };

    const handleSave = () => {
      console.log('save');
    };

    return (
      <div className="stepper-container">
        <div className="stepper">
          <Stepper activeStep={localState.activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  {getStepContent(index)}
                  <div className="stepper-buttons">
                    <Button
                      disabled={localState.activeStep === 0}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.nextButton}
                    >
                      Next
                    </Button>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {localState.activeStep === steps.length && (
            <Paper square elevation={0} className={classes.paper}>
              <DeleteForeverIcon
                onClick={handleReset}
                className={classes.deleteIcon}
              />
              <Button onClick={handleBack}>Back</Button>
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                className={classes.nextButton}
              >
                Save
              </Button>
            </Paper>
          )}
        </div>
      </div>
    );
  }
);

export default NewTravel;
