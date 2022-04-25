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
  Collapse,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody,
  Card,
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
      Pensum: [],
      bandera: true,
      seleccion: {},
      Actividades: [],
      Publicaciones: [],
      entrega: {},
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
        this.fetchPensum(data.idCarrera);
      });
  }

  fetchCarrera(idCarrera) {
    if (idCarrera == null) {
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

  fetchPensum(idCarrera) {
    if (idCarrera == null) {
      return;
    }
    fetch("/app/materias_get_by_carrera_id", {
      method: "POST",
      body: JSON.stringify({
        idCarrera: idCarrera,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ Pensum: data });
      });
  }

  FetchPublicaciones(data) {
    fetch("/app/publicacion_get_by_materia_id", {
      method: "POST",
      body: JSON.stringify({
        idMateria: data.idCurso,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ Publicaciones: data });
      });
  }

  handleFiles = (files) => {
    var reader = new FileReader();
    reader.readAsText(files[0]);
    const formData = new FormData();
    formData.append("file", files[0]);
    axios.post("/app/carga", formData, {}).then((res) => {
      fetch("/app/update_entrega_student", {
        method: "PUT",
        body: JSON.stringify({
          entrega_id: this.state.entrega.idEntrega,
          path_file: res.data.msg
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          Swal.fire("Entregada!", "Actividad Entregada Correctamente", "success");
          this.fetchActividades(this.state.seleccion);
        });
    });
  };

  fetchActividades(data) {
    console.log(data);
    fetch("/app/actividad_by_alumno", {
      method: "POST",
      body: JSON.stringify({
        idAlumno: this.state.id,
        idMateria: data.idCurso,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ Actividades: data });
      });
  }

  mostrar(datos) {
    this.setState({ bandera: false, seleccion: datos });
    this.fetchActividades(datos);
    this.FetchPublicaciones(datos);
  }

  cerrarMostrar() {
    this.setState({ bandera: true, Publicaciones: [], Actividades: [] });
  }

  cerrarSesion = () => {
    window.location.href = "../";
  };

  SetEntrega(dato) {
    this.setState({ entrega: dato });
  }

  render() {
    return (
      <div>
        <Barra this={this} />
        <div style={{ float: "right" }} class="containere">
          <h2>
            {this.state.datos.Nombre} {this.state.datos.Apellido}
          </h2>
          <h4>{this.state.datos.Correo_electronico}</h4>
          <h3 style={{ textTransform: "uppercase" }}>
            {this.state.Carrera.Nombre_carrera}
          </h3>
        </div>
        <div className="xmt">
          <h2>Modulo Alumno</h2>
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
          <h4 class="heading__title">Materias de la carrera</h4>
        </u>
      </div>
      <div class="cards">
        {props.this.state.Pensum.map((dato) => (
          <div class="card card-1">
            <p class="card__exit">
              <i class="fas fa-times"></i>
            </p>
            <p class="card__apply">
              <a class="card__link" onClick={() => props.this.mostrar(dato)}>
                <h2 class="card__title">{dato.Nombre}</h2>{" "}
                <i class="fas fa-arrow-right"></i>
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
      <div>
        <center>
          <u>
            <h3 style={{ textTransform: "uppercase" }}>
              {props.this.state.seleccion.Nombre}
            </h3>
          </u>
        </center>
      </div>
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
          <Tab>Notas</Tab>
          <Tab>Notificaciones</Tab>
          <Tab>Examenes</Tab>
        </TabList>
        <TabPanel>
          <Publicacion this={props.this} />
        </TabPanel>
        <TabPanel>
          <Actividad this={props.this} />
        </TabPanel>
      </Tabs>
    </Container>
  );
}

function Publicacion(props) {
  return (
    <Container>
      <div className="boxer"></div>
      {props.this.state.Publicaciones.map((dato) =>
        (() => {
          if (dato.Estado === 0) {
            return;
          } else {
            return (
              <center>
                <div style={{ height: "6cm" }}>
                  <Card
                    style={{ width: "100%", height: "80%" }}
                    color="success"
                    outline
                  >
                    <CardBody>
                      <CardTitle tag="h4">Publicacion</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h5">
                        <b>Fecha Publicacion: </b>{" "}
                        <Moment format="DD/MM/YYYY">
                          {dato.Fecha_publicacion}
                        </Moment>
                      </CardSubtitle>
                      <CardText>
                        <b>Descripcion: </b> {dato.Descripcion}
                      </CardText>
                    </CardBody>
                  </Card>
                </div>
                <div className="boxer"></div>
              </center>
            );
          }
        })()
      )}
    </Container>
  );
}

function Actividad(props) {
  return (
    <Container>
      <div className="boxer"></div>

      {props.this.state.Actividades.map((dato) =>
        (() => {
          if (dato.Estado === 0) {
            return;
          } else {
            return (
              <center>
                <div style={{ height: "9cm" }}>
                  <Card
                    style={{ width: "100%", height: "80%" }}
                    color="danger"
                    outline
                  >
                    <CardBody>
                      <CardTitle tag="h3">{dato.Titulo}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h4">
                        <p>
                          <b>Fecha Entrega: </b>{" "}
                          <Moment format="DD/MM/YYYY">
                            {dato.Fecha_entrega}
                          </Moment>
                        </p>
                      </CardSubtitle>
                      <CardText>
                        <p>
                          <b>Descripcion: </b> {dato.Descripcion}
                        </p>
                        <p>
                          <b>Valor: </b>
                          {dato.Valor}
                        </p>
                      </CardText>

                      <center>
                        {(() => {
                          if (dato.Path_archivo == null) {
                            return (
                              <ReactFileReader
                                multipleFiles={false}
                                fileTypes={[".*"]}
                                handleFiles={props.this.handleFiles}
                              >
                                <Button
                                  color="secondary"
                                  onClick={() => props.this.SetEntrega(dato)}
                                >
                                  Entregar Actividad
                                </Button>
                              </ReactFileReader>
                            );
                          } else {
                            return <text>Actividad Entregada</text>;
                          }
                        })()}
                      </center>
                    </CardBody>
                  </Card>
                </div>
              </center>
            );
          }
        })()
      )}
    </Container>
  );
}

export default student;
