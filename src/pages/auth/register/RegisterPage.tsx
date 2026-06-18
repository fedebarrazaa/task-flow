import { useState } from 'react';
import style from './Register.module.css' //import css
import { Link, useNavigate } from 'react-router-dom'; //para el router
import { supabase } from '../../../lib/supabase';

export function DesingRegisterPage(){
    //GUARDO LOS DATOS CON useState
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate(); //REDIRIGUE A LA PAGINA DASHBOARD

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>  {
        e.preventDefault(); //

        const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
                full_lastname: lastname
            }
        }
    })

    if (error) {
        console.log("Error:", error.message)
    } else {
        navigate('/dashboard')
    }

    }



    return (
        <div className={style.login_container}> 
            <section className={style.desing_section}>
         {/*<h1 className={style.desing_h1}>Organiza, controla y mira tus tareas desde cualquier lugar</h1>*/}
         <form className={style.desing_form} onSubmit={handleSubmit} >
            <div> 
                <p className={style.div_p}>〰️</p>
                <h1 className={style.div_h1}>Crear cuenta </h1>
                <h3 className={style.div_h3}>Crea tu cuenta en simple pasos y empieza a organizar tus tareas.</h3>
            </div>
            <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder='Nombre'
            className={style.desing_nombre}
            ></input>
            <input
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            type="text"
            placeholder='Apellido'
            className={style.desing_apellido}
            ></input>
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
            value="Crear cuenta"
            className={style.desing_boton}
            ></input> 
            <Link to="/" className={style.desing_link}>Volver al inicio</Link>
         </form>
        </section>
        </div>
        
    )
}