import * as React from 'react';
import {RouteComponentProps} from 'react-router';

import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';

import * as StoreInterfaces from '../interfaces/Store';
import * as MetaInterfaces from '../interfaces/Meta';
import * as DataInterfaces from '../interfaces/Data';


import * as MetaSelectors from '../selectors/Meta';
import * as DataSelectors from '../selectors/Data';

import * as DataActions from '../actions/data';

import ModelNavigation from '../components/common/ModelNavigation';
import DataTable from '../components/common/DataTable';

interface DispatchProps {
    loadData: DataActions.LoadDataThunkProps,
    meta: MetaInterfaces.MetaResourceProps,
    dataList: Array<DataInterfaces.DataResourceProps>
}

type RouteProps = RouteComponentProps<{
    modelName: string
}>

type DataIndexProps = DispatchProps & RouteProps;

class DataIndex extends React.Component<DataIndexProps> {

    constructor(props: DataIndexProps) {
        super(props);
    }

    componentDidMount() {
        if (this.props.meta) {
            this.props.loadData({
                name: this.props.meta.name,
                type: this.props.meta.type
            });
        }
    }

    render() {

        return (
            <div>
                <ModelNavigation title={this.props.meta.label} meta={this.props.meta}/>
                <DataTable meta={this.props.meta} dataList={this.props.dataList}/>
            </div>
        )
    }
}

function mapStateToProps(state: StoreInterfaces.StoreStateProps, props: RouteProps) {
    let modelName: string = props.match.params.modelName;
    let meta = MetaSelectors.findMeta(state)({name: modelName});

    return {
        meta,
        dataList: DataSelectors.findDataList(state)(meta.type)
    };
}

function mapDispatchToProps(dispatch: Dispatch<StoreInterfaces.StoreStateProps>) {
    return {
        loadData: bindActionCreators(DataActions.loadData, dispatch)
    };
}

export default connect<{}, {}, DataIndexProps>(mapStateToProps, mapDispatchToProps)(DataIndex)