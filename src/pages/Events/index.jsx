import React, { useState, useEffect } from 'react';
import api from '../../services/api'

import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// include css
// import '../../styles/global.css'
// import '../../styles/navbar.css'
// import '../../styles/body.css'
// import '../../styles/main.css'
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

  useEffect(() => {
    getEvents()
  }, [])

  const marks = [
    {
      value: 10,
      label: '1',
    },
    {
      value: 20,
      label: '2',
    },
    {
      value: 30,
      label: '3',
    },
    {
      value: 40,
      label: '4',
    },
    {
      value: 50,
      label: '5',
    },
    {
      value: 60,
      label: '6',
    },
    {
      value: 70,
      label: '7',
    },
    {
      value: 80,
      label: '8',
    },
    {
      value: 90,
      label: '9',
    },
    {
      value: 100,
      label: '10',
    },
  ];

  function valuetext(value) {
    return `${value}`;
  }

  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }

  return (

    <div id="events">

      <div className="events-content">

        <div className="my-stats">

          <p style={{ color: '#fff' }}>Criar Evento</p>
          <br />
          <div className="events-create">

            <div className="events-descriptions">
              <p>Nome do Evento:</p>
              <TextField id="outlined-basic" label="Nome do Evento" variant="outlined" style={{ width: '60%' }} />
              <br />
              <p>Descrição do Evento:</p>
              {/* <textarea style={{ border: '1px dashed palegreen' }} /> */}
              <TextareaAutosize
                rowsMax={4}
                aria-label="maximum height"
                placeholder="Escreva aqui uma descrição para o evento :)"
                style={{ backgroundColor: 'transparent', height: 100, width: '60%' }}
              />
              <br />
              <p>Observações do Evento:</p>
              {/* <textarea style={{ border: '1px dashed palegreen' }} /> */}
              <TextareaAutosize
                rowsMax={4}
                aria-label="maximum height"
                placeholder="Escreva aqui as observações (por exemplo, levar um refri ou salgadinho é legal :)"
                style={{ backgroundColor: 'transparent', height: 100, width: '60%' }}
              />
              <br />
              <br />
            </div>

            <div className="events-descriptions">
              <p>Tabuleiro Selecionado:</p>
              <select>
                <option>1</option>
                <option>1</option>
                <option>1</option>
                <option>1</option>
              </select>

              <Typography id="discrete-slider-restrict" gutterBottom>
                Número de Jogadores:
              </Typography>
              <Slider
                defaultValue={20}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
              />

              <FormControlLabel
                control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                label="Restrição"
              />

              <p>Endereço:</p>
              <input type="text" placeholder="Longitude" />
              <input type="text" placeholder="latitude" />

            </div>

            <div>
              <button type="button" className="btn btn-add-event" onClick={[]}>Adicionar</button>
              <button type="button" className="btn btn-search-event" onClick={[]}>Voltar</button>
            </div>

          </div>

        </div>

      </div>
    </div >
  );
}

export default Events;
