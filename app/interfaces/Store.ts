import * as MetaInterfaces from './meta';
import * as DataInterfaces from './data';

interface BaseProps  {
    meta: MetaInterfaces.MetaStoreProps,
}

interface DataProps {
    [key: string]: DataInterfaces.DataStoreProps
}

export type StoreStateProps = BaseProps & DataProps;