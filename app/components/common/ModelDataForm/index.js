import {Form, Text, Number} from 'react-form';
import {connect} from 'react-redux';
import {TypeAhead} from '../../common/TypeAhead';
import {ModelChildrenForm} from '../ModelDataForm/ModelChildrenForm';

@connect((store, props) => {

    let modelType = props.modelType;
    let modelMeta = store.meta.types[modelType];
    let modelMetaTypeList = Object.keys(store.meta.types);

    return {modelMeta, modelMetaTypeList};
})
export class ModelDataForm extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.getFormElement = this.getFormElement.bind(this);
        this.renderFormElement = this.renderFormElement.bind(this);
    }

    getFormElement({type, label, name, childrenType}) {

        if (this.props.modelMetaTypeList.indexOf(type) > -1) {
            if(type === this.props.parentModelType) {
                return null;
            }
            return (
                <TypeAhead field={name} modelType={type}/>
            );
        }

        switch (type) {

            case 'String':
                return (
                    <div className="form-group">
                        <label>{label}</label>
                        <Text field={name} className="form-control" />
                    </div>
                );

            case 'BigDecimal':
            case 'Integer':
                return (
                    <div className="form-group">
                        <label>{label}</label>
                        <Text field={name} className="form-control" />
                    </div>
                );

            case 'List':
                return (
                    <ModelChildrenForm field={name} parentModelType={this.props.modelMeta.type}
                                       modelType={childrenType}
                                       parentModelMeta={this.props.modelMeta}
                                       modelMeta={this.props.modelMeta}
                                       />
                );
                return null;

            default:
                return (
                    <div className="form-group">
                        <label>{label}</label>
                        <Text field={name} className="form-control" />
                    </div>
                );
        }
    }

    renderFormElement(column, index) {
        if (column.isGeneratedValue) {
            return null;
        }
        return (
            <div key={index}>
                {this.getFormElement(column)}
            </div>
        )
    }

    render() {
        let props = this.props;

        return (
            <div>
                <Form
                    onSubmit={(submittedValue) => {
                        props.onSubmit(submittedValue, props.isEdit);
                    }}
                    defaultValues={props.selection || {}}
                >
                    { formApi => (
                        <div className="form-group">
                            {
                                props.modelMeta.attributes.map((column, index) => this.renderFormElement(column, index))
                            }
                            <div className="d-flex flex-row-reverse">
                                <button type="submit"
                                        onClick={formApi.submitForm}
                                        disabled={props.disableForm}
                                        className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        );
    }
}