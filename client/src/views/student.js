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

import Pdf from "react-to-pdf";

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
  Alert,
  UncontrolledAlert,
  ModalBody,
  FormGroup,
  ModalFooter,
  Spinner,
} from "reactstrap";

const ref1 = React.createRef();

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
      Notas: {
        Actividades: [],
        Total: 0,
      },
      options: {
        orientation: "landscape",
        unit: "in",
      },
      Notificaciones: [],
      Examenes: [],
      bander_examen: false,
      examen: {},
      cargaP: true,
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
        this.setState({ Publicaciones: data, cargaP: false });
      });
  }

  fetchNotas(data) {
    fetch("/app/get_actividades_by_alumno", {
      method: "POST",
      body: JSON.stringify({
        alumno_id: this.state.id,
        materia_id: data.idCurso,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ Notas: data });
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
          path_file: res.data.msg,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          Swal.fire(
            "Entregada!",
            "Actividad Entregada Correctamente",
            "success"
          );
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

  fetchNotificaciones(data) {
    fetch("/app/notificacion_get", {
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
        this.setState({ Notificaciones: data });
      });
  }

  fetchExamenes(data) {
    fetch("/app/get_examen_by_materia", {
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
        this.setState({ Examenes: data });
      });
  }

  RealizarExamen(dato) {
    this.setState({ examen: dato, bander_examen: true });
  }

  cerrarExamen(dato) {
    Swal.fire({
      title: "Desea cerra el examen?",
      text: "Se perdera su progreso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Salir!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.setState({ bander_examen: false });
      }
    });
  }

  mostrar(datos) {
    this.setState({ bandera: false, seleccion: datos });
    this.fetchActividades(datos);
    this.FetchPublicaciones(datos);
    this.fetchNotas(datos);
    this.fetchNotificaciones(datos);
    this.fetchExamenes(datos);
  }

  cerrarMostrar() {
    this.setState({ bandera: true, cargaP:true, Publicaciones: [], Actividades: [] });
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
          <Tab>Notificaciones</Tab>
          <Tab>Examenes</Tab>
          <Tab>Notas</Tab>
        </TabList>
        <TabPanel>
          <Publicacion this={props.this} />
        </TabPanel>
        <TabPanel>
          <Actividad this={props.this} />
        </TabPanel>
        <TabPanel>
          <Notificaciones this={props.this} />
        </TabPanel>
        <TabPanel>
          <Examen this={props.this} />
        </TabPanel>
        <TabPanel>
          <Notas this={props.this} />
        </TabPanel>
      </Tabs>
    </Container>
  );
}

function Publicacion(props) {
  return (
    <Container>
      <div className="boxer"></div>
      {props.this.state.cargaP && (
        <center>
          <div>
            <Spinner color="secondary" type="grow">
              Loading...
            </Spinner>
            <Spinner color="success" type="grow">
              Loading...
            </Spinner>
            <Spinner color="danger" type="grow">
              Loading...
            </Spinner>
            <Spinner color="info" type="grow">
              Loading...
            </Spinner>
            <Spinner color="warning" type="grow">
              Loading...
            </Spinner>
          </div>
        </center>
      )}
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

function Notificaciones(props) {
  return (
    <div>
      {props.this.state.Notificaciones.map((dato) => (
        <div>
          <UncontrolledAlert>
            <h4 className="alert-heading">{dato.Titulo}</h4>
            <p>Nota Obtenida: {dato.Contenido}</p>
            <hr />
            <p className="mb-0">
              <Moment format="DD/MM/YYYY">{dato.Fecha_hora_publicacion}</Moment>
            </p>
          </UncontrolledAlert>
        </div>
      ))}
    </div>
  );
}

function Examen(props) {
  return (
    <div>
      {(() => {
        if (props.this.state.bander_examen === true) {
          return <Responder_Examen this={props.this} />;
        } else if (props.this.state.bander_examen === false) {
          return <ListaExamen this={props.this} />;
        }
      })()}
    </div>
  );
}

function Responder_Examen(props) {
  return (
    <Container>
      <div>
        <div className="box"></div>
        <center>
          <u>
            <h2 style={{ textTransform: "uppercase" }}>
              {props.this.state.examen.idExamen}
            </h2>
          </u>
        </center>
      </div>
      <Button
        style={{ float: "right" }}
        className="btn btn-danger"
        onClick={() => props.this.cerrarExamen()}
      >
        X
      </Button>
      <div className="box"></div>
    </Container>
  );
}

function ListaExamen(props) {
  return (
    <div>
      <div className="boxer"></div>
      {props.this.state.Examenes.map((dato) => (
        <center>
          <div style={{ height: "8cm" }}>
            <Card
              style={{ width: "100%", height: "80%" }}
              color="primary"
              outline
            >
              <CardBody>
                <CardTitle tag="h3">{dato.idExamen}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h4">
                  <p>
                    <b>Fecha Entrega: </b>{" "}
                    <Moment format="DD/MM/YYYY">
                      {dato.Fecha_publicacion}
                    </Moment>
                  </p>
                </CardSubtitle>
                <CardText>
                  <p>
                    <h6>
                      <b>Hora Inicio: </b> {dato.Hora_inicio}
                    </h6>
                  </p>
                  <p>
                    <h6>
                      <b>Fin: </b> {dato.Hora_fin}
                    </h6>
                  </p>
                </CardText>
                <center>
                  <p>
                    <Button
                      style={{ width: "100%" }}
                      color="primary"
                      onClick={() => props.this.RealizarExamen(dato)}
                    >
                      Realizar Examen
                    </Button>
                  </p>
                </center>
              </CardBody>
            </Card>
          </div>
        </center>
      ))}
    </div>
  );
}

function Notas(props) {
  return (
    <div>
      <div className="box"></div>
      <div ref={ref1}>
        <center>
          <h2>Notas de {props.this.state.seleccion.Nombre}</h2>
        </center>
        <div className="boxer"></div>
        <Table dark>
          <thead>
            <tr>
              <th>Actividad</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            {props.this.state.Notas.Actividades.map((dato) => (
              <tr key={dato.idEntrega}>
                <td>{dato.Titulo}</td>
                <td>
                  {(() => {
                    if (dato.Puntuacion == "NaN") {
                      return;
                    } else {
                      return <text>{dato.Puntuacion}</text>;
                    }
                  })()}
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <b>Total</b>
              </td>
              <td>{props.this.state.Notas.Total}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="boxer"></div>
      <Pdf
        targetRef={ref1}
        filename={
          "notas_" +
          props.this.state.seleccion.Nombre +
          "_" +
          props.this.state.datos.Carnet +
          ".pdf"
        }
        options={props.this.state.options}
        x={0.5}
        y={0.5}
        scale={0.8}
      >
        {({ toPdf }) => (
          <Button color="success" style={{ float: "right" }} onClick={toPdf}>
            Descargar Notas
          </Button>
        )}
      </Pdf>
    </div>
  );
}

export default student;
