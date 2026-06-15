import { useEffect, useState } from 'react';
import style from './dashboard.module.css' //import css
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { DesingFooter } from '../../components/Footer'

//INTERFAZ PARA USAR EN EL .map() y MODIFICACION DE LA LINEA 34 DEL useState
  interface Board {
        id: string,
        name: string, 
        user_id: string, 
        created_at: string, 
    }

export function DesingDashboard(){
    const [name, setName] = useState<string| null>(null); //GUARDO LOS DATOS DEL USUARIO
    const navigate = useNavigate(); //DERIGIRE A LA PAGINA QUE QUIERA 
    //LOGICA PARA MOSTRAR EL NOMBRE DEL USUARIO
    useEffect(()=> {
        const checkUser = async() => {
        const {data} = await supabase.auth.getSession({})
        if(data.session) {
            setName(data.session.user.user_metadata.full_name)
        } else {
            setName(null)
        }
     }
     checkUser()
    },[])
    
    //LOGICA PARA EL BOTON SALIR Y VOLVER A LA PAGE PRINCIPAL
    const handleLogout = async() => {
        const {error} = await supabase.auth.signOut({})
        if (error) {
            console.log('error: salir')
        } else{
            navigate('/')
        }
    }

    //LOGICA PARA TABLEROS 
    const [boards, setBoards] = useState<Board[]>([]) //GUARDA LA LISTA DE TABLEROS, EMPIEZA VACIO XQ NO TODAVIA NO BUSCA NADA
    useEffect(() => {
        const tableCreate = async() => {
         const { data: sessionData } = await supabase.auth.getSession() //PREGUNTA ¿QUIEN ESTA LOGUEADO? Y SE GUARDA EN sessionData.
         if (sessionData.session) { //VERIFICA QUE HAY UNA SESION ACTIVA ANTES DE SEGUIR
            const userId = sessionData.session.user.id
            const { data } = await supabase.from('boards').select('*').eq('user_id', userId)
            if (data) {
                setBoards(data)
            } 
        }
    } 
        tableCreate();
    },[])

    //LOGICA CREACION DEL NUEVO DE TABLERO QUE VOY A AGREGAR 
    const [boardName, setboardName] = useState(''); //PARA GUARDAR EL NOMBRE DEL NUEVO TABLERO

    const handleCreateBoard = async(e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        const {data:sessionData} = await supabase.auth.getSession()
        if (sessionData.session) {
            const userId = sessionData.session.user.id
            const { error, data: nuevoTablero } = await supabase.from('boards').insert({ name: boardName, user_id: userId }).select()
        if (error) {
           console.log('Error:', error.message)
        } else { 
            setboardName('')
            setBoards([...boards, nuevoTablero[0]]) //CREA EL TABLERO PARA APARECER EN PANTALLA
        }
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

            <section className={style.section_desing}>
                <form onSubmit={handleCreateBoard} className={style.uno}> 
                   <button
                   type="submit"
                   className={style.section_boton}>+</button>
                    <input 
                    value={boardName}
                    type="text"
                    className={style.section_input}
                    onChange={(e) => setboardName(e.target.value)}></input>
                </form>
                <ul className={style.desing_ul}> 
                    {boards.map((usuario) => (
                        <li
                        className={style.desing_li}
                        key={usuario.id}
                        onClick={() => navigate('/board/' + usuario.id)} //onClick PARA QUE CUANDO HAGA CLICK ES LA LISTA ME MANDE A LA PAGE DE board
                        >{usuario.name} </li>
                    ))}
                    </ul> 
            </section>
              <footer> 
             <DesingFooter 
        title="Task Flow"
        subtitle="Gestión visual de tareas inspirada en la metodología Kanban."
        />
        </footer>
        </section>
      
    )
}
