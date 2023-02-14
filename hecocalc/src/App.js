import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard'

// Temp pages
import Results from './pages/Results';
import Uploads from './pages/Uploads';

function App() {
  return (
    <Router>
       <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          {/* <Route path='/settings' element={<Settings />} /> */}
          {/* <Route path='/snapshots' element={<Snapshots/>} /> */}

          {/* Temp pages */}
          <Route path='/results' element={<Results />}/>
          <Route path='/uploads' element={<Uploads />} />
      </Routes>
    </Router>
  );
}

export default App;
