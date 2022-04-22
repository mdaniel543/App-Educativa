import React, { Component, useState } from "react";
import axios from "axios";
import Barra from "../components/menu_bar";
import Moment from "react-moment";

import Dropdown from "react-dropdown";

import "../styles/profile.css";
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

class student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      Carrera: [],
      datos: [],
    };
    this.fetchAlumno();
  }

  fetchAlumno() {
    console.log(this.state.id);
    fetch("/app/alumno_get_by_id", {
      method: "POST",
      body: JSON.stringify({
        idAlumno: this.state.id,
        carnet: "",
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
        this.fetchCarrera(data.idCarrera);
      });
  }

  fetchCarrera(idCarrera){
    if(idCarrera == null){
        return;
    }
    fetch("/app/carrera_get_by_id", {
      method: "POST",
      body: JSON.stringify({
        idCarrera: idCarrera,
        Nombre_carrera: "",
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ Carrera: data });
      });
  }

  fetch

  cerrarSesion = () => {
    window.location.href = "../";
  };

  render() {
    return (
      <div>
        <Barra this={this} />
        <div style={{ float: "right" }} class="containere">
          <h2>
            {this.state.datos.Nombre} {this.state.datos.Apellido}
          </h2>
          <h4>{this.state.datos.Correo_electronico}</h4>
          <h3 style={{ textTransform: "uppercase"}}>{this.state.Carrera.Nombre_carrera}</h3>
        </div>
        <div className="box"></div>
        <div className="xmt">
          <h2>Modulo Alumno</h2>
        </div>
        <div className="box"></div>
        <Container>
          <Tabs>
            <TabList>
              <Tab>Publicacion</Tab>
              <Tab>Actividades</Tab>
              <Tab>Notas</Tab>
              <Tab>Notificaciones</Tab>
              <Tab>Examenes</Tab>
            </TabList>
          </Tabs>
        </Container>
      </div>
    );
  }
}

export default student;
