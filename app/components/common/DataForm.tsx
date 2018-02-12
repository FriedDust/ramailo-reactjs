import * as React from 'react';
import {Form, Text} from 'react-form';
import {connect} from 'react-redux';

import * as MetaSelectors from '../../selectors/meta';

import * as StoreInterfaces from '../../interfaces/store';
import * as MetaInterfaces from '../../interfaces/meta';
import * as DataInterfaces from '../../interfaces/data';

interface OwnProps {
    disable: boolean,
    isEdit: boolean,
    selection?: DataInterfaces.DataResourceProps,
    attributes: Array<MetaInterfaces.MetaAttributeProps>,
    onSubmit: (submittedValue: DataInterfaces.DataResourceProps, isEdit: boolean) => void,
    parentMetaType: string
}

interface StoreProps {
    metaTypeKeyList?: Array<string>
}

interface DispatchProps {

}

type DataFormProps = OwnProps & StoreProps & DispatchProps;

const DataForm = (props: DataFormProps) => {

    function getFormElement({label, type, name}: MetaInterfaces.MetaAttributeProps) {

        if (props.metaTypeKeyList.indexOf(type) > -1) {
            if (type === props.parentMetaType) {
                return null;
            }
            // return (
            //     <TypeAhead field={name} modelType={type}/>
            // );
            return <span>TypeAhead</span>
        }

        switch (type) {

            case 'String':
                return (
                    <div className="form-group">
                        <label>{label}</label>
                        <Text field={name} className="form-control"/>
                    </div>
                );

            case 'BigDecimal':
            case 'Integer':
                return (
                    <div className="form-group">
                        <label>{label}</label>
                        <Text field={name} className="form-control"/>
                    </div>
                );

            case 'List':
                // return (
                //     <ModelChildrenForm field={name} parentModelType={this.props.formMeta.type}
                //                        modelType={childrenType}/>
                // );
                return <span>List</span>;

            default:
                return (
                    <div className="form-group">
                        <label>{label}</label>
                        <Text field={name} className="form-control"/>
                    </div>
                );
        }
    }

    function renderFormElement(attributes: MetaInterfaces.MetaAttributeProps, index: number) {
        if (attributes.autoPk) {
            return null;
        }
        return (
            <div key={index}>
                {getFormElement(attributes)}
            </div>
        )
    }

    return (
        <Form
            onSubmit={(submittedValue: DataInterfaces.DataResourceProps) => {
                props.onSubmit(submittedValue, props.isEdit);
            }}
            defaultValues={props.selection || {}}
        >
            {
                formApi => (
                    <div className="form-group">
                        {
                            props.attributes.map((attribute, index) => renderFormElement(attribute, index))
                        }
                        <div className="d-flex flex-row-reverse">
                            <button type="submit"
                                    onClick={formApi.submitForm}
                                    disabled={props.disable}
                                    className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                )
            }
        </Form>
    );
};

function mapStateToProps(store: StoreInterfaces.StoreStateProps) {
    let metaTypeKeyList = MetaSelectors.metaTypeKeyListSelector(store);
    return {
        metaTypeKeyList
    };
}


export default connect<StoreProps, DispatchProps, OwnProps>(mapStateToProps)(DataForm);