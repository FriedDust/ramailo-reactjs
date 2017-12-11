export class Dropdown extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <div>
                <ul style={{maxHeight: 100, overflow: 'auto'}}>
                    {
                        this.props.modelDataList.map((md) => {
                            return (
                                <li
                                    key={md.id}
                                    onClick={() => {
                                        this.props.onSelect(md);
                                    }}
                                >
                                    {
                                        md.name //TODO : Need a default attribute field from API
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