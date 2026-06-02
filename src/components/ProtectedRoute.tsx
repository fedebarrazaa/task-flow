import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabase'

const ProtectedRoute = ({redirectTo = '/dashboard' }) => {
  const [sesion, setSesion] = useState<boolean | null>(null); //GUARDO LA SESION

  useEffect(()=> {
    const checkSesion = async() => {
      const { data } = await supabase.auth.getSession() 
      if (data.session){
        setSesion(true)
      } else {
        setSesion(false)
      }
    }
    checkSesion()
  }, []); //NO DEPENDE DE NADA POR ESO ESTA VACIO

  // Si no cumple la condición, redirige
  if (sesion === null) {
    return <div>Esta cargando...</div>;
  } else if (sesion === false) {
    return <Navigate to={redirectTo} replace/>
  } else if (sesion === true) {
    return <Outlet />;
  }// Si está autorizado, renderiza los componentes hijos
  
  
};

export default ProtectedRoute;

