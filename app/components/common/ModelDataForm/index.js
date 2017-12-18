import {Form, Text, Number} from 'react-form';
import {connect} from 'react-redux';
import {TypeAhead} from '../../common/TypeAhead';


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

        // this.primitives = ['String', 'Integer', 'LocalDate'];
    }

    getFormElement({type, label, name, childrenType}) {

        if (this.props.modelMetaTypeList.indexOf(type) > -1) {
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
                // return (
                //     <ModelChildrenForm field={name} parentModelType={props.modelMeta.type}
                //                        modelType={childrenType}/>
                // );
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
                        props.onSubmit(submittedValue);
                    }}
                    defaultValues={props.selection || {}}
                >
                    { formApi => (
                        <div className="form-group">
                            {
                                props.modelMeta.attributes.map((column, index) => this.renderFormElement(column, index))
                            }
                            <button type="submit"
                                    onClick={formApi.submitForm}
                                    disabled={props.disableForm}
                                    className="btn btn-default">
                                Submit
                            </button>
                        </div>
                    )}
                </Form>
            </div>
        );
    }
}