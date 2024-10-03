import { Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import DatabaseTask from '../DatabaseTask/AddTask';
import DatabaseAppbar from '../Appbar/DatabaseAppbar';

function DatabaseRouter(props) {

    return (
        <Routes>
            <Route element={<DatabaseAppbar/>}>
                <Route path="/add" element={<DatabaseTask/>} />
            </Route>
        </Routes>
    );
}

export default DatabaseRouter;