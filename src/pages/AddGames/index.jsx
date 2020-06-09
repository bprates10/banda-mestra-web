import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import querySearch from "stringquery";
import classNames from "classnames";
import PropTypes from "prop-types";

// import { Form, File } from "./styles";

import { Form, DropContainer } from './styles'

import api from "../../services/api";

import Dropzone from 'react-dropzone'

function AddEvent()  {
  
  

  handleSubmit = async e => {
    e.preventDefault();

    try {
      
      const { data: { id } } = await api.post("/events", {
        title,
        description,
        playersnum,
        // isRestrict,
        latitude,
        longitude
      });

      // Estruturação de formulário form
      const data = new FormData();

      await api.post(`/events/${id}/images`, data, config);

      this.props.history.push("/app");
    } catch (err) {
      this.setState({ error: "Ocorreu algum erro ao adicionar o imóvel" });
    }
  };
  // Esse metodo direciona o usuario para /app
  handleCancel = e => {
    e.preventDefault();

    this.props.history.push("/maps");
  };

  return (
    <Form onSubmit={this.handleSubmit}>
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
      >*/}
        {this.renderFiles()}
      {/*</File> */}
      <div className="actions">
        <button type="submit">Adicionar</button>
        <button onClick={this.handleCancel} className="cancel">
          Cancelar
        </button>
      </div>
    </Form>
  );
}

/*
classNames({ "without-files": !this.state.files.length }), 
nele a função classNames serve para trabalhar com classes do CSS a partir de um objeto. 
O classNames funciona assim, caso o valor da chame seja true ele entende que aquela classe deve ser adicionado ao className.
 */

export default withRouter(AddEvent);