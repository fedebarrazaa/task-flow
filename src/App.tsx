import { DesingLoginPage } from './pages/auth/login/LoginPage'
import { DesingRegisterPage } from './pages/auth/register/RegisterPage'
import { DesingDashboard } from './pages/dashboard/DashboardPage'

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App(){
  return(
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<DesingLoginPage />}/>
      <Route path='/register' element={<DesingRegisterPage />}/>
      <Route path='/dashboard' element={<DesingDashboard />}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;