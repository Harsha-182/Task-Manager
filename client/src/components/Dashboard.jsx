import { Routes, Route } from 'react-router-dom';
import AddTask from './Tasks/AddTask';
import Appbar from './Appbar';
import TaskList from './Tasks/TaskList';

function Router(props) {

    return (
        <Routes>
            <Route element={<Appbar/>}>
                <Route path="/addtask" Component={AddTask} />
                <Route path="/viewtask" Component={TaskList} />
                {/* <Route path="/assigntask" Component={UpdateTask} /> */}
            </Route>
        </Routes>
    );
}

export default Router;