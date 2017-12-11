import {Route, Switch} from 'react-router-dom'
import {ModelMetaList} from './components/ModelMetaIndex';
import {ModelDataIndex} from './components/ModelDataIndex';
import {ModelDataEdit} from './components/ModelDataEdit';

const routes = (
    <Switch>
        <Route path={`/meta`} component={ModelMetaList}/>
        <Route path={`/:modelName/:modelDataId`} component={ModelDataEdit}/>
        <Route path={`/:modelName`} component={ModelDataIndex}/>
    </Switch>
);

export default routes;
