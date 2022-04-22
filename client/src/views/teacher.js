import React, { Component, useState } from "react";
import axios from "axios";
import Barra from "../components/menu_bar";
import Moment from "react-moment";

import Dropdown from "react-dropdown";

import "../styles/profile.css";
import "../styles/card.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-dropdown/style.css";

import { CsvToHtmlTable } from "react-csv-to-table";

import ReactFileReader from "react-file-reader";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Swal from "sweetalert2";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

class teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      datos: [],
      materias: [],
      bandera: true,
    };
    this.fetchMaestro();
    //
  }

  fetchMaestro() {
    console.log(this.state.id);
    fetch("/app/maestro_get_by_id", {
      method: "POST",
      body: JSON.stringify({
        idMaestro: this.state.id,
        Registro: "",
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ datos: data });
        this.fetchMaterias();
      });
  }

  fetchMaterias() {
    fetch("/app/materias_get_by_maestro_id", {
      method: "POST",
      body: JSON.stringify({
        idMaestro: this.state.id,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ materias: data });
      });
  }
  mostrar() {
    this.setState({ bandera: false });
  }
  cerrarMostrar(){
    this.setState({ bandera: true });
  }

  cerrarSesion = () => {
    window.location.href = "../";
  };

  render() {
    return (
      <div>
        <Barra this={this} />
        <div style={{ float: "right" }} class="containere">
          <div class="avatar-flip">
            <img
              src={"http://localhost:8000/static/" + this.state.datos.Path_foto}
              height="150"
              width="150"
            />
            <img
              src={"http://localhost:8000/static/" + this.state.datos.Path_foto}
              height="150"
              width="150"
            />
          </div>
          <h2>
            {this.state.datos.Nombre} {this.state.datos.Apellido}
          </h2>
          <h4>{this.state.datos.Correo_electronico}</h4>
        </div>
        <div className="xmt">
          <h2>Modulo Maestro</h2>
        </div>
        <div className="box"></div>
        {(() => {
          if (this.state.bandera === true) {
            return <MateriasA this={this} />;
          } else {
            return <Materia this={this} />;
          }
        })()}
      </div>
    );
  }
}

function MateriasA(props) {
  return (
    <div class="main-container">
      <div class="heading">
        <u>
          <h4 class="heading__title">Materias Asignadas</h4>
        </u>
      </div>
      <div class="cards">
        {props.this.state.materias.map((dato) => (
          <div class="card card-1">
            <p class="card__exit">
              <i class="fas fa-times"></i>
            </p>
            <p class="card__apply">
              <a class="card__link" onClick={() => props.this.mostrar()}>
              <h2 class="card__title">{dato.Nombre}</h2> <i class="fas fa-arrow-right"></i>
              </a>
            </p>
            <text>{dato.Descripcion}</text>
          </div>
        ))}
      </div>
    </div>
  );
}

function Materia(props) {
  return (
    <Container>
      <Button
        style={{ float: "right" }} 
        className="btn btn-danger"
        onClick={() => props.this.cerrarMostrar()}
      >
        X
      </Button>
        <div className="box"></div>
      <Tabs>
        <TabList>
          <Tab>Publicacion</Tab>
          <Tab>Actividades</Tab>
          <Tab>Examen</Tab>
          <Tab>Alumnos</Tab>
        </TabList>
      </Tabs>
    </Container>
  );
}

export default teacher;
