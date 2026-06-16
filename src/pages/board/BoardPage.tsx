import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; //IMPORTO useParams 
import { supabase } from '../../lib/supabase';
import style from './board.module.css';
import { Link } from 'react-router-dom';
import { DesingFooter } from '../../components/Footer' //COMPONENTE
import { DragDropContext, Droppable, Draggable} from '@hello-pangea/dnd'; //LIBRERIA PARA MOVER LAS CARDS DE UN LADO AL OTRO 

interface Column {
    id: string,
    title: string,
    position: number, 
    board_id: string, 
    created_at: string
}

interface Cards { 
    id: string,
    title: string,
    description: string, 
    position: number,
    column_id: string, 
    due_date: string,
    created_at: string
}

export function BoardPageDesing() {
    const {id} = useParams(); //LLAMO AL id QUE ESTA EN app.tsx EN EL ROUTER y SE MUESTRA EL id EN LA LINEA 7
    const [row, setRow] = useState<Column[]>([]); //GUARDA LA LISTA DE colum, DE LA INTERFACE 
    useEffect(() => {
        const checkRow = async() => {
            const {data} = await supabase.from('columns').select('*').eq('board_id', id) 
            if(data) {
                 setRow(data)
            }
        }
        checkRow()
    },[])

    //LOGICA PARA MOSTRAR LAS CARDS 
    const [card, setCard] = useState<Cards[]>([]);//GUARDA LA LISTA DE cards DE LA INTERFACE
    useEffect(()=> {
        const checkCard = async() => { 
            const {data} = await  supabase.from('cards').select('*').in('column_id', row.map(col => col.id))
                if (data) {
                    setCard(data)
                }
        }
        checkCard()
    },[row])

    //LOGICA PARA CREAR TARJETAS 
    const [newCard, setnewCard] = useState<{[key: string]: string}>({}) //LE AGREGO VALOR AL useState: En lugar de guardar un solo string, guardás un objeto donde cada key es el id de una columna y el valor es el texto que escribió el usuario.
    const handleCreateCard  = async(e: React.FormEvent<HTMLFormElement>, columnId: string) => {  //RECIBE EL evento FORM y EL id DE LA COLUMNA DONDE SE VA CREAR 
        e.preventDefault(); //EVITA QUE EL FORM RECARGUE LA PAGINA AL HACER SUBMIT 
        const {error, data: nuevaTarjeta} = await supabase.from('cards').insert({title: newCard[columnId], column_id: columnId}).select() //Le decís a Supabase: "insertá una nueva tarjeta con este título y en esta columna". newCard es lo que escribió el usuario, columnId es la columna donde va.
        if (error) {
            console.log("error: no se creo nada")
        } else {
            setnewCard({...newCard, [columnId]: ''})
            setCard([...card, nuevaTarjeta[0]])
        }
    }
    
    return(
        <section> 
            <header> 
                <Link 
           to="/dashboard"
           className={style.desing_link}
           > ⭠ </Link>
            </header>
        <div className={style.desing_board}>
            <div className={style.desing_board_title}> 
                <h1> Task Board</h1> 
            <p>
                Organiza y gestiona tus tareas.
            </p>
            </div>
            <DragDropContext> 
          <ul className={style.board_column}>{/*COLUMNAS*/}
            {row.map((usuario) => ( 
                <li 
                key={usuario.id} 
                className={style.board_column_edit}>
                    {usuario.title}
                <ul 
                    className={style.card_column_edit}>  {/*CARDS*/}
            {card.filter(c => c.column_id === usuario.id).map((tarjetas)=> (
                   <li 
                   key={tarjetas.id} 
                   className={style.card_column_edit_text}>{tarjetas.title}
                   </li> 
                   ))}
                </ul> 
           <form 
           className={style.desing_form} 
           onSubmit={(e) => handleCreateCard(e, usuario.id)}>
             <input 
             placeholder='Agregar una tarjeta'
             type="text" 
             value={newCard[usuario.id]} //Le decís al input que muestre el valor que corresponde a esa columna
             onChange={(e) => setnewCard({...newCard, [usuario.id]: e.target.value})}></input> {/*Cuando el usuario escribe, actualizás solo la key de esa columna sin tocar las demás. El ...newCard copia todo el objeto y [usuario.id]: e.target.value sobreescribe solo esa columna. */}
                <button 
                type="submit"> + </button>
            </form>
                </li>
            ))} 
          </ul>
          </DragDropContext>
        </div>
        <DesingFooter 
        title="Task Flow"
        subtitle="Gestión visual de tareas inspirada en la metodología Kanban."
        />
        </section>
    )
}
