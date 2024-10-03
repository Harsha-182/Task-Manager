import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DatabaseRouter from './components/Routes/DatabaseRouter';
import LocalStorageRouter from './components/Routes/LocalStorageRouter';

const NavRoutes = () => {
    return(
        <Router>
            <Routes>
                <Route path="/database/*" Component={DatabaseRouter}/>
                <Route path="/localstorage/*" Component={LocalStorageRouter}/>
            </Routes>
        </Router>
    )
};

export default NavRoutes;