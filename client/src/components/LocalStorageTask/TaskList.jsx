import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination, Box
} from '@mui/material';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        View Tasks
      </Typography>
      {tasks.length > 0 ? (
        <>
          <TableContainer 
            component={Paper} 
            sx={{
              maxHeight: 400,
              marginTop: 4,
              backgroundColor: '#f9f9f9',
              border: '1px solid #e0e0e0'
            }}
          >
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="task table">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1976d2' }}>
                  <TableCell sx={{fontWeight: 'bold' }}>Company</TableCell>
                  <TableCell sx={{fontWeight: 'bold' }}>Project</TableCell>
                  <TableCell sx={{fontWeight: 'bold' }}>Task</TableCell>
                  <TableCell sx={{fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{fontWeight: 'bold' }}>Task Created On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((task, index) => (
                  <TableRow 
                    key={index}
                    sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f2f2f2' } }} // Alternating row color
                  >
                    <TableCell>{task.companyName}</TableCell>
                    <TableCell>{task.projectName}</TableCell>
                    <TableCell>{task.taskName}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>{task.createdOn}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={tasks.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </>
      ) : (
        <Typography variant="body1" component="p" sx={{ marginTop: 4 }}>
          No tasks available. Please add some tasks.
        </Typography>
      )}
    </Box>
  );
};

export default TaskList;
