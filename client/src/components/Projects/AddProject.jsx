import React, { useState, useEffect } from 'react';

import { TextField, Button, Checkbox, FormControlLabel, 
    Alert, MenuItem, Select, Box, Typography } from '@mui/material';

const AddProject = () => {
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
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (alert.show) {
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    }
  }, [alert.show]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formValues.projectName) {
      newErrors.projectName = 'Project name is required.';
    }
    
    if (!formValues.status) {
      newErrors.status = 'Status is required.';
    }
    
    if (!formValues.startDate) {
      newErrors.startDate = 'Start date is required.';
    }
    
    if (!formValues.endDate) {
      newErrors.endDate = 'End date is required.';
    }
    
    if (!formValues.description) {
      newErrors.description = 'Description is required.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setErrors({});

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
    setErrors({});
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
          style={{ marginBottom: '20px' }}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {errors.projectName && <Typography color="red" variant="caption">{errors.projectName}</Typography>}

        <Select
          label="Status"
          name="status"
          value={formValues.status}
          style={{ marginBottom: '20px' }}
          onChange={handleChange}
          fullWidth
          margin="normal"
          displayEmpty
        >
          <MenuItem value="">
            <em>Select Status</em>
          </MenuItem>
          <MenuItem value="Not Started">Not Started</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
        {errors.status && <Typography color="red" variant="caption">{errors.status}</Typography>}

        <TextField
          label="Start Date"
          type="date"
          name="startDate"
          value={formValues.startDate}
          style={{ marginBottom: '20px' }}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
        />
        {errors.startDate && <Typography color="red" variant="caption">{errors.startDate}</Typography>}

        <TextField
          label="End Date"
          type="date"
          name="endDate"
          value={formValues.endDate}
          style={{ marginBottom: '20px' }}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
        />
        {errors.endDate && <Typography color="red" variant="caption">{errors.endDate}</Typography>}

        <TextField
          label="Description"
          name="description"
          value={formValues.description}
          onChange={handleChange}
          style={{ marginBottom: '20px' }}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        {errors.description && <Typography color="red" variant="caption">{errors.description}</Typography>}

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

export default AddProject;
