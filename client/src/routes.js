import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';

const NavRoutes = () => {
    return(
        <Router>
            <Routes>
                <Route path="/dashboard/*" Component={Dashboard}/>
            </Routes>
        </Router>
    )
};

export default NavRoutes;