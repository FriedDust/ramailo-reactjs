export class Dropdown extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        let props = this.props;

        return (
            <div>
                <ul style={{maxHeight: 100, overflow: 'auto'}}>
                    {
                        props.modelDataList.map((md) => {
                            return (
                                <li
                                    key={md.id}
                                    onClick={() => {
                                        props.onSelect(md);
                                    }}
                                >
                                    {
                                        md[props.selector] //TODO : Need a default attribute field from API
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}