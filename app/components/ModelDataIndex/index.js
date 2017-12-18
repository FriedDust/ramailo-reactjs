import {connect} from 'react-redux';

import {loadData, addData} from '../../actions/data';
import {ModelNav} from '../common/ModelNav';
import {ModelDataTable} from '../common/ModelDataTable';

@connect((store, props) => {

    let modelMetaNameTypeMap = store.meta.nameTypeMap;
    let modelName = props.match.params.modelName;
    let modelType = modelMetaNameTypeMap[modelName];

    let modelMeta = store.meta.types[modelType];
    let modelData = store.data[modelType];

    let modelDataList = modelData ? modelData.getAll() : [];
    return {
        modelMeta,
        modelMetaNameTypeMap,
        modelDataList
    }
})
export class ModelDataIndex extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.addModelData = this.addModelData.bind(this);
    }

    componentDidMount() {
        let modelName = this.props.match.params.modelName;
        let modelType = this.props.modelMetaNameTypeMap[modelName];
        if (modelType) {
            this.props.dispatch(loadData({modelType, modelName}));
        }
    }

    componentWillReceiveProps(nextProps) {
        let modelName = this.props.match.params.modelName;
        let modelType = this.props.modelMetaNameTypeMap[modelName];

        // TODO: Need to find a better way to do this
        if ((modelName !== nextProps.match.params.modelName) ||
            (modelType !== nextProps.modelMetaNameTypeMap[modelName])) {

            modelName = nextProps.match.params.modelName;
            modelType = nextProps.modelMetaNameTypeMap[modelName];
            this.props.dispatch(loadData({modelType, modelName}));
        }
    }

    addModelData(modelDataItem) {
        let modelName = this.props.match.params.modelName;
        let modelType = this.props.modelMetaNameTypeMap[modelName];
        this.props.dispatch(addData({modelName, modelType, modelDataItem}));
    }

    render() {
        if (!this.props.modelMeta || !this.props.modelDataList) {
            return (
                <div>Loading</div>
            )
        }
        return (
            <div>
                <ModelNav modelMeta={this.props.modelMeta} />
                <ModelDataTable
                    modelMeta={this.props.modelMeta}
                    modelDataList={this.props.modelDataList}/>
            </div>
        )
    }
}