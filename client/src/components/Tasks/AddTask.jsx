import React, {useState, useEffect, useReducer} from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import { MenuItem, Select } from '@mui/material';


const useStyles = makeStyles((theme) => ({
  rootCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    width: '800px',
    padding: '20px',
    // margin: '20px',
  },
  formContainer: {
    width: '100%',
  },
  inputField: {
    marginBottom: '20px',
    width: '100%',
  },
  submitButton: {
    marginTop: '20px',
    width: '100%',
  },
}));

  const initialState = {
    taskName: '',
    projectName: '',
    companyName: '',
    status: 'In Progress',
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_FIELD':
        return { ...state, [action.field]: action.value };
      case 'RESET':
        return initialState;
      default:
        return state;
    }
  };

const AddTask = () => {
  const classes = useStyles();

  const [taskCreatedOn, setTaskCreatedOn] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = () => {
    const taskData = {
      id: '_' + Math.random().toString(36).substr(2, 9),
      taskName: state.taskName,
      projectName: state.projectName,
      companyName: state.companyName,
      status: state.status,
      createdOn: new Date().toLocaleDateString(),
    };

    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    existingTasks.push(taskData);

    localStorage.setItem('tasks', JSON.stringify(existingTasks));
    
    dispatch({ type: 'RESET' });
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setTaskCreatedOn(formattedDate.split('-').reverse().join('-'));
  }, []);

  return (
    <Box style={{display: 'flex',alignItems: 'center', flexDirection: 'column'}}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Task
      </Typography>
      <Card className={classes.rootCard}>
        <CardContent>
          <form className={classes.formContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className={classes.inputField}
                  id="company"
                  label="Company"
                  variant="outlined"
                  fullWidth
                  required
                  value={state.companyName}
                  onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'companyName', value: e.target.value })}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.inputField}
                  id="project"
                  label="Project"
                  variant="outlined"
                  fullWidth
                  required
                  value={state.projectName}
                  onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'projectName', value: e.target.value })}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.inputField}
                  id="task"
                  label="Task"
                  variant="outlined"
                  fullWidth
                  required
                  value={state.taskName}
                  onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'taskName', value: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                    className={classes.inputField}
                    id="status"
                    value={state.status}
                    onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'status', value: e.target.value })}
                    >
                    <MenuItem value="Completed">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Not Started">Not Started</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{marginBottom: '20px'}}
                  className={classes.inputField}
                  id="taskCreatedOn"
                  label="Task Created On"
                  variant="outlined"
                //   type="date"
                  value={taskCreatedOn}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                  onChange={(e) => setTaskCreatedOn(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              className={classes.submitButton}
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddTask;
