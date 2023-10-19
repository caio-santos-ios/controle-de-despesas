import { useState } from 'react';
import './App.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from "react-hook-form";

interface INote {
  id?: number;
  valor: string;
  tipo_nota: string
}

function App() {
  const { register, handleSubmit} = useForm()
  // const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('@notes')) ? JSON.parse(localStorage.getItem('@notes')) : [])
  const storedNotes = localStorage.getItem('@notes');
  const parsedNotes = storedNotes ? JSON.parse(storedNotes) : [];
  const [notes, setNotes] = useState(parsedNotes);
  
  const onSubmit = (data: INote) => {
    const newData = {
      id: notes.length + 1,
      ...data
    }
    if(newData.valor && newData.tipo_nota){
      setNotes([...notes, newData])
      localStorage.setItem("@notes", JSON.stringify([...notes, newData]))
    }
  }
  
  const remove = (id: number) => {
    const itemRemoved: INote[] = notes.filter((note: INote) => note.id != id)
    setNotes(itemRemoved)
    localStorage.setItem("@notes", JSON.stringify(itemRemoved))
  }

  return (
    <>
      <main>
        <Form className='d-flex aling-items-center justify-content-center p-3 mb-2 bg-secondary text-white' onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
                <Form.Label>Tipo de nota</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>R$</InputGroup.Text>
                  <Form.Control {...register("valor")} aria-label="Amount (to the nearest dollar)" />
                  <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup>  
                <Form.Label>Tipo de nota</Form.Label>
                <Form.Select {...register("tipo_nota")} aria-label="Default select example">
                  <option value="">Escolha o tipo de nota</option>
                  <option value="Entrada">Entrada</option>
                  <option value="Saida">Saída</option>
                </Form.Select>
                <Button className='m-4' variant="primary" type="submit">Criar</Button>
          </Form.Group>
        </Form>
        <div>
          <ul className='bg-secondary text-white'>
              {
                notes.map((note: INote) => {
                  return(
                    <li key={note.id}>
                      <span>R$ {note.valor}</span>
                      {
                        note.tipo_nota == 'Entrada' ?
                        <span className='tipo_nota' style={{background: 'green'}}>{note.tipo_nota}</span>
                        :
                        <span className='tipo_nota' style={{background: 'red'}}>{note.tipo_nota}</span>
                      }
                      <button onClick={(e) => remove(e.target.id)} id={note.id} className='btn_delete'>D</button>
                    </li>
                  )
                })
              }
          </ul>
        </div>
      </main>
    </>
  )
}

export default App
