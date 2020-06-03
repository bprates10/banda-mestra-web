import React, { useState, useEffect } from 'react';
import api from '../../services/api'

// include css
import '../../styles/global.css'
import '../../styles/navbar.css'
import '../../styles/body.css'
import '../../styles/main.css'
import './styles.css'

function Profile() {

  const [listPlayers, setListPlayers] = useState([])
  const isDisabled = true

  useEffect(() => {
    console.log("listPlayers => ", listPlayers)
  }, [listPlayers])

  useEffect(() => {
    getPlayer()
  }, [])

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

  return (

    <div id="main">

      <div className="container-photo-profile">

        <img src={listPlayers.avatar_url} alt="Imagem de Perfil" />

      </div>

      <div className="container-info-profile">

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
      
      <div className="container-evaluate-profile">

        <div className="two-columns">

          <div className="my-stats">
  
            <p>Avaliar Jogadores:</p>
            <br />
            <div className="descriptions">
              {/* todo... */}
            </div>

          </div>

          <div className="my-events">

            <p>Avaliar Jogadores:</p>
            <br />
            <div className="descriptions">
              {/* todo... */}
            </div>

        </div>
          
      </div>
  
      </div>

    </div >
  );
}

export default Profile;
