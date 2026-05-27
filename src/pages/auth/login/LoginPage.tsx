import style from './Login.module.css'

export function DesingLoginPage(){
    return(
        <section className={style.desing_section}>
         <h1 className={style.desing_h1}>Organiza, controla y mira tus tareas desde cualquier lugar</h1>
        
         <form className={style.desing_form}>
            <input 
            type='Email'
            placeholder='Email'></input>
            <input 
            type='password' 
            placeholder='Contraseña'></input>
             
         </form>
        </section>
        
    )
}