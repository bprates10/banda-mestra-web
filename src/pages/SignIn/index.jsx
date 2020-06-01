import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/banner-web.png";
import api from "../../services/api";
import { login } from "../../services/auth";

import "../../styles/global.css"
import "./styles.css"

function SignIn(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSignIn = async e => {
    e.preventDefault();

    if (!password) {
      setError("Preencha e-mail para continuar!")
      return
    }

    if (!email) {
      setError("Preencha e-mail para continuar!")
    }

    else {
      try {
        // const response = await api.post("/sessions", { email, password });
        // login(response.data.token);
        props.history.push("/home");
      } catch (err) {
        console.log(err)
        setError("Houve um problema com o login, verifique suas credenciais.")
      }
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSignIn}>
        <img src={Logo} alt="Banda Mestra logo" />
        {error && <p>{error}</p>}
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
        <button type="submit">Entrar</button>
        <hr />
        <Link to="/signup">Criar conta grátis</Link>
      </form>
    </div>
  )
}

export default withRouter(SignIn)