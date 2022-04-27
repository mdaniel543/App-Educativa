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
  Label,
  Form,
  Input,
  Progress,
  ListGroup,
  ListGroupItem,
  InputGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "reactstrap";

class teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      value: "",
      datos: [],
      materias: [],
      bandera: 0,
      seleccion: {},
      Actividades: [],
      Publicaciones: [],
      modalInsertar_A: false,
      modalInsert_P: false,
      modalUpdate_P: false,
      modal_entregas: false,
      modal_entregas_archivo: false,
      NombreActividad: "",
      file: "",
      ealumno: "",
      entrega: {},
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
      Entregas: [],
      punteo: 0,
      collapseExamen: true,
      collapseNuevoExamen: false,
      examen: {
        nombre: "",
        date: "",
        timeI: "",
        timeF: "",
      },
      barra: 25,
      pagina: 0,
      collapsePregunta: false,
      collapseNuevaPregunta: false,
      collapseNuevaRespuesta: false,
      preg: "",
      modal_respuestas: false,
      collapseNuevaRespuesta: false,
      dropdownOpen: false,
      dropdownOpen2: false,
      data: {},
      rutacsv: "",
      tasks2: [],
      respuestas: [],
      preguntas: [],
      idPregunta: 0,
      textRespues: "",
      cargaP: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeA = this.handleChangeA.bind(this);
    this.handleChangeP = this.handleChangeP.bind(this);
    this.handleChangePu = this.handleChangePu.bind(this);
    this.handleChangeE = this.handleChangeE.bind(this);
    this.handleChangeRe = this.handleChangeRe.bind(this);
    this.handleChangePr = this.handleChangePr.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleDropDown2 = this.toggleDropDown2.bind(this);
    this.fetchMaestro();
    this.SigPag();
  }

  /**
   *
   * los de alumnos
   */

  handleFiles = (files) => {
    var reader = new FileReader();
    reader.onload = (e) => {
      // Use reader.result
      this.setState({
        value: reader.result,
      });
      console.log("hola");
    };
    reader.readAsText(files[0]);
    const formData = new FormData();
    formData.append("file", files[0]);
    axios.post("/app/carga", formData, {}).then((res) => {
      this.setState({ rutacsv: res.data.msg });
      console.log(this.state.rutacsv);
    });
  };

  Carga() {
    fetch("/app/carga_sel", {
      method: "POST",
      body: JSON.stringify({
        user: "Alumno",
        ruta: this.state.rutacsv,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire("Mensaje!", data.msg, "info");
        //this.fetchTasks2();
        this.setState({ load2: false });
      })
      .catch((err) => console.error(err));
  }

  handleChangeA(e) {
    const { name, value } = e.target;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value,
      },
    });
  }

  handleChangeRe(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  mostrarModalInsertarA() {
    this.setState({ modalInsertarA: true });
  }
  cerrarModalInsertarA() {
    this.setState({ modalInsertarA: false });
  }

  SigPag() {
    var page = this.state.pagina;
    page++;
    console.log(page);

    fetch("/app/selectEstudiantes", {
      //eliminar maestro
      method: "POST",
      body: JSON.stringify({
        page: page,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.data[0]);
        this.setState({ tasks2: data.data[0] });
        this.setState({ pagina: page });
      });
  }
  AntPag() {
    var page = this.state.pagina;
    page--;
    console.log(page);
    fetch("/app/selectEstudiantes", {
      //eliminar maestro
      method: "POST",
      body: JSON.stringify({
        page: page,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.data[0]);
        this.setState({ tasks2: data.data[0] });
        this.setState({ pagina: page });
      });
  }
  fetchTasks2() {
    var page = this.state.pagina;
    fetch("/app/selectEstudiantes", {
      //eliminar maestro
      method: "POST",
      body: JSON.stringify({
        page: page,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.data[0]);
        this.setState({ tasks2: data.data[0] });
      });
  }

  eliminarA(dato) {
    Swal.fire({
      title: "Deseas eliminar el alumno?",
      text: "No se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.setState({ load2: true });
        fetch("/app/delete_alumno", {
          //eliminar alumno
          method: "DELETE",
          body: JSON.stringify({
            Carnet: dato.Carnet, //envio solo carnet
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            Swal.fire("Eliminado!", data.msg, "success");
            this.fetchTasks2();
            this.setState({ load2: false });
          })
          .catch((err) => console.error(err));
      }
    });
  }

  insertarA() {
    console.log(this.state.data);
    fetch("/app/insert_alumno", {
      ///insertar alumno
      method: "POST",
      body: JSON.stringify({
        Nombre: this.state.data.nombre,
        Apellido: this.state.data.apellido,
        Carnet: this.state.data.carnet,
        Telefono: this.state.data.telefono,
        Direccion: this.state.data.direccion,
        Correo: this.state.data.correo,
        Pass: this.state.data.pass,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Mensaje!", data.msg, "info");
        this.fetchTasks2();
      })
      .catch((err) => console.error(err));
    this.cerrarModalInsertarA();
  }

  /**
   *
   * lo normal
   */
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      data_A: {
        ...this.state.data_A,
        [name]: value,
      },
    });
  }

  handleChangePu(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
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

  handleChangePr(e) {
    const { name, value } = e.target;
    this.setState({
      preg: value,
    });
  }

  handleChangeE(e) {
    const { name, value } = e.target;
    this.setState({
      examen: {
        ...this.state.examen,
        [name]: value,
      },
    });
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  toggleDropDown2() {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2,
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
        this.setState({ Publicaciones: data, cargaP: false });
      });
  }

  fetchAlumnos(data) {
    fetch("/app/get_actividades_students", {
      method: "POST",
      body: JSON.stringify({
        materia_id: data.idMateria,
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
    this.setState({ bandera: 2, seleccion: datos });
    this.FetchPublicaciones(datos);
    this.fetchActividades(datos);
    this.fetchAlumnos(datos);
  }

  cerrarMostrar() {
    this.setState({
      bandera: 1,
      cargaP: true,
      Publicaciones: [],
      Actividades: [],
      collapseExamen: true,
      collapseNuevoExamen: false,
      collapsePregunta: false,
      collapseNuevaPregunta: false,
    });
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

  CrearExamen() {
    fetch("/app/create_examen", {
      method: "POST",
      body: JSON.stringify({
        titulo: this.state.examen.nombre,
        fecha_publicacion: this.state.examen.date,
        hora_inicio: this.state.examen.timeI,
        hora_fin: this.state.examen.timeF,
        id_materia: this.state.seleccion.idMateria,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Mensaje!", data.msg, "info");
        if (data.msg != "Ingresa un titulo diferente") {
          this.setState({
            collapseExamen: !this.state.collapseExamen,
            collapseNuevoExamen: !this.state.collapseNuevoExamen,
          });
        }
      });
  }

  Pregunta() {
    fetch("/app/insert_pregunta", {
      method: "POST",
      body: JSON.stringify({
        par_enunciado: this.state.preg,
        examen: this.state.examen.nombre,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ idPregunta: data.msg, respuestas: [], preg: "" });
        this.fetchPreguntas();
      });
  }

  fetchPreguntas() {
    fetch("/app/get_pregunta_by_examen", {
      method: "POST",
      body: JSON.stringify({
        examen: this.state.examen.nombre,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          collapseNuevaPregunta: false,
          modal_respuestas: true,
          collapseNuevaRespuesta: true,
          preguntas: data,
        });
      });
  }

  InsertRespuesta(tipo) {
    let tp;
    if (tipo == 1) {
      tp = true;
    } else {
      tp = false;
    }
    fetch("/app/insert_respuesta", {
      method: "POST",
      body: JSON.stringify({
        respuesta: this.state.textRespues,
        es_respuesta: tp,
        id_pregunta: this.state.idPregunta,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.fetchRespuestas();
        this.setState({ textRespues: "" });
      });
  }

  mostrarRespuestas(dato) {
    fetch("/app/get_respuesta_by_id", {
      method: "POST",
      body: JSON.stringify({
        idPregunta: dato.idPregunta,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ respuestas: data, modal_respuestas: true });
      });
  }

  fetchRespuestas() {
    fetch("/app/get_respuesta_by_id", {
      method: "POST",
      body: JSON.stringify({
        idPregunta: this.state.idPregunta,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ respuestas: data, collapseNuevaRespuesta: false });
      });
  }

  NuevaRespuesta() {
    this.setState({
      collapseNuevaRespuesta: !this.state.collapseNuevaRespuesta,
    });
  }
  cerrarModalRespuestas() {
    this.setState({ modal_respuestas: false, collapseNuevaRespuesta: false });
  }

  CrearPreguntas() {
    this.setState({
      collapsePregunta: !this.state.collapsePregunta,
      collapseNuevaPregunta: !this.state.collapseNuevaPregunta,
    });
  }

  NuevaPregunta() {
    this.setState({ collapseNuevaPregunta: !this.state.collapseNuevaPregunta });
  }

  mostrarcollapseExamen() {
    this.setState({ collapseExamen: !this.state.collapseExamen });
  }

  CerrarExamen() {
    this.setState({
      collapseExamen: !this.state.collapseExamen,
      collapseNuevoExamen: !this.state.collapseNuevoExamen,
      collapsePregunta: !this.state.collapsePregunta,
      collapseNuevaPregunta: !this.state.collapseNuevaPregunta,
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

  Entregas_Actividad(dato) {
    fetch("/app/entrega_by_actividad", {
      method: "POST",
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
        console.log(data);
        this.setState({
          Entregas: data,
          modal_entregas: true,
          NombreActividad: dato.Titulo,
        });
      });
  }

  cerrarModalEntregas() {
    this.setState({
      modal_entregas: false,
    });
  }

  VerEntrega(dato) {
    this.setState({
      modal_entregas_archivo: true,
      entrega: dato,
      ealumno: dato.Nombre,
      file: `http://localhost:8000/static/${dato.Path_archivo}`,
    });
  }

  cerrarModalEntregas_Archivo() {
    this.setState({
      modal_entregas_archivo: false,
    });
  }

  calificar() {
    console.log(this.state.punteo);
    console.log(this.state.entrega.Valor);
    if (this.state.punteo > this.state.entrega.Valor) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Punteo mayor que el valor de la actividad",
      });
    } else {
      fetch("/app/notificacion_insert", {
        method: "POST",
        body: JSON.stringify({
          titulo: this.state.NombreActividad,
          contenido: this.state.punteo + "/" + this.state.entrega.Valor,
          idAlumno: this.state.entrega.idAlumno,
          id_materia: this.state.seleccion.idMateria,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {});
      fetch("/app/entrega_calificar_", {
        method: "POST",
        body: JSON.stringify({
          idEntrega: this.state.entrega.idEntrega,
          Punteo: this.state.punteo,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          Swal.fire("Mensaje!", "Calificado con exito", "success");
          this.fetchActividades(this.state.seleccion);
          this.setState({
            modal_entregas_archivo: false,
            modal_entregas: false,
          });
        });
    }
  }

  materias_asignadas() {
    this.setState({ bandera: 1 });
  }
  Laumnos() {
    this.setState({ bandera: 3 });
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
          <center>
            <ButtonDropdown
              isOpen={this.state.dropdownOpen2}
              toggle={this.toggleDropDown2}
            >
              <DropdownToggle caret>Visualizar</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => this.materias_asignadas()}>
                  Materias Asignadas
                </DropdownItem>
                <DropdownItem onClick={() => this.Laumnos()}>
                  Alumnos General
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </center>
        </div>
        <div className="xmt">
          <h2>Modulo Maestro</h2>
        </div>
        <div className="box"></div>
        {(() => {
          if (this.state.bandera === 1) {
            return <MateriasA this={this} />;
          } else if (this.state.bandera === 2) {
            return <Materia this={this} />;
          } else if (this.state.bandera === 3) {
            return <Alumno_carga this={this} />;
          } else {
            return (
              <center>
                <div className="box"></div>
                <div class="load-wrapp">
                  <div class="load-6">
                    <div class="letter-holder">
                      <div class="l-1 letter">S</div>
                      <div class="l-2 letter">e</div>
                      <div class="l-3 letter">l</div>
                      <div class="l-4 letter">e</div>
                      <div class="l-5 letter">c</div>
                      <div class="l-6 letter">c</div>
                      <div class="l-7 letter">i</div>
                      <div class="l-8 letter">o</div>
                      <div class="l-9 letter">n</div>
                      <div class="l-10 letter">e</div>
                      <div class="l-11 letter">{'_'}</div>
                      <div class="l-12 letter">V</div>
                      <div class="l-13 letter">i</div>
                      <div class="l-14 letter">s</div>
                      <div class="l-15 letter">t</div>
                      <div class="l-16 letter">a</div>
                      <div class="l-1 letter">-</div>
                      <div class="l-2 letter">-</div>
                      <div class="l-3 letter">{'>'}</div>
                    </div>
                  </div>
                </div>
              </center>
            );
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
      <Button
        color="primary"
        onClick={() => props.this.mostrarcollapsePublicacion()}
      >
        Crear Nueva Publicacion
      </Button>
      <Collapse isOpen={props.this.state.collapsePublicacion}>
        <div style={{ height: "8cm" }}>
          <Card style={{ width: "100%", height: "100%" }}>
            <center>
              <h5>Ingrese Publicacion</h5>
            </center>
            <CardBody>
              <textarea
                style={{ height: "4cm" }}
                class="form-control"
                name="descripcion"
                onChange={props.this.handleChangeP}
              />
              <div className="boxer"></div>
              <Button
                style={{ width: "100%" }}
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
                <div style={{ height: "8cm" }}>
                  <Card style={{ width: "100%", height: "90%" }}>
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
                        <p>
                          <Button
                            color="info"
                            onClick={() => props.this.mostrarEdicion(dato)}
                          >
                            Editar
                          </Button>
                        </p>
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
                <div style={{ height: "10cm" }}>
                  <Card style={{ width: "100%", height: "90%" }}>
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
                          <p>
                            <Button
                              style={{ width: "100%" }}
                              color="secondary"
                              onClick={() =>
                                props.this.Entregas_Actividad(dato)
                              }
                            >
                              Ver Entregas
                            </Button>
                          </p>
                          <Button
                            style={{ width: "100%" }}
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

      <Modal isOpen={props.this.state.modal_entregas} fade={false}>
        <ModalHeader>
          <div>
            <h3>Entregas de Actividad: {props.this.state.NombreActividad} </h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <Table hover>
            <thead>
              <tr>
                <th>Carnet</th>
                <th>Nombre Completo</th>
                <th>Entrega</th>
              </tr>
            </thead>
            <tbody>
              {props.this.state.Entregas.map((dato) =>
                (() => {
                  if (dato.Estado === 1) {
                    return (
                      <tr key={dato.idAlumno}>
                        <td>{dato.Carnet}</td>
                        <td>
                          {dato.Nombre} {dato.Apellido}
                        </td>
                        <td>
                          {(() => {
                            if (dato.Path_archivo == null) {
                              return (
                                <text style={{ color: "red" }}>
                                  {" "}
                                  Sin Entrega
                                </text>
                              );
                            } else {
                              return (
                                <Button
                                  color="info"
                                  onClick={() => props.this.VerEntrega(dato)}
                                >
                                  Ver
                                </Button>
                              );
                            }
                          })()}
                        </td>
                      </tr>
                    );
                  }
                  return;
                })()
              )}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn btn-danger"
            onClick={() => props.this.cerrarModalEntregas()}
          >
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>

      <VerArchivo this={props.this} />
    </Container>
  );
}

function VerArchivo(props) {
  return (
    <Modal
      isOpen={props.this.state.modal_entregas_archivo}
      fade={false}
      size="lg"
      style={{ maxWidth: "700px", width: "100%" }}
    >
      <ModalHeader>
        <div>
          <h3>Entrega: {props.this.state.ealumno} </h3>
        </div>
      </ModalHeader>
      <ModalBody>
        <embed
          src={props.this.state.file}
          alt="trial"
          width="650"
          height="500"
        ></embed>
        {(() => {
          if (props.this.state.entrega.Puntuacion != null) {
            return <Label>Calificado</Label>;
          } else {
            return (
              <Form inline>
                <FormGroup>
                  <Label>Puntuacion:</Label>{" "}
                  <input
                    style={{ width: "50%" }}
                    type="number"
                    name="punteo"
                    onChange={props.this.handleChangePu}
                    placeholder="Ingrese nota menor al valor"
                  />{" "}
                  <Label>{`/${props.this.state.entrega.Valor}`}</Label>{" "}
                  <Button
                    color="primary"
                    onClick={() => props.this.calificar()}
                  >
                    Calificar
                  </Button>
                </FormGroup>
              </Form>
            );
          }
        })()}
      </ModalBody>
      <ModalFooter>
        <Button
          className="btn btn-danger"
          onClick={() => props.this.cerrarModalEntregas_Archivo()}
        >
          Cerrar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

function Examen(props) {
  return (
    <Container>
      <Collapse isOpen={props.this.state.collapseExamen}>
        <div style={{ height: "15cm" }}>
          <Card style={{ width: "100%", height: "90%" }}>
            <CardBody>
              <CardTitle tag="h3">Nuevo Examen</CardTitle>
              <CardText>
                <p>
                  <FormGroup>
                    <Label>Nombre Unico</Label>
                    <input
                      className="form-control"
                      name="nombre"
                      type="text"
                      onChange={props.this.handleChangeE}
                    />
                  </FormGroup>
                </p>
                <p>
                  <FormGroup>
                    <Label>Fecha Publicacion</Label>
                    <Input
                      type="date"
                      name="date"
                      placeholder="Fecha"
                      onChange={props.this.handleChangeE}
                    />
                  </FormGroup>
                </p>
                <p>
                  <FormGroup>
                    <Label>Hora Inicio</Label>
                    <Input
                      type="time"
                      name="timeI"
                      placeholder="Hora Inicio"
                      onChange={props.this.handleChangeE}
                    />
                  </FormGroup>
                </p>
                <p>
                  <FormGroup>
                    <Label>Hora Fin</Label>
                    <Input
                      type="time"
                      name="timeF"
                      placeholder="Hora Fin"
                      onChange={props.this.handleChangeE}
                    />
                  </FormGroup>
                </p>
                <center>
                  <p>
                    <Button
                      style={{ width: "100%" }}
                      color="primary"
                      onClick={() => props.this.CrearExamen()}
                    >
                      Crear Examen
                    </Button>
                  </p>
                </center>
              </CardText>
            </CardBody>
          </Card>
        </div>
      </Collapse>

      <Collapse isOpen={props.this.state.collapseNuevoExamen}>
        <div className="box"></div>
        <div className="boxer"></div>
        <div className="jumbotron" style={{ height: "11cm" }}>
          <center>
            <h1 className="display-3">{props.this.state.examen.nombre}</h1>
            <p className="lead">Hora Inicio: {props.this.state.examen.timeI}</p>
            <p className="lead">Hora Fin: {props.this.state.examen.timeF}</p>
            <hr className="my-2" />
            <p>Fecha de Publicacion: {props.this.state.examen.date}</p>
            <hr className="my-2" />
            <div className="boxer"> </div>
            <p>
              <Progress
                animated
                color="secondary"
                value={props.this.state.barra}
              >
                {" "}
                Progreso de creacion de examen
              </Progress>
            </p>
            <div className="boxer"> </div>
            <p className="lead">
              <Button
                style={{ width: "100%" }}
                color="secondary"
                onClick={() => props.this.CrearPreguntas()}
              >
                Crear Preguntas
              </Button>
            </p>
            <p className="lead">
              <Button
                style={{ width: "100%" }}
                color="danger"
                onClick={() => props.this.CerrarExamen()}
              >
                Cerrar Examen
              </Button>
            </p>
          </center>
        </div>
      </Collapse>
      <Collapse isOpen={props.this.state.collapsePregunta}>
        <div style={{ height: "18cm" }}>
          <center>
            {" "}
            <h4>Preguntas</h4>{" "}
          </center>
          <hr className="my-2" />
          <ListGroup>
            {props.this.state.preguntas.map((dato) => (
              <ListGroupItem
                tag="button"
                onClick={() => props.this.mostrarRespuestas(dato)}
                action
              >
                {dato.Enunciado_pregunta}
              </ListGroupItem>
            ))}
            <ListGroupItem
              tag="button"
              active
              onClick={() => props.this.NuevaPregunta()}
              action
            >
              Nueva Pregunta
            </ListGroupItem>
          </ListGroup>
          <div className="boxer"></div>
          <Collapse isOpen={props.this.state.collapseNuevaPregunta}>
            <CardBody>
              <FormGroup>
                <Label>
                  <b>Ingrese nueva pregunta</b>
                </Label>
                <Input
                  className="form-control"
                  name="preg"
                  type="text"
                  value={props.this.state.preg}
                  onChange={props.this.handleChangePr}
                />
              </FormGroup>
              <center>
                <Button
                  style={{ width: "40%" }}
                  color="secondary"
                  onClick={() => props.this.Pregunta()}
                >
                  Ingresar Pregunta
                </Button>
              </center>
            </CardBody>
          </Collapse>
        </div>
      </Collapse>

      <Modal isOpen={props.this.state.modal_respuestas} fade={false}>
        <ModalHeader>
          <div>
            <h4>Respuestas de: {props.this.state.preg} </h4>
          </div>
        </ModalHeader>
        <ModalBody>
          <ListGroup>
            {props.this.state.respuestas.map((dato) =>
              (() => {
                if (dato.esRespuesta == 1) {
                  return (
                    <ListGroupItem color="success" action>
                      {dato.Texto_respuesta}
                    </ListGroupItem>
                  );
                } else {
                  return (
                    <ListGroupItem color="danger" action>
                      {dato.Texto_respuesta}
                    </ListGroupItem>
                  );
                }
              })()
            )}
            <ListGroupItem
              color="info"
              tag="button"
              active
              onClick={() => props.this.NuevaRespuesta()}
              action
            >
              Nueva Respuesta
            </ListGroupItem>
          </ListGroup>
          <div className="boxer"></div>
          <Collapse isOpen={props.this.state.collapseNuevaRespuesta}>
            <CardBody>
              <InputGroup>
                <Input
                  type="text"
                  name="textRespues"
                  value={props.this.state.textRespues}
                  onChange={props.this.handleChangeRe}
                  placeholder="Ingrese Respuesta"
                />
                <ButtonDropdown
                  addonType="append"
                  isOpen={props.this.state.dropdownOpen}
                  toggle={props.this.toggleDropDown}
                >
                  <DropdownToggle caret>Tipo de Respuesta</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => props.this.InsertRespuesta(2)}>
                      Incorrecta
                    </DropdownItem>
                    <DropdownItem onClick={() => props.this.InsertRespuesta(1)}>
                      Correcta
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </InputGroup>
            </CardBody>
          </Collapse>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn btn-danger"
            onClick={() => props.this.cerrarModalRespuestas()}
          >
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

function Alumnos(props) {
  return (
    <Container>
      <div className="box"></div>
      <Table dark>
        <thead>
          <tr>
            <th>Carnet</th>
            <th>Nombre Completo</th>
            {props.this.state.Actividades.map((dato) => (
              <th>{dato.Titulo}</th>
            ))}
            <th>Total</th>
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
                    {dato.Actividades.map((date) =>
                      (() => {
                        if (date.Puntuacion != "NaN") {
                          return <td>{date.Puntuacion}</td>;
                        }
                        return <td></td>;
                      })()
                    )}
                    <td>{dato.Nota}</td>
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

function Alumno_carga(props) {
  return (
    <Container>
      <div className="boxer"></div>
      <center>
        <u>
          <h3>Manejo de Alumnos</h3>
        </u>
      </center>
      <div className="box"></div>
      <Tabs>
        <TabList>
          <Tab>Carga</Tab>
          <Tab>Alumnos</Tab>
        </TabList>
        <TabPanel>
          <Carga this={props.this} />
        </TabPanel>
        <TabPanel>
          <Manejo_Alumnos this={props.this} />
        </TabPanel>
      </Tabs>
    </Container>
  );
}

function Carga(props) {
  return (
    <Container>
      <div className="boxer"></div>
      <ReactFileReader
        multipleFiles={false}
        fileTypes={[".csv"]}
        handleFiles={props.this.handleFiles}
      >
        <button className="btn">Subir Archivo</button>
      </ReactFileReader>
      <div className="boxer"></div>
      <div className="boxer"></div>
      <CsvToHtmlTable
        data={props.this.state.value}
        csvDelimiter=","
        tableClassName="table table-striped table-hover"
        //hasHeader = {false}
      />
      <div className="boxer"></div>
      <Button fullWidth color="primary" onClick={() => props.this.Carga()}>
        Cargar
      </Button>
    </Container>
  );
}

function Manejo_Alumnos(props) {
  return (
    <div>
      <Container>
        <br />
        <Button
          color="primary"
          onClick={() => props.this.mostrarModalInsertarA()}
        >
          Crear Alumno
        </Button>
        <br />
        <br />
        <Table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Carnet</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Correo</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          {props.this.state.tasks2.map((dato) =>
            (() => {
              if (dato.Estado === 1) {
                return <IfyesA dato={dato} this={props.this} />;
              } else {
                return <ElseA dato={dato} this={props.this} />;
              }
            })()
          )}
        </Table>
        <center>
          <b>{props.this.state.pagina}</b>
        </center>
        <Button color="secondary" onClick={() => props.this.AntPag()}>
          Anterior Pagina
        </Button>
        <Button
          style={{ float: "right" }}
          color="secondary"
          onClick={() => props.this.SigPag()}
        >
          Siguiente Pagina
        </Button>
        <div className="box"></div>
      </Container>

      <Modal isOpen={props.this.state.modalInsertarA} fade={false}>
        <ModalHeader>
          <div>
            <h3>Crear Alumno</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre</label>
            <input
              className="form-control"
              name="nombre"
              type="text"
              onChange={props.this.handleChangeA}
            />
          </FormGroup>
          <FormGroup>
            <label>Apellido</label>
            <input
              className="form-control"
              name="apellido"
              type="text"
              onChange={props.this.handleChangeA}
            />
          </FormGroup>
          <FormGroup>
            <label>Carnet:</label>
            <input
              className="form-control"
              name="carnet"
              type="number"
              onChange={props.this.handleChangeA}
            />
          </FormGroup>
          <FormGroup>
            <label>Telefono:</label>
            <input
              className="form-control"
              name="telefono"
              type="text"
              onChange={props.this.handleChangeA}
            />
          </FormGroup>
          <FormGroup>
            <label>Direccion:</label>
            <input
              className="form-control"
              name="direccion"
              type="text"
              onChange={props.this.handleChangeA}
            />
          </FormGroup>
          <FormGroup>
            <label>Correo:</label>
            <input
              className="form-control"
              name="correo"
              type="email"
              onChange={props.this.handleChangeA}
            />
          </FormGroup>
          <FormGroup>
            <label>Contraseña</label>
            <input
              className="form-control"
              name="pass"
              type="password"
              onChange={props.this.handleChangeA}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => props.this.insertarA()}>
            Insertar
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => props.this.cerrarModalInsertarA()}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

function IfyesA(props) {
  var dato = props.dato;
  return (
    <tbody>
      <tr key={dato.idAlumno}>
        <td>{dato.Nombre}</td>
        <td>{dato.Apellido}</td>
        <td>{dato.Carnet}</td>
        <td>{dato.Telefono}</td>
        <td>{dato.Direccion}</td>
        <td>{dato.Correo_electronico}</td>
        <td>
          <Button color="danger" onClick={() => props.this.eliminarA(dato)}>
            Eliminar
          </Button>
        </td>
      </tr>
    </tbody>
  );
}

function ElseA(props) {
  var dato = props.dato;
  return (
    <tbody style={{ backgroundColor: "#F44336" }}>
      <tr key={dato.idAlumno}>
        <td>{dato.Nombre}</td>
        <td>{dato.Apellido}</td>
        <td>{dato.Carnet}</td>
        <td>{dato.Telefono}</td>
        <td>{dato.Direccion}</td>
        <td>{dato.Correo_electronico}</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  );
}

export default teacher;
