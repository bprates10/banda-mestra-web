import React, { useState, useEffect } from 'react';
import api from '../../services/api'

import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// button icons
import AddIcon from '@material-ui/icons/Add';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';

// include css
import './styles.css'

function Events(props) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [observation, setObservation] = useState('')
  const [gameTypeValue, setGameTypeValue] = useState('')
  const [numPlayers, setNumPlayers] = useState(1)
  const [isRestriction, setIsRestriction] = useState(false)

  const gameType = [
    { title: 'Sólo', gameType: '1' },
    { title: 'Player x Player (PvP) - 1 contra 1', gameType: '2' },
    { title: 'Todos x Todos (AvA) - Ninguém é de ninguém', gameType: '3' },
    { title: 'Equipe(e) x Equipe(s) (TvT) - ', gameType: '4' },
  ]

  const gameTypeProps = {
    options: gameType,
    getOptionLabel: (options) => options.title
  };

  async function genericFunction() {
    console.log('todo...')
  }

  useEffect(() => {
    console.log(localStorage)
  }, [])

  const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 6,
      label: '',
    },
    {
      value: 7,
      label: '7',
    },
    {
      value: 8,
      label: '',
    },
    {
      value: 9,
      label: '',
    },
    {
      value: 10,
      label: '10',
    },
  ];

  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }

  return (

    <div className="events">

      <div className="events-content">

        <p style={{ color: '#fff', paddingTop: '3%', fontSize: 40 }}>Criar Evento</p>
        <br />

        <div className="events-create">

          {/* card 1 */}
          <div className="events-descriptions">

            {/* event title */}
            <div className="events-form-separator">
              <TextField
                required
                id="standard-required"
                label="Título"
                placeholder="Título do Evento"
                fullWidth
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
              />

            </div>

            {/* event description */}
            <div className="events-form-separator">

              <p>Descrição do Evento:</p>
              <TextareaAutosize
                rowsMin={4}
                rowsMax={4}
                value={description}
                onChange={(e) => { setDescription(e.target.value) }}
                placeholder="Escreva aqui uma descrição para o evento :)"
                style={{ backgroundColor: 'transparent', width: '80%' }}
              />

            </div>

            {/* event observation */}
            <div className="events-form-separator">

              <p>Observações do Evento:</p>
              {/* <textarea style={{ border: '1px dashed palegreen' }} /> */}
              <TextareaAutosize
                rowsMin={4}
                rowsMax={4}
                value={observation}
                onChange={(e) => { setObservation(e.target.value) }}
                placeholder="Escreva aqui as observações (por exemplo, levar um refri ou salgadinho é legal :)"
                style={{ backgroundColor: 'transparent', width: '80%' }}
              />

            </div>

          </div>

          {/* card 2 */}
          <div className="events-descriptions">

            <div className="events-form-separator">

              <Autocomplete
                {...gameTypeProps}
                id="clear-on-escape"
                clearOnEscape
                renderInput={(params) => <TextField {...params} label="Modo de Jogo" margin="normal" />}
              // value={gameTypeValue}
              // onChange={(e) => { setGameTypeValue(e.target.value) }}
              />

            </div>

            <div className="events-form-separator">

              {/* <Typography id="discrete-slider-restrict" gutterBottom>
                Número de Jogadores:
                </Typography> */}
              <p>Número de Jogadores:</p>

              <Slider
                defaultValue={1}
                min={1}
                max={10}
                step={1}
                aria-labelledby="discrete-slider-custom"
                value={numPlayers}
                // onChange={setNumPlayers(value)}
                valueLabelDisplay="auto"
                marks={marks}
              />

            </div>

            <div className="events-form-separator">

              <FormControlLabel
                control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                label="Restrição"
                checked={isRestriction}
                onChange={(e) => { setIsRestriction(e.target.checked) }}
              />

            </div>

            <div className="events-form-separator">

              <p>Endereço:</p>
              <input type="text" placeholder="Longitude" />
              <input type="text" placeholder="latitude" />

            </div>





          </div>

          <div className="events-navbar-right">
            <button type="button" className="btn btn-add-event" onClick={genericFunction}>
              <AddIcon style={{ color: '#696780' }} />
            </button>
            <button type="button" className="btn btn-search-event" onClick={() => props.history.push('/home')}>
              <SettingsBackupRestoreIcon style={{ color: '#696780' }} />
            </button>
          </div>

        </div>

      </div>
    </div >
  );
}

export default Events;
