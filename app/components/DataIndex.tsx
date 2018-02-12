import * as React from 'react';
import {RouteComponentProps, RouteProps} from 'react-router';

import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';

import * as StoreInterfaces from '../interfaces/store';
import * as MetaInterfaces from '../interfaces/meta';
import * as DataInterfaces from '../interfaces/data';

import * as MetaSelectors from '../selectors/meta';
import * as DataSelectors from '../selectors/data';

import * as DataActions from '../actions/data';

import ModelNavigation from '../components/common/ModelNavigation';
import DataTable from '../components/common/DataTable';

interface OwnProps extends RouteComponentProps<{
    modelName: string
}> {

}

interface StoreProps {
    meta: MetaInterfaces.MetaResourceProps,
    dataList: Array<DataInterfaces.DataResourceProps>
}

interface DispatchProps {
    loadData: DataActions.LoadDataThunkProps
}

type DataIndexProps = OwnProps & StoreProps & DispatchProps

class DataIndex extends React.Component<DataIndexProps> {

    constructor(props: DataIndexProps) {
        super(props);
    }

    componentDidMount() {
        let meta = this.props.meta;
        if (meta) {
            this.props.loadData({
                name: meta.name,
                type: meta.type
            });
        }
    }

    componentWillReceiveProps(nextProps: DataIndexProps) {
        let meta = this.props.meta;
        if (meta) {
            if (meta.type !== nextProps.meta.type) {
                this.props.loadData({
                    name: nextProps.meta.name,
                    type: nextProps.meta.type
                });

            }
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

function mapStateToProps(state: StoreInterfaces.StoreStateProps, props: OwnProps) {
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

export default connect<StoreProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(DataIndex)