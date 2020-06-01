import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import Rodal from 'rodal';
import Map from '../Maps/index'

// include css
import '../../styles/global.css'
import '../../styles/navbar.css'
import '../../styles/body.css'
import '../../styles/main.css'
import './styles.css'
import 'rodal/lib/rodal.css';

// include charts
import Skills from "../../components/SkillChart"
import Events from "../../components/EventChart"

// importando modais
// import ModalCreateEvent from '../../components/ModalCreateEvent.jsx';
// import ModalFindEvent from '../../components/ModalFindEvent.jsx';

// include icons
// import { Person, Explore, SportsEsports } from '@material-ui/icons';

function App() {

  const [listPlayers, setListPlayers] = useState([])
  const isDisabled = true
  // state da modal
  // const [dropdown, setDropdown] = useState("")
  // variavel que define o estilo da camada main
  const [mainStyle, setMainStyle] = useState({})
  // variavel que define se os gráficos estarão ocultos
  const [isHidden, setIsHidden] = useState(false)

  async function getPlayer() {

    setListPlayers([])

    try {
      const res = await api.get('/users')

      console.log("retorno users => ", res.data[0])

      if (res.data) {
        setListPlayers(res.data[0])
      }
    }
    catch (error) {
      setListPlayers({
        avatar_url: 'https://img.ibxk.com.br/ns/quizpop/2015/03/10/10175754730000.png'
      })
      console.log("error =>", error)
    }

  }

  const showModal = () => {
    setIsHidden(!isHidden)
  }

  useEffect(() => {
    getPlayer()
  }, [])

  return (

    <div id="main" style={mainStyle}>
      <div className="navbar">

        <img src={listPlayers.avatar_url} alt="Imagem de Perfil" />

        <div className="form-data">
          <p>{listPlayers.username}</p>
          <br />
          <label>Nome:</label>
          <input type="text" disabled={{ isDisabled }} value={listPlayers.name} />
          <label>Level:</label>
          <input type="text" className="input-small" value={listPlayers.level} disabled={{ isDisabled }} />
          <label className="label-rating">Rating:</label>
          <input type="text" className="input-small" value={listPlayers.rating} disabled={{ isDisabled }} />
          <label>Biografia:</label>
          <textarea type="text" value={listPlayers.bio} style={{ height: 100, padding: '3%' }} disabled={{ isDisabled }} />
        </div>
      </div>

      <div className="my-grafics">

        <div className="my-stats">
          <p>Minhas Estatísticas</p>
          <br />
          <div className="container-main">

            <div className="graph">
              <Skills stats={listPlayers.skills} />
            </div>

            <div className="descriptions">
              <p>Avaliação Média (rating): 3 </p>
              <p>Melhor Evento Participado: - </p>
              <p>Último Evento Participado: - </p>
              <p>Total de Eventos Participados: 0 </p>
              <p>Total de Eventos Finalizados: 0 </p>
              <button type="button" className="btn btn-map" onClick={showModal}>Meu Mapa</button>
              {/* <ModalMap className={dropdown} /> */}
              {/* <button onClick={some} onClose={some}>show</button> */}

              <Rodal closeOnEsc={true} animation={'flip'} width={1000} height={600} visible={isHidden}>
                <Map />
              </Rodal>
            </div>
          </div>

        </div>

        <div className="my-events">
          <p>Meus Eventos</p>
          <br />

          <div className="container-main">

            <div className="graph" hidden={isHidden}>
              <Events />
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

export default App;
