
import { BrowserRouter as Router, Link, Route, Routes, useLocation,Navigate } from 'react-router-dom';
import AboutMe from '../AboutMe/AboutMe';
import PortData from '../portfolioinfo/PortData';
import Skills from '../Skills/Skills';

function Navbar() {
  const location = useLocation();
  
  // Helper function to check if path matches
  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar-container">
      <div className="navbar">
        <ul className='mainNav'>
          <li className={`navList ${isActive('/about') ? 'active' : ''}`}>
            <Link to="/about">About me</Link>
          </li>
          <li className={`navList ${isActive('/skills') ? 'active' : ''}`}>
            <Link to="/skills">Skills</Link>
          </li>
          <li className={`navList ${isActive('/projects') ? 'active' : ''}`}>
            <Link to="/projects">Projects</Link>
          </li>
        </ul>
      </div>
      
      <div className="tab-container">
        <Routes>
          <Route path="/about" element={<AboutMe/>} />
          <Route path="/skills" element={<Skills/>} />
          <Route path="/projects" element={<PortData />} />
          {/* Default route */}
          <Route path="/" element={<Navigate to="/about" replace />} />
        </Routes>
      </div>
    </div>
  );
}


export default Navbar