import React, { useState, useEffect} from  'react';
import {Redirect} from 'react-router-dom'
import * as S from './styles';
import{format} from 'date-fns';

import api from '../../services/api';
import isConnected from '../../utils/isConnected';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import TypeIcons from '../../utils/TypeIcons';
import setHours from 'date-fns/setHours';



function Task({match}) {
const [redirect, setRedirect] = useState(false);
const [type,setType] = useState();
const [id,setId] = useState();
const [done,setDone] = useState(false);
const [title,setTitle] = useState();
const [description,setDescription] = useState();
const [date,setDate] = useState();
const [hour,setHour] = useState();


 async function loadTasksDetails(){
  await api.get(`/Task/${match.params.id}`)
  .then(response =>{
    setDone(response.data.done)
    setType(response.data.type)
    setTitle(response.data.title) 
    setDescription(response.data.description) 
    setDate(format(new Date(response.data.when),'yyyy-MM-dd'))
    setHour(format(new Date(response.data.when),'HH:mm'))
  })
    
 }



async function save(){
//validação dos dados
if(!title)
return alert("Você precisa informar o título da tarefa")
else if(!description)
return alert("Você precisa informar a descrição da tarefa")
else if(!type)
return alert("Você precisa selecionar o tipo da tarefa")
else if(!date)
return alert("Você precisa definir a data da tarefa")
else if(!hour)
return alert("Você precisa definir o horário da tarefa")






  if(match.params.id){
    await api.put(`/Task/${match.params.id}`, {
      macaddress:isConnected,
      done,
      type,
      title,
      description,
      when: `${date}T${hour}:00.000`
      
      }).then( () =>
       setRedirect(true)
      )
    
      
  }else{
    await api.post('/Task', {
      macaddress:isConnected,
      type,
      title,
      description,
      when: `${date}T${hour}:00.000`
      }).then( () =>
        setRedirect(true)
      )


await api.post('/Task', {
macaddress:isConnected,
type,
title,
description,
when: `${date}T${hour}:00.000`

}).then( () =>
 setRedirect(true)
).catch(response =>{
  alert(response.date.error)
})

}
}

async function Remove(){
  const res =window.confirm('Deseja realmenet remover a tarefa?')
   if(res == true){
    await api.delete(`/task/${match.params.id}`)
    .then(() => setRedirect(true))
     
   }
  }
  

useEffect(() => {
  if(!isConnected)
  setRedirect(true);
loadTasksDetails();
}, [loadTasksDetails])

 return (
   <S.Container> 
    {redirect && <Redirect to="/"/>}
  <Header />
<S.form>
<S.TypeIcons>
{
 TypeIcons.map((icon, index) => (
   index > 0 && 
   <button type="button" onClick={() => setType(index)}>
   <img src={icon} alt ="Tipo da Tarefa"
   className ={type && type != index && 'inative'}/>
  </button>
 ))
}

</S.TypeIcons>

<S.Input>
<span>Título</span>
<input type="text" placeholder="Titulo da Tarefa..." 
onChange={e => setTitle(e.target.value)} value={title}/>
</S.Input>

<S.TextArea>
<span>Descrição</span>
<textarea rows={5}placeholder="Detalhes da Tarefa..."
onChange={e => setDescription(e.target.value)} value={description}/>

</S.TextArea>

<S.Input>
<span>Data</span>
<input type="date" placeholder="Descricao da Tarefa..."
onChange={e => setDate(e.target.value)} value={date}/>


</S.Input>

<S.Input>
<span>Hora</span>
<input type="time" placeholder="Titulo da Tarefa..."
onChange={e => setHour(e.target.value)} value={hour}/>


</S.Input>

<S.Options>
<div>
  <input type="checkbox" checked={done} onChange= {() => setDone(!done)}/>
  <span>CONCLUÍDO</span>
</div>
{match.params.id &&<button type="button" onClick={Remove}>EXCLUIR</button>}
</S.Options>

<S.Save>
<button type="button" onClick={save}>SALVAR</button>

</S.Save>

</S.form>

<Footer/>
</S.Container>
 )
}


  
export default Task;