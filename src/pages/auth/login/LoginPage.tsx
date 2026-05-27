import style from './Login.module.css'

export function DesingLoginPage(){
    return(
        <section className={style.desing_section}>
        
         <h1 className={style.desing_h1}>Organiza, controla y mira tus tareas desde cualquier lugar</h1>
        
         <form className={style.desing_form}>
            <div> 
                <p className={style.div_p}>〰️</p>
                <h1 className={style.div_h1}> Inicia seccion </h1>
                <h3 className={style.div_h3}>Acceda a sus tareas, notas y proyectos en cualquier momento.</h3>
            </div>
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
            
            
             
         </form>
        </section>
        
    )
}