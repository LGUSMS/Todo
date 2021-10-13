import React, { useState, useEffect} from  'react';
import {Link,Redirect} from 'react-router-dom';
import * as S from './styles';

import api from '../../services/api';
import isConnected from '../../utils/isConnected';

//NOSSOS COMPONENTES
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import FilterCard from '../../Components/FilterCard';
import TaskCard from '../../Components/TaskCard';

function Home() {
const [filterActived, setfilterActived] = useState ('all');
const [task, setTask] = useState([]);
const [redirect,setRedirect]= useState(false);

async function loadTasks(){

await api.get(`/task/filter/${filterActived}/${isConnected}`)
.then(response => {
 setTask(response.data)

})

}



function Notification(){

setfilterActived('late');

}

useEffect(() => {
loadTasks();

if(!isConnected)
setRedirect(true);
}, [filterActived])

 return (
   
<S.Container> 
  { redirect && <Redirect to="/qrcode"/>}
  <Header clickNotification={Notification}/>

<S.FilterArea>
  <button type="button" onClick={() => setfilterActived("all")}>
 <FilterCard title="Todos" actived={filterActived == 'all'} />
</button>
<button  onClick={() => setfilterActived("today")}>
<FilterCard title="Hoje" actived={filterActived == 'today'}/>
</button>
<button type="button" onClick={() => setfilterActived("week")}>
<FilterCard title="Semana" actived={filterActived == 'week'} />
</button>
<button type="button" onClick={() => setfilterActived("month")}>
<FilterCard title="Mês" actived={filterActived == 'month'} />
</button>
<button type="button" onClick={() => setfilterActived("year")}>
<FilterCard title="Ano" actived={filterActived =='year'}/>
</button>
</S.FilterArea>

  <S.Title>
 <h3>{filterActived == 'late' ? 'TAREFAS ATRASADAS': 'TAREFAS'}</h3>
  </S.Title>

  <S.Content>
   {
     task.map(t => (
    <Link to={`/task/${t._id}`}>
     <TaskCard type={t.type} title={t.title} when={t.when} done={t.done} />
    </Link>
     ))
   }
  </S.Content>

<Footer/>
</S.Container>
 )
}

 
 
export default Home;