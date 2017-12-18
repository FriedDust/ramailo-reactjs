import {FormField} from 'react-form';

import {connect} from 'react-redux';

import {loadData, addData} from '../../actions/data';

import Select from 'react-select';


@connect((store, props) => {
    let modelType = props.modelType;
    let modelData = store.data[modelType];

    return {
        modelMeta: store.meta.types[modelType],
        modelData: modelData,
    }
})
class _TypeAhead extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        let modelMeta = this.props.modelMeta;

        if (modelMeta) {
            let modelType = modelMeta.type;
            let modelName = modelMeta.name;
            this.props.dispatch(loadData({modelType, modelName}));
        }
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
                    multi={false} value={getValue()}
                    onChange={(value) => {
                        setValue(value);
                    }}
                    valueKey="id" labelKey={props.modelMeta.stringify}
                    loadOptions={(input, callback)=> {
                        input = input.toLowerCase();
                        setTimeout(()=> {
                            let complete = this.props.modelData.getAll();
                            let options = complete.filter((opt)=> {
                                return ((opt[props.modelMeta.stringify] || '').toLowerCase().indexOf(input) > -1);
                            });
                            let data = { options, complete };
                            callback(null, data);
                        }, 100);
                    }}/>
            </div>
        );
    }
}

export const TypeAhead = FormField(_TypeAhead);