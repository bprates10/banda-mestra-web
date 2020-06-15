import React from "react"
import { Marker } from "react-map-gl"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import './styles.css'

const Events = ({ events }) =>
  events.map(event => (
    <Marker
      key={event.id}
      longitude={parseFloat(event.longitude)}
      latitude={parseFloat(event.latitude)}
    >
      <div className="Pin">
        <Link to="">
          <img style={{ width: 60, height: 60 }} src={event.images[0].url} />
        </Link>
      </div>
      <div className="event-title">{event.title}</div>
    </Marker>
  ));

Events.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      playersnum: PropTypes.number,
      longitude: PropTypes.number,
      latitude: PropTypes.number,
      images: []
    })
  ).isRequired
};

export default Events;