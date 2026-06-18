import { useState } from 'react';
import style from './Login.module.css' //import css
import { Link, useNavigate } from 'react-router-dom'; //para el router
import { supabase } from '../../../lib/supabase';




export function DesingLoginPage(){
    //GUARDO LOS DATOS QUE PONEN EN INPUT CON useState y onChange: line 27 y 32
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 

    const navigate = useNavigate(); //queda vacio
    //
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>  {//conceccion de base de datos hasta la linea 29
            e.preventDefault(); //
    
            const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
    
        if (error) {
            console.log("Error:", error.message)
        } else {
            navigate('/dashboard') //reedirigue a la pagina del dashboard
        }
    
        }

    return(
        <div className={style.login_container}> 
            <section className={style.desing_section}>
         <h1 className={style.desing_h1}>Organiza proyectos, gestiona tareas y mantén el control de tu trabajo.</h1>
         <form className={style.desing_form} onSubmit={handleSubmit}>
            <div> 
                <p className={style.div_p}>〰️</p>
                <h1 className={style.div_h1}> Iniciar sesión </h1>
                <h3 className={style.div_h3}>Acceda a sus tareas, notas y proyectos en cualquier momento.</h3>
            </div>
            <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="Email"
            placeholder='Email'
            className={style.desing_email}></input>
            <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password" 
            placeholder='Contraseña'
            className={style.desing_pass}></input>
            <input 
            type="submit"
            value="Ingresa"
            className={style.desing_boton}
            ></input> 
            <Link to="/register" className={style.desing_link}>Crear cuenta</Link>
         </form>
        </section>
        </div>
        
    )
}