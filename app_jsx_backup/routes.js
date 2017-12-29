import {Route, Switch} from 'react-router-dom'
import {ModelMetaList} from './components/ModelMetaIndex';
import {ModelDataIndex} from './components/ModelDataIndex';
import {ModelDataDetail} from './components/ModelDataDetail';
import {ModelDataCreate} from './components/ModelDataCreate';


const routes = (
    <Switch>
        <Route path={`/meta`} component={ModelMetaList}/>
        <Route path={`/:modelName/create`} component={ModelDataCreate}/>
        <Route path={`/:modelName/:modelDataId`} component={ModelDataDetail}/>
        <Route path={`/:modelName`} component={ModelDataIndex}/>
    </Switch>
);

export default routes;
