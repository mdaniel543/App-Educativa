import React, { Component, useState } from "react";
import axios from "axios";
import Barra from "../components/menu_bar";
import Moment from "react-moment";

import Dropdown from "react-dropdown";

import "../styles/titles.css";
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

class admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalInsertarM: false,
      modalInsertarA: false,
      modalEditarM: false,
      modalEditarA: false,
      ModalAsignarM: false,
      ModalAsignarE: false,
      tasks: [],
      tasks2: [],
      data: {
        nombre: "",
        apellido: "",
        numero: "",
        telefono: "",
        direccion: "",
        correo: "",
        fecha: "",
        dpi: "",
        pass: "",
        carnet: "",
        rutaphoto: "",
      },
      data_alumno: {
        idAlumno: "",
        Nombre: "",
        Apellido: "",
        Carnet: "",
        Telefono: "",
        Direccion: "",
        Correo_electronico: "",
        Pass: "",
        Estado: "",
      },
      data_maestro: {
        idMaestro: "",
        Nombre: "",
        Apellido: "",
        Registro: "",
        Telefono: "",
        Direccion: "",
        Correo_electronico: "",
        Fecha_nacimiento: "",
        DPI: "",
        Path_foto: "",
        Pass: "",
        Estado: "",
      },
      carrera_curso: {
        nombre: "",
        descripcion: "",
      },
      rutacsv: "",
      value: "",
      options: ["Maestro", "Alumno"],
      option: "",
      carreras: [],
      listCarreras: [],
      optcarrera: "",
      cursos: [],
      optcurso: "",
      load2: false,
      load: "",
      pagina: 0,
      paginaM: 0,
      fecha_aux: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDT = this.handleChangeDT.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeMA = this.handleChangeMA.bind(this);
    this.handleChangeCC = this.handleChangeCC.bind(this);
    this.cargarFoto = this.cargarFoto.bind(this);
    this.handleChangeP = this.handleChangeP.bind(this);
    this.handleChangeOPC = this.handleChangeOPC.bind(this);
    this.handleChangeOPCU = this.handleChangeOPCU.bind(this);

    //Swal.fire("Mi id", this.props.id, "info");
    this.fetchCarreras();
    this.fetchCursos();
    this.SigPagM();
    this.SigPag();
  }
  fetchTest() {
    fetch("/test")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire(
          "Mensaje !",
          data.message, //recibo mensaje
          "info"
        );
      })
      .catch((err) => console.error(err));
  }

  fetchTasks() {
    var page = this.state.paginaM;
    fetch("/app/selectMaestros", {
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
        this.setState({ tasks: data.data[0] });
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
  AntPagM() {
    var page = this.state.paginaM;
    page--;
    console.log(page);

    fetch("/app/selectMaestros", {
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
        console.log(data.data[0]);
        this.setState({ tasks: data.data[0] });
        this.setState({ paginaM: page });
      });
  }
  SigPagM() {
    var page = this.state.paginaM;
    page++;
    console.log(page);

    fetch("/app/selectMaestros", {
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
        console.log(data.data[0]);
        this.setState({ tasks: data.data[0] });
        this.setState({ paginaM: page });
      });
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
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value,
      },
    });
  }
  handleChangeDate(e) {
    const { name, value } = e.target;
    this.setState({
      fecha_aux: value,
    });
  }
  handleChangeDT(e) {
    const { name, value } = e.target;
    this.setState({
      data_alumno: {
        ...this.state.data_alumno,
        [name]: value,
      },
    });
  }
  handleChangeMA(e) {
    const { name, value } = e.target;
    this.setState({
      data_maestro: {
        ...this.state.data_maestro,
        [name]: value,
      },
    });
  }
  handleChangeP(e) {
    this.setState({
      option: e.value,
    });
  }

  handleChangeCC(e) {
    const { name, value } = e.target;
    this.setState({
      carrera_curso: {
        ...this.state.carrera_curso,
        [name]: value,
      },
    });
  }

  handleChangeOPC(e) {
    const { name, value } = e.target;
    this.setState({
      optcarrera: value,
    });
  }

  handleChangeOPCU(e) {
    const { name, value } = e.target;
    this.setState({
      optcurso: value,
    });
  }

  cargarFoto(e) {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    axios.post("/app/carga", formData, {}).then((res) => {
      console.log(res.data.msg);
      this.setState({
        data: {
          ...this.state.data,
          rutaphoto: res.data.msg,
        },
      });
      console.log(this.state.data);
    });
  }

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

  cerrarSesion = () => {
    window.location.href = "../";
  };

  mostrarModalAsignacionM(dato) {
    this.setState({ ModalAsignarM: true, data_maestro: dato });
  }
  cerrarModalAsignacionM() {
    this.setState({ ModalAsignarM: false });
  }

  mostrarModalAsignacionA(dato) {
    this.setState({ ModalAsignarE: true, data_alumno: dato });
  }
  cerrarModalAsignacionA() {
    this.setState({ ModalAsignarE: false });
  }

  mostrarModalInsertar() {
    this.setState({ modalInsertarM: true });
  }
  cerrarModalInsertarM() {
    this.setState({ modalInsertarM: false });
  }

  mostrarModalInsertarA() {
    this.setState({ modalInsertarA: true });
  }
  cerrarModalInsertarA() {
    this.setState({ modalInsertarA: false });
  }
  mostrarModalActualizarM(dato, date) {
    this.setState({
      data_maestro: dato,
      modalEditarM: true,
    });
    this.parsearFecha(date);
  }

  parsearFecha(date) {
    var fecha = "";
    for (let index = 0; index < 10; index++) {
      fecha += date[index];
    }
    console.log(fecha);

    this.setState({
      fecha_aux: fecha,
    });
  }

  mostrarModalActualizarA(dato) {
    this.setState({
      data_alumno: dato,
      modalEditarA: true,
    });
  }
  cerrarModalActualizarA() {
    this.setState({ modalEditarA: false });
  }
  cerrarModalActualizarM() {
    this.setState({ modalEditarM: false });
  }

  eliminarM(dato) {
    Swal.fire({
      title: "Deseas eliminar el maestro?",
      text: "No se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.setState({ load2: true });
        fetch("/app/delete_maestro", {
          //eliminar maestro
          method: "DELETE",
          body: JSON.stringify({
            Registro: dato.Registro, //envio solo dpi
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            Swal.fire("Eliminado!", data.msg, "success");
            this.fetchTasks();
            this.setState({ load2: false });
          })
          .catch((err) => console.error(err));
      }
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

  editarM(dato) {
    this.setState({ load2: true });
    console.log(this.state.fecha_aux);
    fetch("/app/update_maestro", {
      // metodo put a editar el maestro
      method: "PUT",
      body: JSON.stringify({
        Nombre: dato.Nombre,
        Apellido: dato.Apellido,
        Registro: dato.Registro,
        Telefono: dato.Telefono,
        Direccion: dato.Direccion,
        Correo: dato.Correo_electronico,
        Fecha_nacimiento: this.state.fecha_aux,
        Dpi: dato.DPI,
        Path_foto: this.state.data.rutaphoto,
        Estado: dato.Estado,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Editado!", data.msg, "success");
        this.fetchTasks();
        this.setState({
          load2: false,
          data: { ...this.state.data, rutaphoto: "" },
        });
      })
      .catch((err) => console.error(err));
    this.cerrarModalActualizarM();
  }

  editarA(dato) {
    this.setState({ load2: true });
    fetch("/app/update_alumno", {
      // metodo put a editar el alumno
      method: "PUT",
      body: JSON.stringify({
        Nombre: dato.Nombre,
        Apellido: dato.Apellido,
        Carnet: dato.Carnet,
        Telefono: dato.Telefono,
        Direccion: dato.Direccion,
        Correo: dato.Correo_electronico,
        estado: dato.Estado,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Editado!", data.msg, "success");
        this.fetchTasks2();
        this.setState({ load2: false });
      })
      .catch((err) => console.error(err));
    this.cerrarModalActualizarA();
  }

  insertarM(fecha) {
    let fecha_cambio = `${fecha.getFullYear()}/${
      fecha.getMonth() + 1
    }/${fecha.getDate()}`;
    this.setState({ load2: true });
    console.log(this.state.data);
    console.log(fecha_cambio);
    fetch("/app/insert_maestro", {
      ///insertar maestro
      method: "POST",
      body: JSON.stringify({
        Nombre: this.state.data.nombre,
        Apellido: this.state.data.apellido,
        Registro: this.state.data.numero,
        Telefono: this.state.data.telefono,
        Direccion: this.state.data.direccion,
        Correo: this.state.data.correo,
        path_foto: this.state.data.rutaphoto,
        fecha_nacimiento: fecha_cambio,
        dpi: this.state.data.dpi,
        pass: this.state.data.pass,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Mensaje!", data.msg, "info");
        this.fetchTasks();
        this.setState({
          load2: false,
          data: { ...this.state.data, rutaphoto: "" },
        });
      })
      .catch((err) => console.error(err));
    this.cerrarModalInsertarM();
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

  Carga() {
    let usuarios = this.state.option;
    console.log(usuarios);
    if (usuarios === "Maestro") {
      this.CargaMaestro();
    } else if (usuarios === "Alumno") {
      this.CargaAlumno();
    }
  }

  CargaMaestro() {
    fetch("/app/carga_sel", {
      method: "POST",
      body: JSON.stringify({
        user: "Maestro",
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
        this.fetchTasks();
        this.setState({ load2: false });
      })
      .catch((err) => console.error(err));
  }

  CargaAlumno() {
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

  fetchCarreras() {
    fetch("/app/Select_Carrera") //consulta todos los alumnos en el servidor
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const aux = [];
        for (const i of data) {
          aux.push(i.Nombre_carrera);
        }
        this.setState({ listCarreras: data, carreras: aux });
      });
  }

  fetchCursos() {
    fetch("/app/Select_Cursos") //consulta todos los alumnos en el servidor
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const aux = [];
        for (const i of data) {
          aux.push(i.Nombre);
        }
        this.setState({ listCursos: data, cursos: aux });
      });
  }

  crearCarrera() {
    fetch("/app/insert_carrera", {
      method: "POST",
      body: JSON.stringify({
        nombre: this.state.carrera_curso.nombre,
        descripcion: this.state.carrera_curso.descripcion,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Mensaje!", data.msg, "info");
        this.fetchCarreras();
      })
      .catch((err) => console.error(err));
  }

  crearCurso() {
    fetch("/app/insert_curso", {
      method: "POST",
      body: JSON.stringify({
        nombre: this.state.carrera_curso.nombre,
        descripcion: this.state.carrera_curso.descripcion,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Mensaje!", data.msg, "info");
        this.fetchCursos();
      })
      .catch((err) => console.error(err));
  }

  Asignar_Curso_Carrera() {
    console.log(this.state.optcarrera);
    console.log(this.state.optcurso);
    fetch("/app/assign_curso_carrera", {
      method: "POST",
      body: JSON.stringify({
        idCarrera: this.state.optcarrera,
        idCurso: this.state.optcurso,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Mensaje!", data.msg, "info");
      })
      .catch((err) => console.error(err));
  }

  Asignar_maestro_curso(data) {
    fetch("/app/assign_maestro_curso", {
      method: "POST",
      body: JSON.stringify({
        idMaestro: data.idMaestro,
        idCurso: this.state.optcurso,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ModalAsignarM: false})
        Swal.fire("Mensaje!", data.msg, "success");
      })
      .catch((err) => console.error(err));
  }

  Asignar_alumno_carrera(data) {
    fetch("/app/assign_alumno_carrera", {
      method: "POST",
      body: JSON.stringify({
        idAlumno: data.idAlumno,
        idCarrera: this.state.optcarrera,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ModalAsignarE: false})
        Swal.fire("Mensaje!", data.msg, "success");
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div>
        <Load this={this} />
        <Barra this={this} />
        <div className="xml">
          <h1>Modulo Administrativo</h1>
        </div>
        <div className="box"></div>
        <Container>
          <Tabs>
            <TabList>
              <Tab>Carga CSV</Tab>
              <Tab>Maestros</Tab>
              <Tab>Alumnos</Tab>
              <Tab>Crear carrera</Tab>
              <Tab>Crear curso</Tab>
              <Tab>Asignar curso a carrera</Tab>
            </TabList>
            <TabPanel>
              <Carga this={this} />
            </TabPanel>
            <TabPanel>
              <Maestro this={this} />
            </TabPanel>
            <TabPanel>
              <Alumno this={this} />
            </TabPanel>
            <TabPanel>
              <Carrera this={this} />
            </TabPanel>
            <TabPanel>
              <Curso this={this} />
            </TabPanel>
            <TabPanel>
              <Curso_Carrera this={this} />
            </TabPanel>
          </Tabs>
        </Container>
      </div>
    );
  }
}

function Load(props) {
  return (
    <Modal isOpen={props.this.state.load2} fade={false}>
      <div class="load">
        <hr />
        <hr />
        <hr />
        <hr />
      </div>
    </Modal>
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
      <FormGroup>
        <Dropdown
          name="Dep"
          onChange={props.this.handleChangeP}
          options={props.this.state.options}
          value={props.this.state.option}
          placeholder="Seleccione usuarios a cargar"
        />
      </FormGroup>
      <Button fullWidth color="primary" onClick={() => props.this.Carga()}>
        Cargar
      </Button>
      <div className="boxer"></div>
      <CsvToHtmlTable
        data={props.this.state.value}
        csvDelimiter=","
        tableClassName="table table-striped table-hover"
        //hasHeader = {false}
      />
    </Container>
  );
}

function Maestro(props) {
  var [startDate, setStartDate] = useState(null);
  return (
    <div>
      <Container>
        <br />
        <Button
          color="primary"
          onClick={() => props.this.mostrarModalInsertar()}
        >
          Crear Maestro
        </Button>
        <br />
        <br />
        <Table>
          <thead>
            <tr>
              <th>Registro</th>
              <th>DPI</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Fecha Nacimiento</th>
              <th>Correo</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          {props.this.state.tasks.map((dato) =>
            (() => {
              if (dato.Estado === 1) {
                return <IfyesM dato={dato} this={props.this} />;
              } else {
                return <ElseM dato={dato} this={props.this} />;
              }
            })()
          )}
        </Table>
        <center>
          <b>{props.this.state.paginaM}</b>
        </center>
        <Button color="secondary" onClick={() => props.this.AntPagM()}>
          Anterior Pagina
        </Button>
        <Button
          style={{ float: "right" }}
          color="secondary"
          onClick={() => props.this.SigPagM()}
        >
          Siguiente Pagina
        </Button>
        <div className="box"></div>
      </Container>

      <Modal isOpen={props.this.state.modalInsertarM} fade={false}>
        <ModalHeader>
          <div>
            <h3>Crear Maestro</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre</label>
            <input
              className="form-control"
              name="nombre"
              type="text"
              onChange={props.this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Apellido</label>
            <input
              className="form-control"
              name="apellido"
              type="text"
              onChange={props.this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Numero registro:</label>
            <input
              className="form-control"
              name="numero"
              type="number"
              onChange={props.this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Telefono:</label>
            <input
              className="form-control"
              name="telefono"
              type="text"
              onChange={props.this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Direccion:</label>
            <input
              className="form-control"
              name="direccion"
              type="text"
              onChange={props.this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Correo:</label>
            <input
              className="form-control"
              name="correo"
              type="email"
              onChange={props.this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Fecha Nacimiento:</label>
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
            <label>DPI:</label>
            <input
              className="form-control"
              name="dpi"
              type="number"
              onChange={props.this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Fotografia</label>
            <p></p>
            <input
              type="file"
              multiple={false}
              accept=".jpg, .png, .jpeg"
              onChange={props.this.cargarFoto}
            />
          </FormGroup>
          <FormGroup>
            <label>Contraseña</label>
            <input
              className="form-control"
              name="pass"
              type="password"
              onChange={props.this.handleChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => props.this.insertarM(startDate)}
          >
            Insertar
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => props.this.cerrarModalInsertarM()}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={props.this.state.modalEditarM} fade={false}>
        <ModalHeader>
          <div>
            <h3>Editar Maestro</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre</label>
            <input
              className="form-control"
              name="Nombre"
              type="text"
              onChange={props.this.handleChangeMA}
              value={props.this.state.data_maestro.Nombre}
            />
          </FormGroup>
          <FormGroup>
            <label>Apellido</label>
            <input
              className="form-control"
              name="Apellido"
              type="text"
              onChange={props.this.handleChangeMA}
              value={props.this.state.data_maestro.Apellido}
            />
          </FormGroup>
          <FormGroup>
            <label>Numero registro:</label>
            <input
              className="form-control"
              name="Registro"
              type="number"
              disabled
              onChange={props.this.handleChangeMA}
              value={props.this.state.data_maestro.Registro}
            />
          </FormGroup>
          <FormGroup>
            <label>Telefono:</label>
            <input
              className="form-control"
              name="Telefono"
              type="text"
              onChange={props.this.handleChangeMA}
              value={props.this.state.data_maestro.Telefono}
            />
          </FormGroup>
          <FormGroup>
            <label>Direccion:</label>
            <input
              className="form-control"
              name="Direccion"
              type="text"
              onChange={props.this.handleChangeMA}
              value={props.this.state.data_maestro.Direccion}
            />
          </FormGroup>
          <FormGroup>
            <label>Correo:</label>
            <input
              className="form-control"
              name="Correo_electronico"
              type="email"
              onChange={props.this.handleChangeMA}
              value={props.this.state.data_maestro.Correo_electronico}
            />
          </FormGroup>
          <FormGroup>
            <label>Fecha Nacimiento:</label>
            <input
              className="form-control"
              name="Fecha_nacimiento"
              type="date"
              onChange={props.this.handleChangeDate}
              value={props.this.state.fecha_aux}
            />
          </FormGroup>
          <FormGroup>
            <label>DPI:</label>
            <input
              className="form-control"
              name="DPI"
              type="text"
              onChange={props.this.handleChangeMA}
              value={props.this.state.data_maestro.DPI}
            />
          </FormGroup>
          <FormGroup>
            <label>Fotografia</label>
            <p></p>
            <input
              type="file"
              multiple={false}
              accept=".jpg, .png, .jpeg"
              onChange={props.this.cargarFoto}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() =>
              props.this.editarM(props.this.state.data_maestro, startDate)
            }
          >
            Editar
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => props.this.cerrarModalActualizarM()}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={props.this.state.ModalAsignarM} fade={false}>
        <ModalHeader>
          <div>
            <h3>Asignar Maestro a curso</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>
              Registro:<b> {props.this.state.data_maestro.Registro} </b>
            </label>
            <img
              src={
                "http://localhost:8000/static/" +
                props.this.state.data_maestro.Path_foto
              }
              style={{ float: "right" }}
              alt="Sin Foto"
              width="80"
              height="80"
            ></img>
          </FormGroup>
          <FormGroup>
            <label>
              {props.this.state.data_maestro.Nombre}{" "}
              {props.this.state.data_maestro.Apellido}
            </label>
          </FormGroup>
          <FormGroup>
            <label>Asignar :</label>
            <select
              onChange={props.this.handleChangeOPCU}
              class="form-select"
              aria-label="Default select example"
            >
              <option value="0" selected>
                Seleccione Curso
              </option>
              {props.this.state.listCursos.map((dep) => (
                <option key={dep.idMateria} value={dep.idMateria}>
                  {dep.Nombre}
                </option>
              ))}
            </select>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() =>
              props.this.Asignar_maestro_curso(props.this.state.data_maestro)
            }
          >
            Asignar
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => props.this.cerrarModalAsignacionM()}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

function IfyesM(props) {
  var dato = props.dato;
  return (
    <tbody>
      <tr key={dato.Registro}>
        <td>{dato.Registro}</td>
        <td>{dato.DPI}</td>
        <td>{dato.Nombre}</td>
        <td>{dato.Apellido}</td>
        <td>{dato.Telefono}</td>
        <td>{dato.Direccion}</td>
        <td>
          <Moment format="DD/MM/YYYY">{dato.Fecha_nacimiento}</Moment>
        </td>
        <td>{dato.Correo_electronico}</td>
        <td>
          <Button
            color="primary"
            onClick={() =>
              props.this.mostrarModalActualizarM(dato, dato.Fecha_nacimiento)
            }
          >
            Editar
          </Button>
        </td>
        <td>
          <Button
            color="success"
            onClick={() => props.this.mostrarModalAsignacionM(dato)}
          >
            Asignar
          </Button>
        </td>
        <td>
          <Button color="danger" onClick={() => props.this.eliminarM(dato)}>
            Eliminar
          </Button>
        </td>
      </tr>
    </tbody>
  );
}

function ElseM(props) {
  var dato = props.dato;
  return (
    <tbody style={{ backgroundColor: "#F44336" }}>
      <tr key={dato.Registro}>
        <td>{dato.Registro}</td>
        <td>{dato.DPI}</td>
        <td>{dato.Nombre}</td>
        <td>{dato.Apellido}</td>

        <td>{dato.Telefono}</td>
        <td>{dato.Direccion}</td>
        <td>
          <Moment format="DD/MM/YYYY">{dato.Fecha_nacimiento}</Moment>
        </td>
        <td>{dato.Correo_electronico}</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  );
}

function Alumno(props) {
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
              onChange={props.this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Apellido</label>
            <input
              className="form-control"
              name="apellido"
              type="text"
              onChange={props.this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Carnet:</label>
            <input
              className="form-control"
              name="carnet"
              type="number"
              onChange={props.this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Telefono:</label>
            <input
              className="form-control"
              name="telefono"
              type="text"
              onChange={props.this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Direccion:</label>
            <input
              className="form-control"
              name="direccion"
              type="text"
              onChange={props.this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Correo:</label>
            <input
              className="form-control"
              name="correo"
              type="email"
              onChange={props.this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Contraseña</label>
            <input
              className="form-control"
              name="pass"
              type="password"
              onChange={props.this.handleChange}
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

      <Modal isOpen={props.this.state.modalEditarA} fade={false}>
        <ModalHeader>
          <div>
            <h3>Editar Alumno</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre</label>
            <input
              className="form-control"
              name="Nombre"
              type="text"
              onChange={props.this.handleChangeDT}
              value={props.this.state.data_alumno.Nombre}
            />
          </FormGroup>
          <FormGroup>
            <label>Apellido</label>
            <input
              className="form-control"
              name="Apellido"
              type="text"
              onChange={props.this.handleChangeDT}
              value={props.this.state.data_alumno.Apellido}
            />
          </FormGroup>
          <FormGroup>
            <label>Carnet:</label>
            <input
              className="form-control"
              name="Carnet"
              disabled
              type="number"
              onChange={props.this.handleChangeDT}
              value={props.this.state.data_alumno.Carnet}
            />
          </FormGroup>
          <FormGroup>
            <label>Telefono:</label>
            <input
              className="form-control"
              name="Telefono"
              type="text"
              onChange={props.this.handleChangeDT}
              value={props.this.state.data_alumno.Telefono}
            />
          </FormGroup>
          <FormGroup>
            <label>Direccion:</label>
            <input
              className="form-control"
              name="Direccion"
              type="text"
              onChange={props.this.handleChangeDT}
              value={props.this.state.data_alumno.Direccion}
            />
          </FormGroup>
          <FormGroup>
            <label>Correo:</label>
            <input
              className="form-control"
              name="Correo_electronico"
              type="email"
              onChange={props.this.handleChangeDT}
              value={props.this.state.data_alumno.Correo_electronico}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => props.this.editarA(props.this.state.data_alumno)}
          >
            Editar
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => props.this.cerrarModalActualizarA()}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={props.this.state.ModalAsignarE} fade={false}>
        <ModalHeader>
          <div>
            <h3>Asignar Alumno a Carrera</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>
              Carnet:<b> {props.this.state.data_alumno.Carnet} </b>
            </label>
          </FormGroup>
          <FormGroup>
            <label>
              {props.this.state.data_alumno.Nombre}{" "}
              {props.this.state.data_alumno.Apellido}
            </label>
          </FormGroup>
          <FormGroup>
            <label>Asignar :</label>
            <select
              onChange={props.this.handleChangeOPC}
              class="form-select"
              aria-label="Default select example"
            >
              <option value="0" selected>
                Seleccione Carrera
              </option>
              {props.this.state.listCarreras.map((dep) => (
                <option key={dep.idCarrera} value={dep.idCarrera}>
                  {dep.Nombre_carrera}
                </option>
              ))}
            </select>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() =>
              props.this.Asignar_alumno_carrera(props.this.state.data_alumno)
            }
          >
            Asignar
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => props.this.cerrarModalAsignacionA()}
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
          <Button
            color="primary"
            onClick={() => props.this.mostrarModalActualizarA(dato)}
          >
            Editar
          </Button>
        </td>
        <td>
          <Button
            color="success"
            onClick={() => props.this.mostrarModalAsignacionA(dato)}
          >
            Asignar
          </Button>
        </td>
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

function Carrera(props) {
  return (
    <FormGroup>
      <div className="boxer"></div>
      <label>Nombre Carrera:</label>
      <input
        className="form-control"
        name="nombre"
        type="text"
        onChange={props.this.handleChangeCC}
      />
      <div className="boxer" />
      <div className="boxer" />
      <label>Descripicion</label>
      <textarea
        class="form-control"
        name="descripcion"
        onChange={props.this.handleChangeCC}
      />
      <div className="box"></div>
      <Button color="primary" onClick={() => props.this.crearCarrera()}>
        Crear Carrera
      </Button>
    </FormGroup>
  );
}

function Curso(props) {
  return (
    <FormGroup>
      <div className="boxer"></div>
      <label>Nombre Curso:</label>
      <input
        className="form-control"
        name="nombre"
        type="text"
        onChange={props.this.handleChangeCC}
      />
      <div className="boxer" />
      <div className="boxer" />
      <label>Descripicion</label>
      <textarea
        class="form-control"
        name="descripcion"
        onChange={props.this.handleChangeCC}
      />
      <div className="box"></div>
      <Button color="primary" onClick={() => props.this.crearCurso()}>
        Crear Curso
      </Button>
    </FormGroup>
  );
}

function Curso_Carrera(props) {
  return (
    <FormGroup>
      <div className="boxer"></div>
      <label>Carrera</label>
      <p></p>
      <select
        onChange={props.this.handleChangeOPC}
        class="form-select"
        aria-label="Default select example"
      >
        <option value="0" selected>
          Seleccione Carrera
        </option>
        {props.this.state.listCarreras.map((dep) => (
          <option key={dep.idCarrera} value={dep.idCarrera}>
            {dep.Nombre_carrera}
          </option>
        ))}
      </select>
      <div className="boxer" />
      <div className="boxer" />
      <label>Curso</label>
      <select
        onChange={props.this.handleChangeOPCU}
        class="form-select"
        aria-label="Default select example"
      >
        <option value="0" selected>
          Seleccione Curso
        </option>
        {props.this.state.listCursos.map((dep) => (
          <option key={dep.idMateria} value={dep.idMateria}>
            {dep.Nombre}
          </option>
        ))}
      </select>
      <div className="box"></div>
      <Button
        color="primary"
        onClick={() => props.this.Asignar_Curso_Carrera()}
      >
        Asignar Curso a Carrera
      </Button>
    </FormGroup>
  );
}

export default admin;
