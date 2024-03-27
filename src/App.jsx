import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import './css/style.css';
import './css/styles.css';

import './charts/ChartjsConfig';
import Sidebar from './partials/Sidebar';
import Header from './partials/Header';
// Import pages
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import DashboardAdmin from './pages/DashboardAdmin';
import Users from './pages/users/Users';
import Buildings from './pages/buildings/buildings';
import PostsList from './pages/posts/PostsList';
import { useSelector } from 'react-redux';
import New from './pages/posts/New';

function App() {
  const location = useLocation();
  const currentUser = useSelector((state) => {return state.users.curentUser});
const navigate = useNavigate()
  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); 

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
 {currentUser && location.pathname !== "/sign-in" && (
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}  
              <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">  
      {currentUser && location.pathname !== "/sign-in" && (
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}   
        <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
          {currentUser ? null : <Route path="/sign-in" element={<SignIn />} /> }
          {currentUser ? <Route path="/users" element={<Users />} /> : null}
          {currentUser ? <Route path="/buildings" element={<Buildings />} /> : null}
          {currentUser ? <Route path="/posts" element={<PostsList />} /> : null}
          {currentUser ? <Route path="/new" element={<New />} /> : null}

        </Routes>
      </div>
    </div>
  );
}

export default App;
