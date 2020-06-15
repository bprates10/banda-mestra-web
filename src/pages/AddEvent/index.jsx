import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import querySearch from "stringquery";
import PropTypes from "prop-types";

import api from "../../services/api";

import classNames from "classnames";
// import { Form, File } from "./styles";
import './styles.css'

class AddEvent extends Component {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  state = {
    title: "",
    description: "",
    playersnum: "",
    error: "",
    files: [],
    game: '',
    isRestrict: false
  };

  //   Valida se foram enviadas na URL a latitude e longitude, se não redireciona pra /app
  componentDidMount() {
    const params = querySearch(this.props.location.search);
    if (
      !params.hasOwnProperty("latitude") ||
      !params.hasOwnProperty("longitude")
    ) {
      alert("É necessário definir a latitude e longitude para um imóvel.");
      this.props.history.push("/maps");
    }

    this.setState({ ...params });
  }

  // Sera o arquivo no state
  handleDrop = files => this.setState({ files });

  // Renderiza o arquivo
  renderFiles() {
    const { files } = this.state;

    return files.length === 0 ? (
      <p>Jogue as imagens ou clique aqui para adiciona-las</p>
    ) : (
        files.map(file => <img key={file.name} src={file.preview} alt="description" />)
      );
  }

  handleSubmit = async e => {
    e.preventDefault();

    try {
      const { title, description, playersnum, restriction, latitude, longitude, files } = this.state;
      // Verifica se o state foi preenchido corretamente
      if (!title || !description || !playersnum || !latitude || !longitude) {
        this.setState({ error: "Preencha todos os campos" });
        return;
      }
      // É importante notar que o já foi extraído o id, através da desestruturação,
      // da resposta da requisição da API para criar o imóvel.
      const {
        data: { id }
      } = await api.post("/events", {
        title,
        description,
        playersnum,
        //isRestrict,
        latitude,
        longitude
      });

      // Verifica se existe file adicionado ao state
      // if (!files.length) this.props.history.push("/maps");

      // Estruturação de formulário form
      const data = new FormData();

      files.map((file, index) =>
        data.append(`image[${index}]`, file, file.name)
      );
      // por estar trabalhando com um formulário de arquivos, o cabeçalho deve conter o content-type como multipart/form-data
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };

      await api.post(`/events/${id}/images`, data, config);

      this.props.history.push("/maps");
    } catch (err) {
      this.setState({ error: "Ocorreu algum erro ao adicionar o imóvel" });
    }
  };
  // Esse metodo direciona o usuario para /maps
  handleCancel = e => {
    e.preventDefault();

    this.props.history.push("/maps");
  };

  render() {
    return (
      <div className="Form" onSubmit={this.handleSubmit}>
        <h1>Novo Evento</h1>
        <hr />
        {this.state.error && <p>{this.state.error}</p>}
        <input
          type="text"
          placeholder="Título"
          onChange={e => this.setState({ title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição"
          onChange={e => this.setState({ description: e.target.value })}
        />
        <input
          type="decimal"
          placeholder="Número de Jogadores"
          onChange={e => this.setState({ playersnum: e.target.value })}
        />
        <input
          type="text"
          placeholder="Título Selecionado"
          onChange={e => this.setState({ game: e.target.value })}
        />
        {/* <File
          multiple
          onDrop={this.handleDrop}
          className={classNames({ "without-files": !this.state.files.length })}
        > */}
        {this.renderFiles()}
        {/* </File> */}
        <div className="actions">
          <button type="submit">Adicionar</button>
          <button onClick={this.handleCancel} className="cancel">
            Cancelar
          </button>
        </div>
      </div>
    );
  }
}

/*
classNames({ "without-files": !this.state.files.length }), 
nele a função classNames serve para trabalhar com classes do CSS a partir de um objeto. 
O classNames funciona assim, caso o valor da chame seja true ele entende que aquela classe deve ser adicionado ao className.
 */

export default withRouter(AddEvent);