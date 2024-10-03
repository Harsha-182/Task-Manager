import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, Grid, Select, MenuItem } from '@mui/material';

const EditTaskForm = ({ taskId }) => {
  const [taskData, setTaskData] = useState({
    companyName: '',
    projectName: '',
    taskName: '',
    status: '',
    createdOn: '',
  });

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);

    const taskToEdit = storedTasks.find((task, index) => index === taskId); // Assuming taskId is the index
    if (taskToEdit) {
      setTaskData(taskToEdit);
    }
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    const updatedTasks = tasks.map((task, index) => (index === taskId ? taskData : task));
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save updated tasks to localStorage
  };

  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        Edit Task
      </Typography>
      <Card sx={{ maxWidth: 400, marginTop: 4 }}>
        <CardContent>
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Company"
                  name="companyName"
                  value={taskData.companyName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Project"
                  name="projectName"
                  value={taskData.projectName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Task"
                  name="taskName"
                  value={taskData.taskName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  name="status"
                  value={taskData.status}
                  onChange={handleChange}
                  fullWidth
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Status
                  </MenuItem>
                  <MenuItem value="Not Started">Not Started</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Task Created On"
                  name="createdOn"
                  value={taskData.createdOn}
                  onChange={handleChange}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdate}
                >
                  Update Task
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default EditTaskForm;
