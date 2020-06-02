import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { logout } from "../../services/auth";
import Dimensions from "react-dimensions";
import MapGL from "react-map-gl";
import PropTypes from "prop-types";
import { ModalRoute } from "react-router-modal";

import Button from "../../components/Button";
import { Container, ButtonContainer, PointReference } from "./styles";

import debounce from "lodash/debounce";
import api from "../../services/api";

import Events from "../../components/Events";
import AddEvent from "../AddEvent";

import AddLocationIcon from '@material-ui/icons/AddLocation';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
      this.setState({ events: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  handleLogout = e => {
    // logout();
    this.props.history.push("/home");
  };

  renderActions() {
    return (
      <ButtonContainer>
        <Button
          color="#fc6963"
          onClick={() => this.setState({ addActivate: true })}
        >
          <i className="fa fa-plus" />
          <AddLocationIcon />
        </Button>
        <Button color="#222" onClick={this.handleLogout}>
          <i className="fa fa-times" />
          <ExitToAppIcon />
        </Button>
      </ButtonContainer>
    );
  }

  renderButtonAdd() {
    return (
      this.state.addActivate && (
        <PointReference>
          <i className="fa fa-map-marker" />
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
        </PointReference>
      )
    );
  }

  render() {
    const { containerWidth: width, containerHeight: height, match } = this.props;
    const { events, addActivate } = this.state;
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
          <Events events={events} />
        </MapGL>
        {/* {!addActivate && <Events match={match} events={events} />} */}
        {this.renderActions()}
        {this.renderButtonAdd()}
        {/* <ModalRoute
          path={`${match.url}/events/add`}
          parentPath={match.url}
          component={AddEvent}
        /> */}
      </Fragment>
    );
  }
}

const DimensionedMap = withRouter(Dimensions()(Map));
const App = () => (
  <Container>
    <DimensionedMap />
  </Container>
);

export default App;