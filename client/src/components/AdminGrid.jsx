import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUser } from './actions/UserAction';
import { fetchTasks } from './actions/TasksAction';

import { Box, Typography, Table, TableBody, TableCell, TableContainer,
     TableHead, TableRow, Paper, LinearProgress, Grid, Card, CardContent } from '@mui/material';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.User);
    const tasks = useSelector((state) => state.Task.tasks);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchTasks());
    }, [dispatch]);

    useEffect(() => {
        const storedProjects = localStorage.getItem('projects');
        if (storedProjects) {
            setProjects(JSON.parse(storedProjects));
        }
    }, []);


  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
            Welcome {user?.userList?.name}!
      </Typography>

      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="project progress table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>#</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(projects) && projects.length > 0 ?(
            projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.id}</TableCell>
                <TableCell>{project.projectName}</TableCell>
                <TableCell>
                  <LinearProgress variant="determinate" value={project.progress} />
                  <Typography variant="body2" sx={{ marginTop: 1 }}>{`${project.progress}% Complete`}</Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      padding: '4px 8px',
                      backgroundColor: project.status === 'On-Progress' ? 'green' : 'blue',
                      color: 'white',
                      borderRadius: '4px',
                    }}
                  >
                    {project.status}
                  </Typography>
                </TableCell>
                <TableCell>{project.endDate}</TableCell>
              </TableRow>
            ))
            ):(<Typography>No projects available</Typography>)
            }
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container spacing={2} sx={{ marginTop: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Projects</Typography>
              <Typography variant="h4" color="primary">
                {projects.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Tasks</Typography>
              <Typography variant="h4" color="primary">
                {Array.from(tasks).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
