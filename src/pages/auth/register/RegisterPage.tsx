import { useState } from 'react';
import style from './Register.module.css' //import css
import { Link, useNavigate } from 'react-router-dom'; //para el router
import { supabase } from '../../../lib/supabase';

export function DesingRegisterPage(){
    return (
        <section className={style.desing_section}>
         {/*<h1 className={style.desing_h1}>Organiza, controla y mira tus tareas desde cualquier lugar</h1>*/}
         <form className={style.desing_form} >
            <div> 
                <p className={style.div_p}>〰️</p>
                <h1 className={style.div_h1}> Crear cuenta </h1>
                <h3 className={style.div_h3}>Crea tu cuenta en simple pasos y empieza a organizar tus tareas.</h3>
            </div>
            <input
            type="text"
            placeholder='Nombre'
            className={style.desing_nombre}
            ></input>
            <input
            type="text"
            placeholder='Apellido'
            className={style.desing_apellido}
            ></input>
            <input 
            type="Email"
            placeholder='Email'
            className={style.desing_email}></input>
            <input 
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
    )
}