export class ModelDataItem extends React.Component {

    renderListItem({attr, props, index}) {
        let modelDataItem = props.modelDataItem;

        if (attr.type === "List") {
            let modelMeta = props.getModelMeta(attr.childrenType);
            let modelMetaTypeList = props.modelMetaTypeList;
            let getModelMeta = props.getModelMeta;
            return (
                <td key={index}>
                    <ul>
                        {
                            modelDataItem[attr.name].map((childModelDataItem, childIndex) => {
                                return (
                                    <ModelDataItem
                                        modelDataItem={childModelDataItem}
                                        modelMeta={modelMeta}
                                        modelMetaTypeList={modelMetaTypeList}
                                        getModelMeta={getModelMeta}
                                        parentModelType={props.parentModelType}/>
                                )
                            })
                        }
                    </ul>
                </td>
            );
        }

        if (props.modelMetaTypeList.indexOf(attr.type) > -1) {
            if (props.parentModelType === attr.type || !modelDataItem[attr.name]) {
                return null;
            }
            return (
                <td key={index}>
                    {modelDataItem[attr.name]['name']}
                </td>
            );
        }

        return (
            <td key={index}>
                {modelDataItem[attr.name]}
            </td>
        );
    }

    render() {
        let props = this.props;
        return (
            <tr onClick={this.props.onClick}>
                {
                    props.columns.map((attr, index) => {
                        return this.renderListItem({attr, props, index})
                    })
                }
            </tr>
        );
    }
}