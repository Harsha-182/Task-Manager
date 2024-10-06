import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import AddTask from './Tasks/AddTask';
import Appbar from './Appbar';
import TaskList from './Tasks/TaskList';
import UnauthorizedModal from './UnAuthorizedModal';
import AdminGrid from './AdminGrid';
import AddUser from './Users/AddUser';
import AddProject from './Projects/AddProject';

function Dashboard(props) {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole');
    const requestedUrl = window.location.pathname;
    const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);
    const [message, setMessage] = useState('');


    const adminAccess = ['/dashboard/', '/dashboard/addtask', '/dashboard/viewtask',
        '/dashboard/admin/adduser', '/dashboard/admin/addproject'
    ];
    const userAccess = ['/dashboard/user/'];

    const preferredLocation = (role) => {
        console.log("role1", role)
        console.log("requestedUrl", requestedUrl)
        if(role === 'admin' && adminAccess.includes(requestedUrl)) {
            navigate(requestedUrl);
        } else if(role === 'user' && userAccess.includes(requestedUrl)) {
            navigate(requestedUrl);
        } else {
            setShowUnauthorizedModal(true);
            setMessage('You do not have access to this page.')
        }
    }

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
                {userRole === 'admin'? 
                    <Route element={showUnauthorizedModal? false: 
                        <Appbar 
                            items = {['Dashboard', 'Project', 'Add Task', 'View Task', 'Users']}
                            role={userRole}/>}
                        >
                        <Route path="/" Component={AdminGrid} />
                        <Route path="/addtask" Component={AddTask}/>
                        <Route path="/viewtask" Component={TaskList}/>
                        <Route path="/admin/adduser" Component={AddUser}/>
                        <Route path="/admin/addproject" Component={AddProject}/>
                    </Route>
                 :  
                    <Route element={showUnauthorizedModal? false: 
                        <Appbar items = {['Dashboard', 'Add Task', 'View Task']} role={userRole}/>}>
                        <Route path="/user/" Component={TaskList} />
                    </Route>
                }
            </Routes>
            <UnauthorizedModal showModal={showUnauthorizedModal} onClose={closeModal} message={message} />
        </div>
    );
}

export default Dashboard;