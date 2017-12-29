import * as React from 'react';
import {Route, Switch} from 'react-router-dom'
// import {ModelMetaList} from './components/ModelMetaIndex';
// import {ModelDataIndex} from './components/ModelDataIndex';
// import {ModelDataDetail} from './components/ModelDataDetail';
// import {ModelDataCreate} from './components/ModelDataCreate';

import DataIndex from './components/DataIndex';

const routes = (
    <Switch>
        {/*<Route path={`/meta`} component={ModelMetaList}/>*/}
        {/*<Route path={`/:modelName/create`} component={ModelDataCreate}/>*/}
        {/*<Route path={`/:modelName/:modelDataId`} component={ModelDataDetail}/>*/}
        <Route path={`/:modelName`} component={DataIndex}/>
    </Switch>
);

export default routes;
