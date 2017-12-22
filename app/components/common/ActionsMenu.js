import * as httpUtils from '../../utils/http';
import swal from 'sweetalert2';
import {connect} from 'react-redux';

import {DataForm} from './DataForm';

@connect((store, props) => {
    let modelMetaTypeList = Object.keys(store.meta.types);
    return {modelMetaTypeList};
})
export class ActionsMenu extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.isStaticAction = !props.modelDataItem;
        this.state = {
            formMeta: {
                attributes: [],
                type: null,
            },
            activeAction: null,
            formOnSubmit: () => {
            },
            dataFormActive: false
        };

        this.toggleDataForm = this.toggleDataForm.bind(this);
        this.fetchInputParams = this.fetchInputParams.bind(this);
        this.buildUrl = this.buildUrl.bind(this);
        this.buildParams = this.buildParams.bind(this);
    }

    toggleDataForm(dataFormActive) {
        return () => {
            this.setState({dataFormActive});
        }
    }

    buildParams(action, submittedData) {
        let params = {};
        let data = {};
        action.arguments.forEach(({type, name}) => {
            if (type === "Integer") {
                // TODO: Need to convert/validate at input element level
                submittedData[name] = parseInt(submittedData[name]);
            }
            if (action.methodType !== "GET") {
                data[name] = submittedData[name];
                return;
            }
            params[name] = submittedData[name];
            if (this.props.modelMetaTypeList.indexOf(type) > -1) {
                if (type === this.props.modelMeta.type) {
                    return;
                }
                params[name] = submittedData[name]['id'];
            }
        });
        return {
            params, data
        };
    }

    fetchInputParams(action, callback) {
        if (!action.arguments.length) {
            callback({}, {});
            return;
        }
        this.setState({
            formMeta: {
                ...this.state.formMeta,
                attributes: action.arguments,
            },
            activeAction: action,
            formOnSubmit: (submittedData) => {
                let {params, data} = this.buildParams(action, submittedData);
                callback(params, data);
                this.toggleDataForm(false)();
            }
        }, () => {
            this.toggleDataForm(true)();
        });
    }

    buildUrl(action) {
        let modelMeta = this.props.modelMeta;
        let modelDataItem = this.props.modelDataItem;

        return this.isStaticAction ?
            `http://localhost:8081/api/${modelMeta.name}/${action.pathName}` :
            `http://localhost:8081/api/${modelMeta.name}/${modelDataItem.id}/${action.pathName}`;
    }

    runAction(action) {
        return () => {

            this.fetchInputParams(action, (params, data) => {
                httpUtils.axiosRequest({
                    url: this.buildUrl(action),
                    method: action.methodType,
                    params: params,
                    data: data
                }).then((response) => {
                    swal({text: response.data});
                });
            });

        };
    }

    render() {
        let actions = this.isStaticAction ? this.props.modelMeta.staticActions : this.props.modelMeta.actions;
        if (!actions) {
            return null;
        }
        return (
            <div className="mr-2 btn-group">
                {
                    actions.map((action, index) => {
                        return (
                            <button key={index} className="btn btn-sm btn-outline-primary" type="button"
                                    onClick={this.runAction(action)}>
                                {action.label}
                            </button>
                        )
                    })
                }

                {
                    (this.state.dataFormActive) ?
                        <div className="modal show"
                             style={{display: 'block'}}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">{this.state.activeAction.label}</h5>
                                        <button type="button"
                                                onClick={this.toggleDataForm(false)}
                                                className="close" aria-label="Close">
                                            <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <DataForm formMeta={this.state.formMeta}
                                                  onSubmit={this.state.formOnSubmit}
                                                  isEdit={false}
                                                  selection={{}}
                                                  disableForm={false}/>
                                    </div>
                                </div>
                            </div>
                        </div> : null
                }
            </div>
        );
    }
}