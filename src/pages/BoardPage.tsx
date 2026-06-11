import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; //IMPORTO useParams 
import { supabase } from '../lib/supabase';

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
    const [newCard, setnewCard] = useState('') //GUARDO LOS DATOS POR ESO ESTA VACIO
    const handleCreateCard  = async(e: React.FormEvent<HTMLFormElement>, columnId: string) => {  //RECIBE EL evento FORM y EL id DE LA COLUMNA DONDE SE VA CREAR 
        e.preventDefault(); //EVITA QUE EL FORM RECARGUE LA PAGINA AL HACER SUBMIT 
        const {error} = await supabase.from('cards').insert({title: newCard, column_id: columnId}) //Le decís a Supabase: "insertá una nueva tarjeta con este título y en esta columna". newCard es lo que escribió el usuario, columnId es la columna donde va.
        if (error) {
            console.log("error: no se creo nada")
        } else {
            setnewCard('')
        }
    }
    
    return(
        <div> 
          <h1> Se agrega esto: {id} </h1>   
          <ul>{/*COLUMNAS*/}
            {row.map((usuario) => ( 
                <li key={usuario.id}>
                    {usuario.title}
                    <ul>  {/*CARDS*/}
            {card.filter(c => c.column_id === usuario.id).map((tarjetas)=> (
                <li key={tarjetas.id}> 
                {tarjetas.title}
                </li> 
                ))}
            </ul> 
           <form onSubmit={(e) => handleCreateCard(e, usuario.id)}>
                <input type="text" 
                value={newCard} 
                onChange={(e) => setnewCard(e.target.value)}></input>
                <button type="submit"> + </button>
                </form>
                </li>
            ))} 
            
            
          </ul>
          
        </div>
        
    )
}
