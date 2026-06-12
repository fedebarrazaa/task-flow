import { DesingLoginPage } from './pages/auth/login/LoginPage'
import { DesingRegisterPage } from './pages/auth/register/RegisterPage'
import { DesingDashboard } from './pages/dashboard/DashboardPage'
import { BoardPageDesing } from './pages/board/BoardPage'
import  ProtectedRoute  from './components/ProtectedRoute'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App(){
  return(
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<DesingLoginPage />}/>
      <Route path='/register' element={<DesingRegisterPage />}/>
        <Route element={<ProtectedRoute />}>
        <Route path='/dashboard' element={<DesingDashboard />}/>
        <Route path='/board/:id' element={<BoardPageDesing/>}/>
        </Route>
     </Routes>
    </BrowserRouter>
  );
}

export default App;