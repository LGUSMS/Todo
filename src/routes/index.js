import React from  'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';

import Home from '../Views/Home/Index';
import Task from '../Views/Task';
import Qrcode from '../Views/Qrcode';

export default function Routes(){
 return(
 <BrowserRouter>
 <Switch>
<Route path="/" exact component={Home}/>
<Route path="/task" exact component={Task} />
<Route path="/task/:id" exact component={Task} />
<Route path="/:qrcode" exact component={Qrcode} />
 </Switch>
 </BrowserRouter>



 )


}