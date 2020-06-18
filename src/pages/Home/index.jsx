import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import { logout } from "../../services/auth";

import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import './styles.css'
import 'rodal/lib/rodal.css';

import PlusOneIcon from '@material-ui/icons/PlusOne';
import { Explore, SportsEsports } from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';

import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function App(props) {

  const [listPlayers, setListPlayers] = useState([])
  const [listEvents, setListEvents] = useState([])

  useEffect(() => {

    getPlayer()
    // getEvents()

    // console.log('local storage mail -> ', localStorage.getItem("@bandamestra-Email"))
    // console.log('local storage token -> ', localStorage.getItem("@airbnb-Token"))
  }, [])

  async function getPlayer() {

    setListPlayers([])

    try {

      const res = await api.get('/users/' + localStorage.getItem("@bandamestra-Email"))

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

  async function getEvents() {

    setListEvents([])

    try {
      const email = localStorage.getItem('@bandamestra-Email')
      const res = await api.get('/events', { email, latitude: -29.927630, longitude: -51.043640 })

      console.log("retorno users => ", res.data[0])

      if (res.data) {

        setListEvents(res.data[0])
      }
    }
    catch (error) {
      console.log("error =>", error)
    }

  }

  const handleLogout = () => {
    logout();
    props.history.push("/");
  }


  const products = [{
    title: 'titulo',
    description: 'descrição',
    playersnum: 5,
    type: 'modo combatente',
    created_at: '01-01-2001',
    restrict: 'restrito'
  }]
  const columns = [
    { dataField: 'title', text: 'Título' },
    { dataField: 'description', text: 'Descrição' },
    { dataField: 'playersnum', text: 'Nro. Jogadores' },
    { dataField: 'type', text: 'Tipo de Combate' },
    { dataField: 'created_at', text: 'Criado em:' },
    { dataField: 'restrict', text: 'Restrito' },
  ]

  return (

    <div className="home">

      <div className="navbar-home">

        <img className="navbar-photo-profile" src={listPlayers.avatar_url ? listPlayers.avatar_url : ''} alt="Imagem de Perfil" />

        <div className="navbar-form">
          <div className="events-form-separator">
            <TextField
              disabled
              value={listPlayers.name}
              fullWidth
              style={{ color: '#fff' }}
            />

            <TextField
              disabled
              value={listPlayers.username}
              style={{ color: '#fff', fontFamily: 'bold' }}
            />

            <TextField
              label="Level"
              disabled
              value={99}
              size='small'
              style={{ color: '#fff' }}
            />

            <TextField
              id="standard-required"
              label="Rating"
              disabled
              value={99}
              color={'primary'}
            />

            <p>Bio:</p>
            <TextareaAutosize
              disabled
              rowsMin={3}
              rowsMax={3}
              defaultValue={listPlayers.biography}
              style={{ backgroundColor: 'transparent', color: '#fff' }}
            />
          </div>
        </div>

      </div>

      <div className="body-home">
        <br />
        <p>Meus Eventos</p>
        <br />
        <div className="home-body-content">

          <div className="home-descriptions content-full">
            <BootstrapTable
              bordered={true}
              keyField='id'
              data={products}
              columns={columns}
              fullWidth
              style={{ border: '1px solid blue' }}
            // rowStyle={{ backgroundColor: 'red' }} 
            />
          </div>
        </div>
        <br />
        <p>Eventos Próximos</p>
        <br />
        <div className="home-body-content">

          <div className="home-card">
            {/* <p>GRAFICO</p> */}
            {/* <Skills stats={listPlayers.skills} /> */}
          </div>

          <div className="home-descriptions content-half">
            <p>Avaliação Média (rating): </p>3
            <p>Melhor Evento Participado: - </p>
            <p>Último Evento Participado: - </p>
            <p>Total de Eventos Participados: 0 </p>
            <p>Total de Eventos Finalizados: 0 </p>
          </div>
        </div>

      </div>

      <div className="navbar-home-left">
        <div className="map" title="Mapa" style={{ color: 'red' }} onClick={() => props.history.push('/maps')}><Explore /></div>
        <div className="event" title="Eventos" style={{ color: 'green' }} onClick={() => props.history.push('/events')}><SportsEsports /></div>
        <div className="game" title="Games" style={{ color: 'orange' }} onClick={() => props.history.push('/games')}><PlusOneIcon /></div>
        <div className="profile" title="Perfil" style={{ color: 'darkorchid' }} onClick={handleLogout}><FaceIcon /></div>
        <div className="logout" title="Logout" style={{ color: 'orange' }} onClick={handleLogout}><ExitToAppIcon /></div>
      </div>
    </div >
  );
}

export default App;
