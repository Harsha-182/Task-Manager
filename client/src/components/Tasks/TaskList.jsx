import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
  TablePagination, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Select, MenuItem, LinearProgress, Grid, IconButton, Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchTasks, updateTask, deleteTask, reorderTasks } from '../actions/TasksAction';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.Task.tasks);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({});

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (task, index) => {
    setSelectedTask(index);
    setUpdatedTask(task);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpdateTask = () => {
    dispatch(updateTask(updatedTask, selectedTask));
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteTask = (index) => {
    dispatch(deleteTask(index));
  };

  const handleMarkCompleted = (task, index) => {
    const updatedTask = { ...task, status: 'Completed' };
    dispatch(updateTask(updatedTask, index));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);
    
    dispatch(reorderTasks(reorderedTasks));
  };

  const getStatusValueAndColor = (status) => {
    switch (status) {
      case 'Pending':
        return { value: 25, color: 'blue' };
      case 'Not Started':
        return { value: 0, color: 'red' };
      case 'In Progress':
        return { value: 50, color: 'orange' };
      case 'Completed':
        return { value: 100, color: 'green' };
      default:
        return { value: 0, color: 'gray' };
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        View Tasks
      </Typography>
      {tasks.length > 0 ? (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <TableContainer
                  component={Paper}
                  sx={{
                    maxHeight: 400,
                    marginTop: 4,
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #e0e0e0',
                  }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <Table stickyHeader sx={{ minWidth: 650 }} aria-label="task table">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#1976d2' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>Completed</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Company</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Project</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Task</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Task Created On</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task, index) => {
                        const { value, color } = getStatusValueAndColor(task.status);
                        return (
                          <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                            {(provided) => (
                              <TableRow
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f2f2f2' } }} // Alternating row color
                              >
                                <TableCell>
                                  <Checkbox
                                    checked={task.status === 'Completed'}
                                    onChange={() => handleMarkCompleted(task, index)}
                                  />
                                </TableCell>
                                <TableCell>{task.companyName}</TableCell>
                                <TableCell>{task.projectName}</TableCell>
                                <TableCell>{task.taskName}</TableCell>
                                <TableCell>
                                  <Grid container direction="column" alignItems="center">
                                    <Typography variant="body2">{task.status}</Typography>
                                    <LinearProgress
                                      variant="determinate"
                                      value={value}
                                      sx={{
                                        width: '100px',
                                        height: '10px',
                                        borderRadius: '5px',
                                        backgroundColor: '#e0e0e0',
                                        '& .MuiLinearProgress-bar': { backgroundColor: color },
                                      }}
                                    />
                                  </Grid>
                                </TableCell>
                                <TableCell>{task.createdOn}</TableCell>
                                <TableCell>
                                  <Button variant="contained" color="primary" onClick={() => handleOpenDialog(task, index)}>
                                    Update
                                  </Button>
                                  <IconButton onClick={() => handleDeleteTask(index)} color="error">
                                    <DeleteIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Droppable>
          </DragDropContext>

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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Company"
            name="companyName"
            value={updatedTask.companyName || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Project"
            name="projectName"
            value={updatedTask.projectName || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Task"
            name="taskName"
            value={updatedTask.taskName || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <Select
            label="Status"
            name="status"
            value={updatedTask.status || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Not Started">Not Started</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
          <TextField
            label="Task Created On"
            name="createdOn"
            value={updatedTask.createdOn || ''}
            fullWidth
            disabled
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateTask} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskList;
