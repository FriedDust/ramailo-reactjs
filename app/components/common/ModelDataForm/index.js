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

        if (this.props.modelMetaTypeList.indexOf(type) > -1) {
            return (
                <ModelParentForm field={name} name={name} label={label} modelType={type}/>
            );
        }

        switch (type) {

            case 'String':
                return (
                    <div>
                        <label htmlFor={name}>{label}</label>
                        <Text field={name}/>
                    </div>
                );

            case 'BigDecimal':
            case 'Integer':
                return (
                    <div>
                        <label htmlFor={name}>{label}</label>
                        <Text field={name}/>
                    </div>
                );

            case 'List':
                //TODO: Figure a way out to point intermediate models
                return (
                    <ModelChildrenForm field={name} label={label} modelType={childrenType}/>
                );

            default:
                return (
                    <div>
                        <label htmlFor={name}>{label}</label>
                        <Text field={name}/>
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
                <hr/>
            </div>
        )
    }

    render() {
        let props = this.props;

        return (
            <div style={{border: '1px solid #ccc', margin: 4, padding: 4}}>
                <h2>Add new {props.modelMeta.type}</h2>
                <Form
                    onSubmit={(submittedValue) => {
                        props.onSubmit(submittedValue);
                    }}
                    defaultValues={props.selection || {}}
                >
                    { formApi => (
                        <div>
                            {
                                props.modelMeta.attributes.map((column, index) => this.renderFormElement(column, index))
                            }
                            <button type="submit"
                                    onClick={formApi.submitForm}
                                    disabled={props.disableForm}>
                                Submit
                            </button>
                        </div>
                    )}
                </Form>
            </div>
        );
    }
}