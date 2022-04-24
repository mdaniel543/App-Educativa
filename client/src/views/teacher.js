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

class teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      datos: [],
      materias: [],
      bandera: true,
      seleccion: {},
      Actividades: [],
      Publicaciones: [],
      modalInsertar_A: false,
      modalInsert_P: false,
      modalUpdate_P: false,
      data_A: {
        nombre: "",
        descripcion: "",
        valor: 0,
      },
      data_P: {
        descripcion: "",
      },
      collapsePublicacion: false,
      collapsePublicacion_Editar: false,
      Alumnos: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeP = this.handleChangeP.bind(this);
    this.fetchMaestro();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      data_A: {
        ...this.state.data_A,
        [name]: value,
      },
    });
  }

  handleChangeP(e) {
    const { name, value } = e.target;
    this.setState({
      data_P: {
        ...this.state.data_P,
        [name]: value,
      },
    });
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

  fetchActividades(data) {
    fetch("/app/actividad_get_by_materia_id", {
      method: "POST",
      body: JSON.stringify({
        idMateria: data.idMateria,
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

  FetchPublicaciones(data) {
    fetch("/app/publicacion_get_by_materia_id", {
      method: "POST",
      body: JSON.stringify({
        idMateria: data.idMateria,
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

  fetchAlumnos(data) {
    fetch("/app/alumnos_get_by_id_materia", {
      method: "POST",
      body: JSON.stringify({
        idMateria: data.idMateria,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ Alumnos: data });
      });
  }

  insertPublicaciones() {
    console.log(this.state.data_P.descripcion);
    fetch("/app/publicacion_insert", {
      method: "POST",
      body: JSON.stringify({
        descripcion: this.state.data_P.descripcion,
        id_materia: this.state.seleccion.idMateria,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ collapsePublicacion: !this.state.collapsePublicacion });
        Swal.fire("Mensaje!", data.msg, "success");
        this.FetchPublicaciones(this.state.seleccion);
      });
  }

  insertarActividad(FA, FE) {
    let fecha_A = `${FA.getFullYear()}/${FA.getMonth() + 1}/${FA.getDate()}`;
    let fecha_E = `${FE.getFullYear()}/${FE.getMonth() + 1}/${FE.getDate()}`;
    console.log(fecha_A);
    console.log(fecha_E);
    console.log(this.state.data);
    fetch("/app/insert_actividad", {
      method: "POST",
      body: JSON.stringify({
        titulo: this.state.data_A.nombre,
        descripcion: this.state.data_A.descripcion,
        id_materia: this.state.seleccion.idMateria,
        fecha_publicacion: fecha_A,
        fecha_entrega: fecha_E,
        valor: this.state.data_A.valor,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Mensaje!", data.msg, "success");
        this.fetchActividades(this.state.seleccion);
        this.setState({ modalInsertar_A: false });
      });
  }

  mostrar(datos) {
    this.setState({ bandera: false, seleccion: datos });
    this.FetchPublicaciones(datos);
    this.fetchActividades(datos);
    this.fetchAlumnos(datos);
  }
  cerrarMostrar() {
    this.setState({ bandera: true });
  }

  cerrarSesion = () => {
    window.location.href = "../";
  };

  cerrarModalInsertar_A() {
    this.setState({ modalInsertar_A: false });
  }

  mostrarModalInsertar_A() {
    this.setState({ modalInsertar_A: true });
  }

  editar_publicacion() {
    fetch("/app/publicacion_update", {
      method: "PUT",
      body: JSON.stringify({
        idPublicacion: this.state.data_P.idPublicacion,
        descripcion: this.state.data_P.Descripcion,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Actualizado!", data.msg, "success");
        this.FetchPublicaciones(this.state.seleccion);
        this.setState({
          collapsePublicacion_Editar: !this.state.collapsePublicacion_Editar,
        });
      });
  }

  eliminar_publicacion(dato) {
    Swal.fire({
      title: "Deseas eliminar la publicacion?",
      text: "No se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("/app/publicacion_delete", {
          method: "PUT",
          body: JSON.stringify({
            idPublicacion: dato.idPublicacion,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            Swal.fire("Eliminado!", data.msg, "success");
            this.FetchPublicaciones(this.state.seleccion);
          });
      }
    });
  }

  eliminar_Actividad(dato) {
    Swal.fire({
      title: "Deseas eliminar la actividad?",
      text: "No se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("/app/delete_actividad", {
          method: "DELETE",
          body: JSON.stringify({
            idActividad: dato.idActividad,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            Swal.fire("Eliminado!", data.msg, "success");
            this.fetchActividades(this.state.seleccion);
          });
      }
    });
  }
  mostrarcollapsePublicacion() {
    this.setState({ collapsePublicacion: !this.state.collapsePublicacion });
  }

  mostrarEdicion(dato) {
    this.setState({
      collapsePublicacion_Editar: !this.state.collapsePublicacion_Editar,
      data_P: dato,
    });
  }
  cancelar_editar_publicacion() {
    this.setState({
      collapsePublicacion_Editar: !this.state.collapsePublicacion_Editar,
    });
  }
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
      <div className="xml">
        <u>
          <h3 style={{ textTransform: "uppercase" }}>
            {props.this.state.seleccion.Nombre}
          </h3>
        </u>
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
          <Tab>Examen</Tab>
          <Tab>Alumnos</Tab>
        </TabList>
        <TabPanel>
          <Publicacion this={props.this} />
        </TabPanel>
        <TabPanel>
          <Actividad this={props.this} />
        </TabPanel>
        <TabPanel>
          <Examen this={props.this} />
        </TabPanel>
        <TabPanel>
          <Alumnos this={props.this} />
        </TabPanel>
      </Tabs>
    </Container>
  );
}

function Publicacion(props) {
  return (
    <Container>
      <div className="boxer"></div>
      <Button
        color="primary"
        onClick={() => props.this.mostrarcollapsePublicacion()}
      >
        Crear Nueva Publicacion
      </Button>
      <Collapse isOpen={props.this.state.collapsePublicacion}>
      <div style={{height:"8cm"}}>
        <Card style={{width:"100%", height:"100%"}}>
          <center>
            <h5>Ingrese Publicacion</h5>
          </center>
          <CardBody>
            <textarea
              style={{height:"4cm"}}
              class="form-control"
              name="descripcion"
              onChange={props.this.handleChangeP}
            />
            <div className="boxer"></div>
            <Button
              style={{width:"100%"}}
              color="primary"
              onClick={() => props.this.insertPublicaciones()}
            >
              Crear
            </Button>
          </CardBody>
        </Card>
        </div>
      </Collapse>

      {props.this.state.Publicaciones.map((dato) =>
        (() => {
          if (dato.Estado === 0) {
            return;
          } else {
            return (
              <center>
                <div style={{height:"7cm"}}>
                  <Card style={{width:"100%", height:"90%"}}>
                    <CardBody>
                      <CardTitle tag="h5">Publicacion</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        <b>Fecha Publicacion: </b>{" "}
                        <Moment format="DD/MM/YYYY">
                          {dato.Fecha_publicacion}
                        </Moment>
                      </CardSubtitle>
                      <CardText>
                        <b>Descripcion: </b> {dato.Descripcion}
                      </CardText>
                      <div className="boxer"></div>
                      <center>
                        <Button
                          color="info"
                          onClick={() => props.this.mostrarEdicion(dato)}
                        >
                          Editar
                        </Button>
                        <Button
                          color="warning"
                          onClick={() => props.this.eliminar_publicacion(dato)}
                        >
                          Eliminar
                        </Button>
                      </center>
                    </CardBody>
                  </Card>
                </div>
              </center>
            );
          }
        })()
      )}

      <Modal isOpen={props.this.state.collapsePublicacion_Editar} fade={false}>
        <ModalHeader>
          <div>
            <h3>Editar Publicacion</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Descripcion</label>
            <textarea
              class="form-control"
              name="Descripcion"
              value={props.this.state.data_P.Descripcion}
              onChange={props.this.handleChangeP}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => props.this.editar_publicacion()}
          >
            Editar
          </Button>
          <Button
            color="danger"
            onClick={() => props.this.cancelar_editar_publicacion()}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

function Actividad(props) {
  var [startDate, setStartDate] = useState(null);
  var [EndDate, setEndDate] = useState(null);
  return (
    <Container>
      <div className="boxer"></div>
      <Button
        color="primary"
        onClick={() => props.this.mostrarModalInsertar_A()}
      >
        Crear Actividad
      </Button>
      <div className="boxer"></div>

      {props.this.state.Actividades.map((dato) =>
        (() => {
          if (dato.Estado === 0) {
            return;
          } else {
            return (
              <center>
                <div style={{height: "8.5cm"}}>
                  <Card style={{width:"100%", height:"90%"}}>
                    <CardBody>
                      <CardTitle tag="h3">{dato.Titulo}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        <p>
                        <b>Fecha Publicacion: </b>{" "}
                        <Moment format="DD/MM/YYYY">
                          {dato.Fecha_publicacion}
                        </Moment>
                        </p>
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
                        <center>
                        <Button
                          color="warning"
                          onClick={() => props.this.eliminar_Actividad(dato)}
                        >
                          Eliminar
                        </Button>
                      </center>
                      </CardText>
                      
                    </CardBody>
                  </Card>
                </div>
              </center>
            );
          }
        })()
      )}

      <Modal isOpen={props.this.state.modalInsertar_A} fade={false}>
        <ModalHeader>
          <div>
            <h3>Crear Actividad</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Titulo</label>
            <input
              className="form-control"
              name="nombre"
              type="text"
              onChange={props.this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Descripicion</label>
            <textarea
              class="form-control"
              name="descripcion"
              onChange={props.this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Fecha Publicacion:</label>
            <DatePicker
              className="form-control"
              name="fecha"
              dateFormat="dd/MM/yyyy"
              isClearable
              showYearDropdown
              placeholderText="Selecciona Fecha"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              fixedHeight
              //withPortal
            />
          </FormGroup>
          <FormGroup>
            <label>Fecha Entrega:</label>
            <DatePicker
              className="form-control"
              name="fecha"
              dateFormat="dd/MM/yyyy"
              isClearable
              showYearDropdown
              placeholderText="Selecciona Fecha"
              selected={EndDate}
              onChange={(date) => setEndDate(date)}
              fixedHeight
              //withPortal
            />
          </FormGroup>
          <FormGroup>
            <label>Valor</label>
            <input
              className="form-control"
              name="valor"
              type="number"
              onChange={props.this.handleChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => props.this.insertarActividad(startDate, EndDate)}
          >
            Crear
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => props.this.cerrarModalInsertar_A()}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

function Examen(props) {
  return <div></div>;
}

function Alumnos(props) {
  return (
    <Container>
      <div className="box"></div>
      <Table hover>
        <thead>
          <tr>
            <th>Carnet</th>
            <th>Nombre Completo</th>
            <th>Correo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.this.state.Alumnos.map((dato) =>
            (() => {
              if (dato.Estado === 1) {
                return (
                  <tr key={dato.idAlumno}>
                    <td>{dato.Carnet}</td>
                    <td>
                      {dato.Nombre} {dato.Apellido}
                    </td>
                    <td>{dato.Correo_electronico}</td>
                    <td>
                      <Button
                        color="secondary"
                        onClick={() => props.this.mostrarModallista(dato)}
                      >
                        Actividades
                      </Button>
                    </td>
                  </tr>
                );
              }
              return;
            })()
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default teacher;
