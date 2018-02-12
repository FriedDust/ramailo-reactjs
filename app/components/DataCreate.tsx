import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import * as StoreInterfaces from "../interfaces/store";
import * as MetaInterfaces from "../interfaces/meta";
import * as DataInterfaces from "../interfaces/data";

import * as MetaSelectors from "../selectors/meta";
import * as DataSelectors from "../selectors/data";

import * as DataActions from "../actions/data";

import ModelNavigation from "../components/common/ModelNavigation";
import DataForm from "../components/common/DataForm";

interface OwnProps
  extends RouteComponentProps<{
      modelName: string;
    }> {}

interface StoreProps {
  meta: MetaInterfaces.MetaResourceProps;
}

interface DispatchProps {}

type DataCreateProps = OwnProps & StoreProps & DispatchProps;

class DataCreate extends React.Component<DataCreateProps> {
  constructor(props: DataCreateProps) {
    super(props);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps: DataCreateProps) {}

  render() {
    return (
      <div>
        <ModelNavigation title={this.props.meta.label} meta={this.props.meta} />
        <DataForm
          disable={false}
          isEdit={false}
          attributes={this.props.meta.attributes}
          onSubmit={() => {
            console.log("hello");
          }}
          parentMetaType={"test"}
        />
      </div>
    );
  }
}

function mapStateToProps(
  state: StoreInterfaces.StoreStateProps,
  props: OwnProps
) {
  let modelName: string = props.match.params.modelName;
  let meta = MetaSelectors.findMeta(state)({ name: modelName });

  return {
    meta
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<StoreInterfaces.StoreStateProps>
) {
  return {};
}

let enhance = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(enhance(DataCreate));
