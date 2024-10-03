import { Routes, Route } from 'react-router-dom';
import AddTask from '../LocalStorageTask/AddTask';
import LocalStorageAppbar from '../Appbar/LocalStorageAppbar';
import TaskList from '../LocalStorageTask/TaskList';
import UpdateTask from '../LocalStorageTask/UpdateTask';

function LocalStorageRouter(props) {

    return (
        <Routes>
            <Route element={<LocalStorageAppbar/>}>
                <Route path="/addtask" Component={AddTask} />
                <Route path="/viewtask" Component={TaskList} />
                <Route path="/assigntask" Component={UpdateTask} />
            </Route>
        </Routes>
    );
}

export default LocalStorageRouter;