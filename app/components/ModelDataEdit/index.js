import {connect} from 'react-redux';
import {loadDataItem} from '../../actions/data';

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
export class ModelDataEdit extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        let modelName = this.props.match.params.modelName;
        let modelType = this.props.modelMetaNameTypeMap[modelName];
        let modelDataId = this.props.match.params.modelDataId;
        if (modelType) {
            this.props.dispatch(loadDataItem({modelType, modelName, modelDataId}));
        }
    }

    componentWillReceiveProps(nextProps) {
        let modelName = this.props.match.params.modelName;
        let modelType = this.props.modelMetaNameTypeMap[modelName];
        let modelDataId = this.props.match.params.modelDataId;

        // TODO: Need to find a better way to do this
        if ((modelName !== nextProps.match.params.modelName) ||
            (modelType !== nextProps.modelMetaNameTypeMap[modelName])) {

            modelName = nextProps.match.params.modelName;
            modelType = nextProps.modelMetaNameTypeMap[modelName];
            this.props.dispatch(loadDataItem({modelType, modelName, modelDataId}));
        }
    }

    render() {

        return (
            <div>
               TODO : Model item API not working
            </div>
        )
    }
}