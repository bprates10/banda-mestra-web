import React, { useState, useEffect } from 'react';
import api from '../../services/api'
// import Rodal from 'rodal';
// import Map from '../Maps/index'

// include css
// import '../;../styles/global.css'
// import '../../styles/navbar.css'
// import '../../styles/body.css'
// import '../../styles/main.css'
import './styles.css'
import 'rodal/lib/rodal.css';

// include charts
// import Skills from "../../components/SkillChart"
// import Events from "../../components/EventChart"

// importando modais
// import ModalCreateEvent from '../../components/ModalCreateEvent.jsx';
// import ModalFindEvent from '../../components/ModalFindEvent.jsx';

// include icons
// import { Person, Explore, SportsEsports } from '@material-ui/icons';
// import PlusOneIcon from '@material-ui/icons/PlusOne';
import { Explore, SportsEsports } from '@material-ui/icons';

function App(props) {

  const [listPlayers, setListPlayers] = useState([])
  const isDisabled = true
  const isHidden = false
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    console.log("listPlayers => ", listPlayers)
  }, [listPlayers])

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
        created_at: "2020-05-20 22:43:11",
        email: "bprates10@gmail.com",
        id: 1,
        username: "bprates10 FIXO",
        avatar_url: 'https://img.ibxk.com.br/ns/quizpop/2015/03/10/10175754730000.png',
        nome: "Nome Fixo",
        biography: "Biografia fixa."
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
    getPlayer()
  }, [])

  return (

    <div className="home">

      <div className="navbar-home">

        <img className="navbar-photo-profile" src={listPlayers.avatar_url} alt="Imagem de Perfil" />

        <div className="navbar-form">
          <p>{listPlayers.username}</p>
          <br />
          <label>Nome:</label>
          <input type="text" disabled={{ isDisabled }} value={listPlayers.name} />
          <label>Level:</label>
          <input type="text" className="input-small" value={99} disabled={{ isDisabled }} />
          <label className="label-rating">Rating:</label>
          <input type="text" className="input-small" value={99} disabled={{ isDisabled }} />
          <label>Biografia:</label>
          <textarea type="text" value={listPlayers.biography} style={{ height: 100, padding: '3%' }} disabled={{ isDisabled }} />
        </div>
      </div>

      <div className="body-home">

        {/* <div className="column-50-100-left"> */}
        <p>Minhas Estatísticas</p>
        <br />
        <div className="home-body-content">

          <div className="home-card">
            <p>GRAFICO</p>
            {/* <Skills stats={listPlayers.skills} /> */}
          </div>

          <div className="home-descriptions content-half">
            <p>Avaliação Média (rating): </p>3
            <p>Melhor Evento Participado: - </p>
            <p>Último Evento Participado: - </p>
            <p>Total de Eventos Participados: 0 </p>
            <p>Total de Eventos Finalizados: 0 </p>
            {/* <button type="button" className="btn btn-map" onClick={show}>Meu Mapa</button> */}
            {/* <ModalMap className={dropdown} /> */}
            {/* <button onClick={some} onClose={some}>show</button> */}

            {/* <Rodal visible={visible} onClose={hide} animation={'flip'} width={1000} height={800}>
                <Map />
              </Rodal> */}
          </div>
        </div>

        <br />
        <p>Meus Eventos</p>
        <br />
        <div className="home-body-content">

          {/* <div className="home-card"> */}
            {/* <p>GRAFICO</p> */}
            {/* <Events /> */}
          {/* </div> */}

          <div className="home-descriptions content-full">
            <p>Avaliação Média (rating) de Eventos: 0 </p>
            {/* <p>Melhor Evento Criado: N/A</p> */}
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

      <div className="navbar-home-left">
        <div title="Mapa" style={{ color: 'red' }} onClick={() => props.history.push('/maps')}><Explore /></div>
        {/* <div title="Perfil" style={{ color: 'orange' }} onClick={() => props.history.push('/profile')}><Person /></div> */}
        <div title="Eventos" style={{ color: 'green' }} onClick={() => props.history.push('/events')}><SportsEsports /></div>
        {/* <div title="Adicionar Evento" style={{ color: 'green' }} onClick={[]}><PlusOneIcon /></div> */}
      </div>
    </div >
  );
}

export default App;
