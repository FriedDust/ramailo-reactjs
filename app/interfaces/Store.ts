import * as MetaInterfaces from './Meta';
import * as DataInterfaces from './Data';

interface BaseProps  {
    meta: MetaInterfaces.MetaStoreProps,
}

interface DataProps {
    [key: string]: DataInterfaces.DataStoreProps
}

export type StoreStateProps = BaseProps & DataProps;