import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';

interface INote {
  id?: number;
  valor: string;
  tipo_nota: string
}

function App() {
  const { register, handleSubmit} = useForm()
  const storedNotes = localStorage.getItem('@notes');
  const parsedNotes = storedNotes ? JSON.parse(storedNotes) : [];
  const [notes, setNotes] = useState(parsedNotes);
  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const newData: any = {
      id: notes.length + 1,
      ...data
    }
    if(newData.valor && newData.tipo_nota){
      toast.success('Nota Criada!', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      setNotes([...notes, newData])
      localStorage.setItem("@notes", JSON.stringify([...notes, newData]))
      return
    }
    toast.error('Deve preencher os campos!', {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
  
  const remove = (id: string) => {
    const itemRemoved: INote[] = notes.filter((note: INote) => note.id != Number(id))
    setNotes(itemRemoved)
    localStorage.setItem("@notes", JSON.stringify(itemRemoved))
    toast.success('Deletado', {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  return (
    <>
      <main className='container'>
        <div className='d-flex flex-column flex-md-row justify-content-evenly align-items-center gap-3 py-5'>
            <Form className='rounded p-3 bg-secondary text-white' onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                  <Form.Label>Tipo de nota</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>R$</InputGroup.Text>
                    <Form.Control type='number' {...register("valor")} aria-label="Amount (to the nearest dollar)" />
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

            <ul style={{height: '30rem'}} className='rounded bg-secondary text-white d-flex flex-column align-items-center col-12 col-sm-9 col-md-7 col-lg-6 p-2 gap-3 overflow-y-auto'>
              {
                notes.map((note: INote) => {
                  return (
                    <li key={note.id} className='rounded bg-warning text-dark d-flex align-items-center justify-content-between p-3 col-12 col-sm-12 col-md-9'>
                      <span>R${note.valor}</span>
                      {
                        note.tipo_nota == 'Entrada' ? 
                        <span className='rounded p-2 col-4 text-center' style={{background: 'green'}}>{note.tipo_nota}</span>
                        :
                        <span className='rounded p-2 col-4 text-center' style={{background: 'red'}}>{note.tipo_nota}</span>                        
                      }
                      <AiFillDelete size={25} id={note.id?.toString()} onClick={(e: any) => remove(e.currentTarget.id)} />
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
