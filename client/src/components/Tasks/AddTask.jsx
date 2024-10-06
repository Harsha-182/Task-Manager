import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import { MenuItem, Select } from '@mui/material';

import { fetchUser } from '../actions/UserAction';
import { fetchTasks } from '../actions/TasksAction';

const useStyles = makeStyles((theme) => ({
  rootCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    width: '800px',
    padding: '20px',
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
  projectId: '',
  description: '',
  status: 'In Progress',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_PROJECT':
      return {
        ...state,
        projectName: action.payload.projectName,
        projectId: action.payload.projectId,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const AddTask = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [taskCreatedOn, setTaskCreatedOn] = useState('');
  const [projects, setProjects] = useState([]);

  const [state, dispatcher] = useReducer(reducer, initialState);

  const user = useSelector((state) => state.User);
  const tasks = useSelector((state) => state.Task.tasks);

  useEffect(() => {
    if(user.userList){
        let storedProjects = localStorage.getItem('projects');

        if(user.userList.role === 'admin' && storedProjects){
            setProjects(JSON.parse(storedProjects));
        }
        else if(user.userList.role === 'user'){
            const userProjectIds = 
                tasks
                  .filter(task => task.assignTo && task.assignTo === user.userList.id)
                  .map(task => task.projectId)
                        
            let userProjectList = JSON.parse(storedProjects).filter(project =>
                [...new Set(userProjectIds)].includes(project.id)
            );
            setProjects(userProjectList);
        }
    }
},[tasks, user])  

useEffect(() => {
  dispatch(fetchTasks());
  dispatch(fetchUser());
}, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("projects?.projectName,", projects)
    const taskData = {
      id: '_' + Math.random().toString(36).substr(2, 9),
      projectId: state.projectId,
      assignTo: user.userList.role === 'admin'? state.assignTo : user.userList?.id,
      projectName: state.projectName,
      taskName: state.taskName,
      description: state.description,
      status: state.status,
      createdOn: new Date().toLocaleDateString(),
    };

    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    existingTasks.push(taskData);

    localStorage.setItem('tasks', JSON.stringify(existingTasks));

    dispatcher({ type: 'RESET' });
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setTaskCreatedOn(formattedDate.split('-').reverse().join('-'));
  }, []);

  return (
    <>
      {
       (user?.userList?.role === 'user' && projects.length == 0) ?
          "You cannot add a task as no projects have been assigned to you." 
          :
          <Box style={{ display: 'flex', flexDirection: 'column'}}
            sx={{ maxWidth: 500, margin: 'auto', padding: 3 }}>
          <h2>Add Task</h2>
              <form className={classes.formContainer} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      select
                      className={classes.inputField}
                      id="project"
                      label="Project"
                      variant="outlined"
                      fullWidth
                      required
                      value={state.projectName}
                      onChange={(e) => {
                        const selectedProject = projects.find(
                          (project) => project.projectName === e.target.value
                        );
                        if (selectedProject) {
                          dispatcher({
                            type: 'SET_PROJECT',
                            payload: {
                              projectName: selectedProject.projectName,
                              projectId: selectedProject.id,
                            },
                          });
                        }
                      }}
                    >
                      {projects.map((project) => (
                        <MenuItem key={project.id} value={project.projectName}>
                          {project.projectName}
                        </MenuItem>
                      ))}
                    </TextField>
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
                      onChange={(e) => dispatcher({ type: 'SET_FIELD', field: 'taskName', value: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.inputField}
                      id="description"
                      label="Description"
                      variant="outlined"
                      multiline
                      rows={4}
                      fullWidth
                      required
                      value={state.description}
                      onChange={(e) => dispatcher({ type: 'SET_FIELD', field: 'description', value: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      className={classes.inputField}
                      id="status"
                      value={state.status}
                      onChange={(e) => dispatcher({ type: 'SET_FIELD', field: 'status', value: e.target.value })}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Not Started">Not Started</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{ marginBottom: '20px' }}
                      className={classes.inputField}
                      id="taskCreatedOn"
                      label="Task Created On"
                      variant="outlined"
                      value={taskCreatedOn}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      required
                      disabled
                      onChange={(e) => setTaskCreatedOn(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  className={classes.submitButton}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
        </Box>
      }
    </>
  );
};

export default AddTask;
