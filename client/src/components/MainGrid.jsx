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
    const [taskSum, setTaskSum] = useState('');

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchTasks());
    }, [dispatch]);

    useEffect(() => {
        if(user.userList){
            let storedProjects = localStorage.getItem('projects');

            if(user.userList.role === 'admin' && storedProjects){
                setProjects(JSON.parse(storedProjects));
                setTaskSum(Array.from(tasks))
            }
            else if(user.userList.role === 'user' && storedProjects){
                const userProjectIds =
                    tasks
                      .filter(task => task.assignTo && task.assignTo === user.userList.id)
                      .map(task => task.projectId)
                
                    setTaskSum(userProjectIds)
                
                let userProjectList = JSON.parse(storedProjects).filter(project =>
                    [...new Set(userProjectIds)].includes(project.id)
                );
                setProjects(userProjectList);
            }
        }
    },[tasks, user])

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
            Welcome
            <span style={{ fontWeight: 'bold', color: '#e87716', marginLeft: '8px' }}>{(user?.userList?.name).toUpperCase()}</span>!
      </Typography>

      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="project progress table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Id</TableCell>
              <TableCell>Project</TableCell>
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
                {/* <TableCell>
                  <LinearProgress variant="determinate" value={project.progress} />
                  <Typography variant="body2" sx={{ marginTop: 1 }}>{`${project.progress}% Complete`}</Typography>
                </TableCell> */}
                <TableCell>
                <Typography
                  variant="body2"
                  sx={{
                    padding: '6px 12px',
                    backgroundColor: project.status === 'On-Progress' ? '#4caf50' : '#2196f3',
                    color: 'white',
                    borderRadius: '20px',
                    display: 'inline-block',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
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
                {taskSum.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
