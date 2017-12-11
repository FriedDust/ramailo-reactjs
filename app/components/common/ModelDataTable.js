import ReactDataGrid from 'react-data-grid';

export class ModelDataTable extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.getColumns = this.getColumns.bind(this);
    }

    getColumns() {
        let columns = [];
        let modelMeta = this.props.modelMeta;
        let modelMetaAtrributes = modelMeta.attributes;
        modelMetaAtrributes.forEach((attr) => {
            columns.push({
                key: attr.name,
                name: attr.label
            });
        });
        return columns;
    }

    render() {
        if (!this.props.modelDataList) {
            return (
                <div>Loading</div>
            )
        }
        return (
            <div>
                <h1>{this.props.modelMeta.label}</h1>
                <ReactDataGrid
                    enableCellSelect={true}
                    columns={this.getColumns()}
                    rowGetter={(index) => {
                        return this.props.modelDataList[index];
                    }}
                    rowsCount={this.props.modelDataList.length}
                    minHeight={200}
                />
            </div>
        )
    }
}