import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
  TablePagination, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Select, MenuItem, LinearProgress, Grid, IconButton, Checkbox, FormControl
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { fetchTasks, updateTask, deleteTask, reorderTasks } from '../actions/TasksAction';
import { fetchUser, fetchUserFromDB } from '../actions/UserAction';

const TaskList = () => {
  const dispatch = useDispatch();

  const allTasks = useSelector((state) => state.Task.tasks);
  const user = useSelector((state) => state.User);
  const userStatus = useSelector((state) => state.GetUsers);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({});
  const [userList, setUserList] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
      if(user.userList){
        let data = user?.userList?.role === 'admin'? 
          allTasks :
          allTasks.filter(task => task.assignTo && task.assignTo === user.userList.id);
        setTasks(data)
      }
  },[allTasks, user])

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUser());
    dispatch(fetchUserFromDB());
  }, []);

  useEffect(() => {
    if (userStatus && userStatus.status === 'success') {
        setUserList(userStatus.data.users);
    }
  }, [userStatus]);

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

  const handleAssignTo = (e, index) => {
    const {  value } = e.target;

    const taskToUpdate = {
      ...tasks[index],
      assignTo: value,
    };
    // setSelectedTask(index);
    setUpdatedTask(taskToUpdate);
    dispatch(updateTask(taskToUpdate, index));
  }

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200, 
        overflowY: 'auto',
      },
    },
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
                      <TableRow sx={{ backgroundColor: '#1976d2'}}>
                        <TableCell sx={{ fontWeight: 'bold' }}>Completed</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Project</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Task</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Task Created On</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Assigned To</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
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
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                  <Checkbox
                                    checked={task.status === 'Completed'}
                                    onChange={() => handleMarkCompleted(task, index)}
                                  />
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>{task.projectName}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>{task.taskName}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>{task.description}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>
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
                                <TableCell sx={{ fontWeight: 'bold' }}>{task.createdOn}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>
                                  <FormControl>
                                    {
                                      userList.length > 0 ? (
                                        <Select
                                          value={task.assignTo || ""}
                                          onChange={(e) => handleAssignTo(e, index)}
                                          displayEmpty
                                          style={{width:'120px', height: '50px'}}
                                          disabled={user?.userList?.role === 'user'}
                                          MenuProps={MenuProps}
                                        >
                                          <MenuItem value="">
                                            <em>Assign to user</em>
                                          </MenuItem>
                                          {userList.map((user) => (
                                            <MenuItem key={user.id} value={user.id}>
                                              {user.first_name} {user.last_name}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      ) : (
                                        <p>Loading...</p>
                                      )
                                    }
                                  </FormControl>
                                </TableCell>
                                <TableCell>
                                  <Button variant="contained" color="primary" onClick={() => handleOpenDialog(task, index)}>
                                    Update
                                  </Button>
                                </TableCell>
                                <TableCell>
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
            label="Project"
            name="projectName"
            value={updatedTask.projectName || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            disabled={user?.userList?.role === 'user'}
          />
          <TextField
            label="Task"
            name="taskName"
            value={updatedTask.taskName || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            disabled={user?.userList?.role === 'user'}
          />
          <TextField
            label="Desription"
            name="description"
            value={updatedTask.description || ''}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
            margin="dense"
            disabled={user?.userList?.role === 'user'}
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
