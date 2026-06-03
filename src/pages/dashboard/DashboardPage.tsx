import { useEffect, useState } from 'react';
import style from './dashboard.module.css' //import css
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';


export function DesingDashboard(){
    const [name, setName] = useState<string| null>(null); //GUARDO LOS DATOS DEL USUARIO
    const navigate = useNavigate(); //DERIGIRE A LA PAGINA QUE QUIERA 
   
    //LOGICA PARA MOSTRAR EL NOMBRE DEL USUARIO
    useEffect(()=> {
        const checkUser = async() => {
        const {data} = await supabase.auth.getUser({})
        if(data.user.user_metadata.full_name) {
            setName(data.user.user_metadata.full_name)
        } else {
            setName(null)
        }
     }
     checkUser()
    },[])
    
    //LOGICA PARA LE BOTON SALIR Y VOLVER A LA PAGE PRINCIPAL
    const handleLogout = async() => {
        const {error} = await supabase.auth.signOut({})
        if (error) {
            console.log('error: salir')
        } else{
            navigate('/')
        }
    }
    return(
        <section className={style.section_dashboard}> 
            <header className={style.header_desing}>  
                <h1>{name ?? 'Cargando..'}</h1>
                <button 
                type="submit"
                onClick={handleLogout}
                className={style.header_boton}
                >Salir</button>
            </header>

        </section>
        
    )
}
