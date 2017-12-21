import * as httpUtils from '../../utils/http';
import swal from 'sweetalert2';

import {ModelDataForm} from './ModelDataForm';

export class ActionsMenu extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.isStaticAction = !props.modelDataItem;

        this.buildUrl = this.buildUrl.bind(this);
        this.buildParams = this.buildParams.bind(this);
    }

    buildUrl(action) {
        let modelMeta = this.props.modelMeta;
        let modelDataItem = this.props.modelDataItem;

        return this.isStaticAction ?
            `http://localhost:8081/api/${modelMeta.name}/${action.pathName}` :
            `http://localhost:8081/api/${modelMeta.name}/${modelDataItem.id}/${action.pathName}`;
    }

    buildParams(action) {
        return {};
    }

    runAction(action) {
        return () => {
            httpUtils.axiosRequest({
                url: this.buildUrl(action),
                method: action.methodType,
                params: this.buildParams(action)
            }).then((response) => {
                swal({text: response.data});
            });
        };
    }

    render() {
        let actions = this.isStaticAction ? this.props.modelMeta.staticActions : this.props.modelMeta.actions;
        if (!actions) {
            return null;
        }
        return (
            <div className="btn-group mr-2">
                {
                    actions.map((action) => {
                        return (
                            <button className="btn btn-sm btn-outline-primary" type="button"
                                    onClick={this.runAction(action)}>
                                {action.label}
                            </button>
                        )
                    })
                }
                {/*<ModelDataForm/>*/}
            </div>
        );
    }
}