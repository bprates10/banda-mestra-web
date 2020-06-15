import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import Dimensions from "react-dimensions";
import MapGL from "react-map-gl";
import PropTypes from "prop-types";

// import Button from "../../components/Button";
// import { Container, ButtonContainer, PointReference } from "./styles";
import './styles.css'

import debounce from "lodash/debounce";
import api from "../../services/api";

import { ModalRoute } from "react-router-modal";
import AddEvents from "../AddEvent/index.jsx"
import Events from "../../components/Events/index.jsx";

import AddLocationIcon from '@material-ui/icons/AddLocation';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditLocationIcon from '@material-ui/icons/EditLocation';

const TOKEN =
  "pk.eyJ1IjoiYnByYXRlczEwIiwiYSI6ImNrYW9tZWtvMDA0eWcycHF5Mmw2eGFvaWwifQ.HSBDN-VZnZbrfx1YpljnCg";

class Map extends Component {

  constructor() {
    super();
    this.updateEventsLocalization = debounce(
      this.updateEventsLocalization,
      500
    );
  }

  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired
  };

  state = {
    viewport: {
      latitude: -29.9276296,
      longitude: -51.0436396,
      zoom: 15,
      bearing: 0,
      pitch: 0
    },
    events: [],
    addActivate: false
  };

  handleAddEvent = () => {

    const { match, history } = this.props;
    console.log('match => ', match)
    const { latitude, longitude } = this.state.viewport;
    history.push(
      `${match.url}/events/add?latitude=${latitude}&longitude=${longitude}`
    );

    this.setState({ addActivate: false });
  };

  componentDidMount() {
    this.loadEvents();
  }

  updateEventsLocalization() {
    this.loadEvents();
  }

  loadEvents = async () => {
    const { latitude, longitude } = this.state.viewport;
    try {
      const response = await api.get("/events", {
        params: { latitude, longitude }
      });
      console.log("response => ", response.data)
      this.setState({ events: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  handleLogout = () => {
    this.props.history.push("/home");
  };

  renderActions() {
    return (
      <div className="ButtonContainer">

        <div className="Button"
          // color="#fc6963"
          onClick={() => this.setState({ addActivate: true })}
        >
          <i className="fa fa-plus" />
          <AddLocationIcon />
        </div>

        <div className="Button" color="#222" onClick={this.handleLogout}>
          <i className="fa fa-times" />
          <ExitToAppIcon />
        </div>

      </div>
    );
  }

  renderButtonAdd() {
    return (
      this.state.addActivate && (
        <div className="PointReference">
          <EditLocationIcon />
          <div>
            <button onClick={this.handleAddEvent} type="button">
              Adicionar
            </button>
            <button
              onClick={() => this.setState({ addActivate: false })}
              className="cancel"
            >
              Cancelar
            </button>
          </div>
        </div>
      )
    );
  }

  render() {

    const { containerWidth: width, containerHeight: height, match } = this.props;
    const { events, addActivate } = this.state;
    console.log('addActivate => ', addActivate)
    return (
      <Fragment>
        <MapGL
          width={width}
          height={height}
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={TOKEN}
          onViewportChange={viewport => this.setState({ viewport })}
          onViewStateChange={this.updateEventsLocalization.bind(this)}
        >

          {!addActivate && <Events events={events} />}

        </MapGL>

        {this.renderActions()}
        {this.renderButtonAdd()}

        <ModalRoute
          path={`${match.url}/events/add`}
          parentPath={match.url}
          component={AddEvents}
        />
      </Fragment>
    );
  }
}

const DimensionedMap = withRouter(Dimensions()(Map));
const App = () => (
  <div className="Container">
    <DimensionedMap />
  </div>
);

export default App;