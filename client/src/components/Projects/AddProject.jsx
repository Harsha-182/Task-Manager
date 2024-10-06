import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Alert, MenuItem, Select, Box } from '@mui/material';

const ProjectForm = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [formValues, setFormValues] = useState({
    projectName: '',
    status: '',
    startDate: '',
    endDate: '',
    description: '',
    allowTeamAccess: false,
  });

  useEffect(() => {
    if(alert.show){
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 3000);
    }
  },[alert.show])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { projectName, status, startDate, endDate, description } = formValues;

    if (!projectName || !status || !startDate || !endDate || !description) {
      setAlert({ show: true, type: 'error', message: 'All fields are required!' });
      return;
    }

    const newProject = {
      id: Date.now(),
      ...formValues,
    };

    const existingProjects = JSON.parse(localStorage.getItem('projects')) || [];
    const updatedProjects = [...existingProjects, newProject];
    localStorage.setItem('projects', JSON.stringify(updatedProjects));

    setAlert({ show: true, type: 'success', message: 'Project created successfully!' });

    setFormValues({
      projectName: '',
      status: '',
      startDate: '',
      endDate: '',
      description: '',
      allowTeamAccess: false,
    });
  };

  const handleCancel = () => {
    setFormValues({
      projectName: '',
      status: '',
      startDate: '',
      endDate: '',
      description: '',
      allowTeamAccess: false,
    });
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', padding: 3 }}>
      <h2>Create Project</h2>
      {showSuccessAlert && (
        <Alert severity={alert.type} sx={{ marginBottom: 2 }}>
          {alert.message}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Project Name"
          name="projectName"
          value={formValues.projectName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        
        <Select
          label="Status"
          name="status"
          value={formValues.status}
          onChange={handleChange}
          fullWidth
          margin="normal"
          displayEmpty
          required
        >
          <MenuItem value="">
            <em>Select Status</em>
          </MenuItem>
          <MenuItem value="Not Started">Not Started</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>

        <TextField
          label="Start Date"
          type="date"
          name="startDate"
          value={formValues.startDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="End Date"
          type="date"
          name="endDate"
          value={formValues.endDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={formValues.description}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              name="allowTeamAccess"
              checked={formValues.allowTeamAccess}
              onChange={handleChange}
              color="primary"
            />
          }
          label="Allow all team members to access this project"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProjectForm;
