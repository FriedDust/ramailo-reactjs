import * as React from 'react';
import {Route, Switch} from 'react-router-dom'
// import {ModelMetaList} from './components/ModelMetaIndex';
// import {ModelDataIndex} from './components/ModelDataIndex';
// import {ModelDataDetail} from './components/ModelDataDetail';
// import {ModelDataCreate} from './components/ModelDataCreate';

import DataIndex from './components/DataIndex';
import DataCreate from './components/DataCreate';

const routes = (
    <Switch>
        {/*<Route path={`/meta`} component={ModelMetaList}/>*/}
        {/*<Route path={`/:modelName/:modelDataId`} component={ModelDataDetail}/>*/}
        <Route path={`/:modelName/create`} component={DataCreate}/>
        <Route path={`/:modelName`} component={DataIndex}/>
    </Switch>
);

export default routes;
