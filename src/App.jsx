import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext'; // Adjust the import path as needed
import Layout from './Layout';
import Home from './pages/Home';
import Plans from './pages/Plans';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import About from './pages/About';

// Create a wrapper component to access location and pass currentPageName
function AppContent() {
  const location = useLocation();
  
  // Determine current page name based on path
  const getPageName = (path) => {
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/register')) return 'Register';
    if (path.includes('/plans')) return 'Plans';
    if (path.includes('/about')) return 'About';
    return 'Home';
  };

  const currentPageName = getPageName(location.pathname);

  return (
    <Layout currentPageName={currentPageName}>
      <Routes>
        {/* Main routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        
        {/* GitHub Pages routes with /MTC prefix */}
        <Route path="/MTC" element={<Home />} />
        <Route path="/MTC/" element={<Home />} />
        <Route path="/MTC/home" element={<Home />} />
        <Route path="/MTC/plans" element={<Plans />} />
        <Route path="/MTC/register" element={<Register />} />
        <Route path="/MTC/dashboard" element={<Dashboard />} />
        <Route path="/MTC/about" element={<About />} />
        
        {/* Catch all - redirect to Home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>  {/* Add AuthProvider here */}
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;