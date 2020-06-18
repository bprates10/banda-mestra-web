import React, { useState, useEffect } from 'react';
// import api from '../../services/api'

import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Slider from '@material-ui/core/Slider';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// button icons
import AddIcon from '@material-ui/icons/Add';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';

// include css
import './styles.css'

function Games(props) {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [numPlayers, setNumPlayers] = useState(1)

  const gameType = [
    { id: 1, title: 'Jogo Solo', description: 'Jogo sozinho, um contra o mundo' },
    { id: 2, title: 'Player x Player (PvP) - 1 contra 1', description: 'x1, bota contra!' },
    { id: 3, title: 'Todos x Todos (AvA) - Ninguém é de ninguém', description: 'Que vença o (eu) melhor!' },
    { id: 4, title: 'Equipe(e) x Equipe(s) (TvT) - Bota contra !', description: 'E que vença a melhor equipe!' },
    { id: 5, title: 'Player x Todos (PvA) - Carnificina', description: 'Podem vim, acabo com todos vocês!' },
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

  const number = [
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
  ]

  return (

    <div className="games">

      <div className="games-content">

        <p style={{ color: '#006064', paddingTop: '3%', fontSize: 40 }}>Cadastrar Games</p>
        <br />

        <div className="games-create">

          {/* card 1 */}
          <div className="games-descriptions">

            {/* game title */}
            <div className="games-form-separator">
              <TextField
                required
                id="standard-required"
                label="Nome"
                placeholder="Nome do Jogo"
                fullWidth
                value={name}
                onChange={(e) => { setName(e.target.value) }}
              />

            </div>

            {/* game description */}
            <div className="games-form-separator">

              <p>Descrição do Jogo:</p>
              <TextareaAutosize
                rowsMin={4}
                rowsMax={4}
                value={description}
                onChange={(e) => { setDescription(e.target.value) }}
                placeholder="Escreva aqui uma descrição para o evento :)"
                style={{ backgroundColor: 'transparent', width: '80%' }}
              />

            </div>

          </div>

          {/* card 2 */}
          <div className="games-descriptions">

            {/* game type */}
            <div className="games-form-separator">

              <Autocomplete
                {...gameTypeProps}
                id="clear-on-escape"
                clearOnEscape
                renderInput={(params) => <TextField {...params} label="Modo de Jogo" margin="normal" />}
                value={type}
                onChange={(e) => { setType(e.target.value) }}
              />

            </div>

            {/* num players */}
            <div className="games-form-separator">

              <p>Número de Jogadores:</p>

              <Slider
                defaultValue={1}
                min={1}
                max={10}
                step={1}
                aria-labelledby="discrete-slider-custom"
                value={numPlayers}
                // onChange={setNumPlayers((e) => e.target.value)}
                valueLabelDisplay="auto"
                marks={number}
              />

            </div>

          </div>

          <div className="games-navbar-right">
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

export default Games;
