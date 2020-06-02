import React, { useState, useEffect } from 'react';
import api from '../../services/api'

// include css
import '../../styles/global.css'
import '../../styles/navbar.css'
import '../../styles/body.css'
import '../../styles/main.css'
import './styles.css'

function Events(props) {

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
    getEvents()
  }, [])

  return (

    <div id="main">

      <div className="two-columns">

        <div className="my-stats">
          <p>Criar Evento</p>
          <br />
          <div className="container-main">

            <div className="descriptions">
              <p>Nome do Evento:</p>
              <input type="text" placeholder="Nome do Evento" />
              <br />
              <p>Descrição do Evento:</p>
              <textarea style={{ border: '1px dashed palegreen' }} />
              <br />
              <p>Tabuleiro Selecionado:</p>
              <select>
                <option>Jogo 1</option>
                <option>Jogo 1</option>
                <option>Jogo 1</option>
                <option>Jogo 1</option>
              </select>
              <br />
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
        <p>BOTÃO VOLTAR</p>
      </div>
    </div >
  );
}

export default Events;
