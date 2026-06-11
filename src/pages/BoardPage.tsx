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
    const [row, setRow] = useState<Column[]>([]); //GUARDA LA LISTA DE TABLEROS, EMPIEZA VACIO XQ NO TODAVIA NO BUSCA NADA
    useEffect(() => {
        const checkRow = async() => {
            const {data} = await supabase.from('columns').select('*').eq('board_id', id) 
            if(data) {
                 setRow(data)
            }
        }
        checkRow()
    },[])

    const [card, setCard] = useState<Cards[]>([]);
    useEffect(()=> {
        const checkCard = async() => { 
            const {data} = await  supabase.from('cards').select('*').in('column_id', row.map(col => col.id))
                if (data) {
                    setCard(data)
                }
        }
        checkCard()
    },[row])
    
    return(
        <div> 
          <h1> Se agrega esto: {id} </h1>   
          <ul>
            {row.map((usuario) => (
                <li key={usuario.id}>
                    {usuario.title}

                </li>
            ))} 

          </ul>
        </div>
        
    )
}
