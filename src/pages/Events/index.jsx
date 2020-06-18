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

// grid add players
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';

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

  // funcoes do grid add
  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }
  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }
  function union(a, b) {
    return [...a, ...not(b, a)];
  }
  // vars do grid add
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [right, setRight] = React.useState([4, 5, 6, 7]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const numberOfChecked = (items) => intersection(checked, items).length;
  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };
  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };
  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  const customList = (title, items) => (
    <Card>
      <CardHeader
        // className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'Todos os Itens Selecionados' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selecionados`}
      />
      <Divider />
      <List
        // className={classes.list} 
        dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Item ${value + 1}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }

  return (

    <div className="events">

      <div className="events-content">

        <p style={{ color: '#fff', paddingTop: '2%', fontSize: 40 }}>Criar Evento</p>
        <br />

        <div className="events-create">

          {/* card 1 */}
          <div className="events-descriptions">

            {/* event title */}
            <div className="events-form-separator">
              <div className="left">
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

            </div>

            {/* event description */}
            <div className="events-form-separator">
              <div className="left">
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

            </div>

            {/* event observation */}
            <div className="events-form-separator">
              <div className="left">
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

            <div className="events-form-separator">
              <div className="left">
                <Autocomplete
                  {...gameTypeProps}
                  id="clear-on-escape"
                  clearOnEscape
                  renderInput={(params) => <TextField {...params} label="Modo de Jogo" margin="normal" />}
                // value={gameTypeValue}
                // onChange={(e) => { setGameTypeValue(e.target.value) }}
                />
              </div>

            </div>

          </div>

          {/* card 2 */}
          <div className="events-descriptions">

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

              {/* <p>Endereço:</p>
              <input type="text" placeholder="Longitude" />
              <input type="text" placeholder="latitude" /> */}


              <Grid container spacing={2} justify="center" alignItems="center" /*className={classes.root}*/ >

                <Grid item>{customList('Títulos', left)}</Grid>

                <Grid item>

                  <Grid container direction="column" alignItems="center">

                    <Button
                      variant="outlined"
                      size="small"
                      //className={classes.button}
                      onClick={handleCheckedRight}
                      disabled={leftChecked.length === 0}
                      aria-label="move selected right"
                    >
                      &gt;
                    </Button>

                    <Button
                      variant="outlined"
                      size="small"
                      //className={classes.button}
                      onClick={handleCheckedLeft}
                      disabled={rightChecked.length === 0}
                      aria-label="move selected left"
                    >
                      &lt;
                    </Button>

                  </Grid>

                </Grid>

                <Grid item>{customList('Xablau', right)}</Grid>

              </Grid>


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
