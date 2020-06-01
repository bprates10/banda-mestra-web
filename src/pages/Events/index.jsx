import React, { useState, useEffect } from 'react';
import api from '../../services/api'
// import Rodal from 'rodal';
// import Map from '../Maps/index'

// include css
import '../../styles/global.css'
import '../../styles/navbar.css'
import '../../styles/body.css'
import '../../styles/main.css'
import './styles.css'
// import 'rodal/lib/rodal.css';

function Events() {

  const [listEvents, setListEvents] = useState([])
  const [visible, setVisible] = useState(false)

  async function getEvents() {

    // avatar_url: 'https://img.ibxk.com.br/ns/quizpop/2015/03/10/10175754730000.png'

    setListEvents([])

    try {
      const res = await api.get('/events')

      console.log("retorno events => ", res.data[0])

      if (res.data) {
        setListEvents(res.data[0])
      }
    }
    catch (error) {
      setListEvents({
        event_avatar_url: 'https://img.ibxk.com.br/ns/quizpop/2015/03/10/10175754730000.png'
      })
      console.log("error =>", error)
    }

  }
  
  const show = () => {
    setVisible(true)
  }

  const hide = () => {
    setVisible(false)
  }

  useEffect(() => {
    // getEvents()
  }, [])

  return (

    <div id="main">

      <div className="two-columns">

        <div className="my-stats">
          <p>Meus Eventos</p>
          <br />
          <div className="container-main">

            <div className="graph">
              {/* <Skills stats={listPlayers.skills} /> */}
            </div>

            <div className="descriptions">
              <p>Avaliação Média (rating): 3 </p>
              <p>Melhor Evento Participado: - </p>
              <p>Último Evento Participado: - </p>
              <p>Total de Eventos Participados: 0 </p>
              <p>Total de Eventos Finalizados: 0 </p>
              <button type="button" className="btn btn-map" onClick={show}>Meu Mapa</button>
              {/* <ModalMap className={dropdown} /> */}
              {/* <button onClick={some} onClose={some}>show</button> */}

              {/* <Rodal visible={visible} onClose={hide} animation={'flip'} width={1000} height={800}>
                <Map />
              </Rodal> */}
            </div>
          </div>

        </div>

        <div className="my-events">
          <p>Meus Eventos</p>
          <br />

          <div className="container-main">

            <div className="graph">
              {/* <Events /> */}
            </div>

            <div className="descriptions">
              <p>Avaliação Média (rating) de Eventos: 0 </p>
              <p>Melhor Evento Criado: N/A</p>
              <p>Último Evento Criado: N/A</p>
              <p>Total de Eventos Criados: 0</p>
              <p>Total de Eventos Finalizados: 0</p>
              {/* <button type="button" className="btn btn-add-event" onClick={showDropdown}>Criar Evento</button> */}
              {/* <ModalCreateEvent className={dropdown} name={listPlayers.name} /> */}
              {/* <button type="button" className="btn btn-search-event" onClick={showDropdown}>Procurar Evento</button> */}
              {/* <ModalFindEvent className={dropdown} name={listPlayers.name} /> */}
            </div>
          </div>
        </div>

      </div>

      <div className="icon-navbar-left">
        {/* <div title="Mapa" style={{ color: 'red' }} onClick={genericFunction}><Explore /></div>
        <div tittle="Perfil" style={{ color: 'orange' }} onClick={genericFunction}><Person /></div>
        <div title="Eventos" style={{ color: 'green' }} onClick={genericFunction}><SportsEsports /></div> */}
      </div>
    </div >
  );
}

export default Events;
