import {Form, Text, Number} from 'react-form';
import {connect} from 'react-redux';

import {ModelParentForm} from './ModelParentForm';
import {ModelChildrenForm} from './ModelChildrenForm';


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
        let props = this.props;

        if (props.isChildForm && props.parentModelType === type) {
            return null;
        }

        if (this.props.modelMetaTypeList.indexOf(type) > -1) {
            return (
                <ModelParentForm field={name} modelType={type}/>
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
                    <ModelChildrenForm field={name} parentModelType={props.modelMeta.type}
                                       modelType={childrenType}/>
                );

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