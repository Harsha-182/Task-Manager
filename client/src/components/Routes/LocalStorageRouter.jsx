import { Routes, Route } from 'react-router-dom';
import AddTask from '../LocalStorageTask/AddTask';
import LocalStorageAppbar from '../Appbar/LocalStorageAppbar';

function LocalStorageRouter(props) {

    return (
        <Routes>
            <Route element={<LocalStorageAppbar/>}>
                <Route path="/add" Component={AddTask} />
            </Route>
        </Routes>
    );
}

export default LocalStorageRouter;