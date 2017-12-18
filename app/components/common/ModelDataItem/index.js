export class ModelDataItem extends React.Component {

    renderListItem({attr, props, index}) {
        let modelDataItem = props.modelDataItem;

        if (attr.type === "List") {
            let modelMeta = props.getModelMeta(attr.childrenType);
            let modelMetaTypeList = props.modelMetaTypeList;
            let getModelMeta = props.getModelMeta;
            return (
                <li key={index}>
                    <span>{attr.label}:</span>
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
                </li>
            );
        }

        if (props.modelMetaTypeList.indexOf(attr.type) > -1) {
            if (props.parentModelType === attr.type || !modelDataItem[attr.name]) {
                return null;
            }
            return (
                <li key={index}>
                    {attr.label} : {modelDataItem[attr.name]['name']}
                </li>
            );
        }

        return (
            <li key={index}>
                {attr.label} : {modelDataItem[attr.name]}
            </li>
        );
    }

    render() {
        let props = this.props;
        return (
            <div>
                <ul>
                    {
                        props.modelMeta.attributes.map((attr, index) => {
                            return this.renderListItem({attr, props, index})
                        })
                    }
                </ul>
            </div>
        );
    }
}