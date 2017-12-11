import {connect} from 'react-redux';


@connect((store) => {
    let modelKeys = Object.keys(store.meta);
    return {
        modelMetaList: modelKeys.map(k => store.meta[k])
    }
})
export class ModelMetaList extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Label</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.modelMetaList.map((model, index)=> {
                            return (
                                <tr key={index}>
                                    <td>{model.name}</td>
                                    <td>{model.label}</td>
                                    <td>{model.type}</td>
                                    <td>
                                        <ul>
                                            {model.attributes.map((field, fieldIndex)=> {
                                                return (
                                                    <li key={fieldIndex}>
                                                        {field.name} : {field.label} : {field.type}
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </td>
                                    <td>

                                    </td>
                                </tr>
                            );
                        })
                    }
                    <tr></tr>
                    </tbody>
                </table>
            </div>
        )
    }
}