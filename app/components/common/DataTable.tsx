import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as MetaSelectors from '../../selectors/Meta';

import * as StoreInterfaces from '../../interfaces/Store';
import * as MetaInterfaces from '../../interfaces/Meta';
import * as DataInterfaces from '../../interfaces/Data';

export function stringifyRow({attrMeta, row}: {
    attrMeta: MetaInterfaces.MetaAttributeProps,
    row: DataInterfaces.DataResourceProps
}, findMeta: MetaSelectors.MetaSelectorProps) {

    let meta = findMeta({type: attrMeta.type});

    let colData: string & DataInterfaces.DataResourceProps = row[attrMeta.name];

    if (meta) {
        if (colData === null) return null;

        return colData[meta.stringify];
    }

    return colData;
}

function getGridHeaders(meta: MetaInterfaces.MetaResourceProps) {
    let columns: Array<MetaInterfaces.MetaAttributeProps> = [];
    if (meta.gridHeaders && meta.gridHeaders.length > 0) {
        meta.attributes.forEach((attr) => {
            if (meta.gridHeaders.indexOf(attr.name) > -1) {
                columns.push(attr);
            }
        })
    } else {
        meta.attributes.forEach((attr) => {
            if (attr.name == this.props.modelMeta.stringify) {
                columns.push(attr);
            }
        })
    }
    return columns;
}

interface DataTableProps {
    meta: MetaInterfaces.MetaResourceProps,
    findMeta?: MetaSelectors.MetaSelectorProps, //TODO: Separate dispatch props
    dataList: Array<DataInterfaces.DataResourceProps>,
}

const DataTable =  (props: DataTableProps) => {

    let gridHeaders = getGridHeaders(props.meta);

    return (
        <div>
            <table className="table table-striped table-bordered table-condensed table-hover">
                <thead>
                <tr>
                    {
                        gridHeaders.map((col, index) => {
                            return (<th key={index}>{col.label}</th>)
                        })
                    }
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.dataList.map((row) => {
                        return (
                            <tr key={row.id}>
                                {
                                    gridHeaders.map((col, index) => {
                                        let attrMeta = col;
                                        return (<td key={index}>{stringifyRow({
                                            attrMeta,
                                            row
                                        }, props.findMeta)}</td>)
                                    })
                                }
                                <td>
                                    <Link to={`/${props.meta.name}/${row.id}`}>Edit</Link>
                                    {/*<a href="#" onClick={props.deleteModelData(row)}>Delete</a>*/}
                                </td>
                            </tr>
                        )
                    })
                }
                {
                    props.dataList.length === 0 ?
                        <tr>
                            <td colSpan={gridHeaders.length + 1}>No records found</td>
                        </tr> : null
                }
                </tbody>
            </table>
        </div>
    );
};

function mapStateToProps(store: StoreInterfaces.StoreStateProps) {
    return {
        findMeta: MetaSelectors.findMeta(store)
    };
}

function mapDispatchToProps(dispatch: Dispatch<StoreInterfaces.StoreStateProps>) {
    return {};
}

export default connect<{}, {}, DataTableProps>(mapStateToProps, mapDispatchToProps)(DataTable);