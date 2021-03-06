import {FormField} from 'react-form';
import {connect} from 'react-redux';
import {loadData, addData} from '../../actions/data';
import {toString} from "../../utils/meta";
import Select from 'react-select';


@connect((store, props) => {
    let modelType = props.modelType;
    let modelData = store[modelType];
    return {
        modelMeta: store.meta.types[modelType],
        modelData: modelData,
    }
})
class _TypeAhead extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.loadOptions = this.loadOptions.bind(this);
    }

    componentDidMount() {
        let modelMeta = this.props.modelMeta;

        if (modelMeta) {
            let modelType = modelMeta.type;
            let modelName = modelMeta.name;
            this.props.dispatch(loadData({modelType, modelName}));
        }
    }

    loadOptions(input, callback) {
        input = input.toLowerCase();

        let modelMeta = this.props.modelMeta;
        let modelType = modelMeta.type;
        let modelName = modelMeta.name;
        this.props.dispatch(loadData({modelType, modelName}, ()=> {
            let complete = this.props.modelData.getAll();
            let options = complete.filter((opt) => {
                //TODO: Handle scenario where stringify is object
                let value = opt[this.props.modelMeta.stringify] || '';
                return (value.toLowerCase().indexOf(input) > -1);
            });
            let data = {options, complete};
            callback(null, data);
        }));
    }

    render() {
        let props = this.props;
        let modelData = props.modelData;

        if (!props.modelMeta || !modelData) {
            return null;
        }

        const {fieldApi} = props;
        const {getValue, setValue} = fieldApi;

        return (
            <div className="form-group">
                <label htmlFor="">{props.modelMeta.label}</label>
                <Select.Async
                    multi={false}
                    value={getValue()}
                    onChange={(value) => {
                        setValue(value);
                    }}
                    valueKey="id"
                    labelKey={props.modelMeta.stringify}
                    loadOptions={this.loadOptions}/>
            </div>
        );
    }
}

export const TypeAhead = FormField(_TypeAhead);