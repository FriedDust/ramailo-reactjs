import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import routes from "../routes";

import * as StoreInterfaces from "../interfaces/store";

import * as MetaInterfaces from "../interfaces/meta";
import * as MetaSelectors from "../selectors/meta";
import * as MetaActions from "../actions/meta";

import SideNavigation from "./common/SideNavigation";

interface OwnProps {}

interface StoreProps {
  metaLoaded: boolean;
  metaList: Array<MetaInterfaces.MetaResourceProps>;
}

interface DispatchProps {
  loadMeta: MetaActions.LoadMetaThunkProps;
}

type AppProps = OwnProps & StoreProps & DispatchProps;

class App extends React.Component<AppProps> {
  componentDidMount() {
    this.props.loadMeta();
  }

  render() {
    if (!this.props.metaLoaded) {
      return <div>Loading ...</div>;
    }

    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <Link className="navbar-brand" to="/">
              Ramailo
            </Link>

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav" />
            </div>
          </nav>
        </header>
        <div className="container-fluid">
          <div className="row">
            <SideNavigation metaList={this.props.metaList} />
            <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
              {routes}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store: StoreInterfaces.StoreStateProps) {
  return {
    metaList: MetaSelectors.metaTypeListSelector(store),
    metaLoaded: store.meta.loaded
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<StoreInterfaces.StoreStateProps>
) {
  return {
    loadMeta: bindActionCreators(MetaActions.loadMeta, dispatch)
  };
}

export default connect<StoreProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
