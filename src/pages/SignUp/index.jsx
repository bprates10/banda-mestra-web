import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";

import Logo from "../../assets/banner-web.png"
import "./styles.css"
// import "../../styles/global.css"

// import Button from '@material-ui/core/Button'
// import CloudUploadIcon from '@material-ui/icons/CloudUpload'
// import SaveIcon from '@material-ui/icons/Save'

function SignUp() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSignUp = async e => {

    e.preventDefault();
    setError(false)

    if (!username) {
      setError({ error: "E qual será o seu nick ?" })
      return
    }

    if (!password) {
      setError({ error: "Ops, parece que faltou uma senha ><" })
      return
    }

    if (!email) {
      setError({ error: "Ops, parece que faltou o email ><" })
      return
    }

    try {
      await api.post("/users", { username, email, password });
      this.props.history.push("/");
    } catch (err) {
      console.log(err);
      setError("Usuário já cadastrado!")
    }
  }

  return (
    <div className="signUp">
      <form onSubmit={handleSignUp}>
        <img src={Logo} alt="Banda Mestra logo" />
        {error && <p>{error}</p>}
        <input
          type="text"
          placeholder="Nome de usuário"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Endereço de e-mail"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Cadastrar grátis</button>

        {/* <Button
          className="btnSubmit"
          style={{ marginLeft: '30%', paddingTop: 1, color: 'red' }}
          name="submit"
          id="submit"
          type="submit"
          variant="contained"
          color="default"
          startIcon={<SaveIcon />}
        >
          Salvar
        </Button> */}


        <hr />
        {/* </> */}
        <Link to="/">Fazer login</Link>
      </form>
      {/* </Container> */}
    </div>
  )
}

export default withRouter(SignUp);