import React from "react"
import { Marker } from "react-map-gl"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import { Pin } from "./styles"

// const intlMonetary = new Intl.NumberFormat("pt-BR", {
//   style: "currency",
//   currency: "BRL",
//   minimumFractionDigits: 2
// })

const Events = ({ events }) =>
  events.map(event => (
    <Marker
      key={event.id}
      longitude={parseFloat(event.longitude)}
      latitude={parseFloat(event.latitude)}
    >
      <Pin>
        <Link to="">{event.title}</Link>
      </Pin>
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
      latitude: PropTypes.number
    })
  ).isRequired
};

export default Events;