import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import AddTask from './Tasks/AddTask';
import Appbar from './Appbar';
import TaskList from './Tasks/TaskList';
import UnauthorizedModal from './UnAuthorizedModal';
import MainGrid from './MainGrid';
import AddUser from './Users/AddUser';
import AddProject from './Projects/AddProject';

const Dashboard = () => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole');
    const requestedUrl = window.location.pathname;
    const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);
    const [message, setMessage] = useState('');


    const adminAccess = ['/dashboard/', '/dashboard/addtask', '/dashboard/viewtask',
        '/dashboard/admin/adduser', '/dashboard/admin/addproject'
    ];
    const userAccess = ['/dashboard/', '/dashboard/viewtask', '/dashboard/addtask'];

    const preferredLocation = (role) => {
        if(role === 'admin' && adminAccess.includes(requestedUrl)) {
            navigate(requestedUrl);
        } else if(role === 'user' && userAccess.includes(requestedUrl)) {
            navigate(requestedUrl);
        } else {
            setShowUnauthorizedModal(true);
            setMessage('You do not have access to this page.')
        }
    }

    const sideNavItems = 
        userRole === 'admin'?
            ['Dashboard', 'Project', 'Add Task', 'View Task', 'Users'] :
            ['Dashboard', 'Add Task', 'View Task']

    useEffect(() => {
        const accessToken = localStorage.getItem('authToken');
        if(accessToken) {
            if(userRole) {
                preferredLocation(userRole);
            } else {
                setShowUnauthorizedModal(true);
                setMessage('Your Role is not assigned yet.')
            }
        } else {
            navigate('/login');
        }
    }, [])

    const closeModal = () => {
        setShowUnauthorizedModal(false);
        navigate('/login');
    };

    return (
        <div>
            <Routes>
                <Route element={showUnauthorizedModal? false: 
                    <Appbar 
                        items = {sideNavItems}
                        role={userRole}/>}
                    >
                    <Route exact path="/" Component={MainGrid} />
                    <Route path="/addtask" Component={AddTask}/>
                    <Route path="/viewtask" Component={TaskList}/>
                    <Route path="/admin/adduser" Component={AddUser}/>
                    <Route path="/admin/addproject" Component={AddProject}/>
                </Route>
            </Routes>
            <UnauthorizedModal showModal={showUnauthorizedModal} onClose={closeModal} message={message} />
        </div>
    );
}

export default Dashboard;