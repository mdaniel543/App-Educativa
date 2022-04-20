import React, { Component, useState } from "react";
import axios from "axios";
import Barra from "../components/menu_bar";

import Dropdown from "react-dropdown";

import "../styles/titles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-dropdown/style.css";

import { CsvToHtmlTable } from "react-csv-to-table";

import ReactFileReader from "react-file-reader";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Swal from "sweetalert2";

import { useParams } from "react-router";
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
      carrera_curso: {
        nombre: "",
        descripcion: "",
      },
      rutacsv: "",
      value: "",
      options: ["Maestro", "Alumno"],
      option: "",
      carreras: [],
      optcarrera: "",
      cursos: [],
      optcurso: "",
      maestros: [],
      optmaestro: "",
      alumnos: [],
      optalumno: "",
      load2: false,
      load: "",
      pagina: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDT = this.handleChangeDT.bind(this);
    this.handleChangeMA = this.handleChangeMA.bind(this);
    this.handleChangeCC = this.handleChangeCC.bind(this);
    this.cargarFoto = this.cargarFoto.bind(this);
    this.handleChangeP = this.handleChangeP.bind(this);
    //this.fetchTest();
    Swal.fire("Mi id", this.props.id, "info");
    //this.fetchTasks();
    //this.fetchTasks2();
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
    fetch("/app/select_maestro") //consulta todos los maestros en el servidor
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ tasks: data, load: false });
      });
  }
  fetchTasks2() {
    var page = this.state.pagina
    fetch("/app/selectEstudiantes", {
      //eliminar maestro
      method: "POST",
      body: JSON.stringify({
          page: page
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
  SigPag() {
    var page = this.state.pagina
    page++;
    console.log(page)
    

    fetch("/app/selectEstudiantes", {
      //eliminar maestro
      method: "POST",
      body: JSON.stringify({
          page: page
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
        this.setState({pagina: page});
      });
  }
  AntPag() {
    var page = this.state.pagina
    page--;
    console.log(page)
    fetch("/app/selectEstudiantes", {
      //eliminar maestro
      method: "POST",
      body: JSON.stringify({
          page: page
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
        this.setState({pagina: page});
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
  mostrarModalActualizarM(dato) {
    this.setState({
      data: dato,
      modalEditarM: true,
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
    this.setState({ load2: true });
    console.log(this.state.data);
    fetch("/delete_maestro", {
      //eliminar maestro
      method: "DELETE",
      body: JSON.stringify({
        dpi: dato.dpi, //envio solo dpi
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire(
          "Mensaje !",
          data.msg, //recibo mensaje
          "info"
        );
        this.fetchTasks();
        this.setState({ load2: false });
      })
      .catch((err) => console.error(err));
  }

  eliminarA(dato) {
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
        Swal.fire(
          "Mensaje !",
          data.msg, //recibo mensaje
          "info"
        );
        this.fetchTasks2();
        this.setState({ load2: false });
      })
      .catch((err) => console.error(err));
  }

  editarM(dato, fecha) {
    let fecha_cambio = `${fecha.getFullYear()}-${
      fecha.getMonth() + 1
    }-${fecha.getDate()}`;
    this.setState({ load2: true });
    console.log(this.state.data);
    fetch("/update_maestro", {
      // metodo put a editar el maestro
      method: "PUT",
      body: JSON.stringify({
        nombre: dato.nombre,
        apellido: dato.apellido,
        numero: dato.numero,
        telefono: dato.telefono,
        direccion: dato.direccion,
        foto: dato.rutaphoto,
        correo: dato.correo,
        fecha: fecha_cambio,
        dpi: dato.dpi,
        pass: dato.pass,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire(
          "Mensaje !",
          data.msg, // solo un mensaje
          "info"
        );
        this.fetchTasks();
        this.setState({ load2: false });
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
        Pass: dato.Pass,
        estado: dato.Estado,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire(
          "Mensaje !",
          data.msg, // solo un mensaje
          "info"
        );
        this.fetchTasks2();
        this.setState({ load2: false });
      })
      .catch((err) => console.error(err));
    this.cerrarModalActualizarA();
  }

  insertarM(fecha) {
    let fecha_cambio = `${fecha.getFullYear()}-${
      fecha.getMonth() + 1
    }-${fecha.getDate()}`;
    this.setState({ load2: true });
    console.log(this.state.data);
    console.log(fecha_cambio);
    fetch("/insert_maestro", {
      ///insertar maestro
      method: "POST",
      body: JSON.stringify({
        Nombre: this.state.data.nombre,
        Apellido: this.state.data.apellido,
        Numero: this.state.data.numero,
        Telefono: this.state.data.telefono,
        Direccion: this.state.data.direccion,
        Correo: this.state.data.correo,
        Foto: this.state.data.rutaphoto,
        Fecha: fecha_cambio,
        Dpi: this.state.data.dpi,
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
        this.fetchTasks();
        this.setState({ load2: false });
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
        //this.fetchTasks2();
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
        user: "Mestro",
        ruta: this.state.rutacsv,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Mensaje!", data.msg, "info");
        this.fetchTasks1();
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
    fetch("/Select_Carrera") //consulta todos los alumnos en el servidor
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ carreras: data });
      });
  }

  fetchCursos() {
    fetch("/Select_Cursos") //consulta todos los alumnos en el servidor
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ cursos: data });
      });
  }

  fetchMaestros() {
    fetch("/Select_Maestros") //consulta todos los alumnos en el servidor
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ maestros: data });
      });
  }

  fetchAlumno() {
    fetch("/Select_Alumnos") //consulta todos los alumnos en el servidor
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ alumnos: data });
      });
  }

  crearCarrera() {
    fetch("/insert_carrera", {
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
      })
      .catch((err) => console.error(err));
  }

  crearCurso() {
    fetch("/insert_curso", {
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
      })
      .catch((err) => console.error(err));
  }

  Asignar_Curso_Carrera() {
    fetch("/asignacion_curso_carrera", {
      method: "POST",
      body: JSON.stringify({
        carrera: this.state.optcarrera,
        curso: this.state.optcurso,
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

  Asignar_maestro_curso() {
    fetch("/asignacion_curso_carrera", {
      method: "POST",
      body: JSON.stringify({
        maestro: this.state.optmaestro,
        curso: this.state.optcurso,
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

  Asignar_alumno_carrera() {
    fetch("/asignacion_alumno_carrera", {
      method: "POST",
      body: JSON.stringify({
        alumno: this.state.optalumno,
        carrera: this.state.optcarrera,
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
              <Tab>Asignar curso a maestro</Tab>
              <Tab>Asignar carrera a alumno</Tab>
              <Tab></Tab>
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
            <TabPanel>
              <Curso_Maestro this={this} />
            </TabPanel>
            <TabPanel>
              <Carrera_Alumno this={this} />
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
              <th>Nombre</th>
              <th>Apellido</th>
              <th>No. Registro</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Correo</th>
              <th>Fecha Nacimiento</th>
              <th>DPI</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          {props.this.state.tasks.map((dato) =>
            (() => {
              if (dato.Estado === "1") {
                return <IfyesM dato={dato} this={props.this} />;
              } else {
                return <ElseM dato={dato} this={props.this} />;
              }
            })()
          )}
        </Table>
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
              value={props.this.state.data_maestro.Correo}
            />
          </FormGroup>
          <FormGroup>
            <label>Fecha Nacimiento:</label>
            <DatePicker
              className="form-control"
              name="Path_foto"
              dateFormat="dd/MM/yyyy"
              isClearable
              placeholderText="Selecciona Fecha"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              value={props.this.state.data_maestro.Path_foto}
              fixedHeight
              //withPortal
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
    </div>
  );
}

function IfyesM(props) {
  var dato = props.dato;
  return (
    <tbody>
      <tr key={dato.registro}>
        <td>{dato.Nombre}</td>
        <td>{dato.Apellido}</td>
        <td>{dato.Registro}</td>
        <td>{dato.Telefono}</td>
        <td>{dato.Direccion}</td>
        <td>{dato.Correo}</td>
        <td>{dato.Fecha}</td>
        <td>{dato.dpi}</td>
        <td>{dato.rutaphoto}</td>
        <td>{dato.pass}</td>
        <td>
          <Button
            color="primary"
            onClick={() => props.this.mostrarModalActualizarM(dato)}
          >
            Editar
          </Button>
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
      <tr key={dato.registro}>
        <td>{dato.nombre}</td>
        <td>{dato.apellido}</td>
        <td>{dato.registro}</td>
        <td>{dato.telefono}</td>
        <td>{dato.direccion}</td>
        <td>{dato.correo}</td>
        <td>{dato.fecha}</td>
        <td>{dato.dpi}</td>
        <td>{dato.rutaphoto}</td>
        <td>{dato.pass}</td>
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
              <th>Carne</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Correo</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          {props.this.state.tasks2.map((dato) =>
            (() => {
              if (dato.Estado == "1") {
                return <IfyesA dato={dato} this={props.this} />;
              } else {
                return <ElseA dato={dato} this={props.this} />;
              }
            })()
          )}
        </Table>
        <center><b>{props.this.state.pagina}</b></center>
        <Button
          color="secondary"
          onClick={() => props.this.AntPag()}
        >
          Anterior Pagina
        </Button>
        
        <Button
          style={{ float: "right" }}
          color="secondary"
          onClick={() => props.this.SigPag()}
        >
          Siguiente Pagina
        </Button>
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
        onChange={props.this.handleChange}
      />
      <div className="boxer" />
      <div className="boxer" />
      <label>Descripicion</label>
      <textarea
        class="form-control"
        name="descripcion"
        onChange={props.this.handleChange}
      />
      <div className="box"></div>
      <Button color="primary" onClick={() => props.this.crearCarrera}>
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
        onChange={props.this.handleChange}
      />
      <div className="boxer" />
      <div className="boxer" />
      <label>Descripicion</label>
      <textarea
        class="form-control"
        name="descripcion"
        onChange={props.this.handleChange}
      />
      <div className="box"></div>
      <Button color="primary" onClick={() => props.this.crearCurso}>
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
      <Dropdown
        name="carrera"
        options={props.this.state.carreras}
        value={props.this.state.optcarrera}
        placeholder="Seleccione la carrera"
      />
      <div className="boxer" />
      <div className="boxer" />
      <label>Curso</label>
      <Dropdown
        name="curso"
        options={props.this.state.cursos}
        value={props.this.state.optcurso}
        placeholder="Seleccione el curso"
      />
      <div className="box"></div>
      <Button color="primary" onClick={() => props.this.Asignar_Curso_Carrera}>
        Asignar Curso a Carrera
      </Button>
    </FormGroup>
  );
}

function Curso_Maestro(props) {
  return (
    <FormGroup>
      <div className="boxer"></div>
      <label>Curso:</label>
      <Dropdown
        name="curso"
        options={props.this.state.cursos}
        value={props.this.state.optcurso}
        placeholder="Seleccione el curso"
      />
      <div className="boxer" />
      <div className="boxer" />
      <label>Maestro</label>
      <Dropdown
        name="curso"
        options={props.this.state.maestros}
        value={props.this.state.optmaestro}
        placeholder="Seleccione el registro del maestro"
      />
      <div className="box"></div>
      <Button color="primary" onClick={() => props.this.Asignar_maestro_curso}>
        Asignar maestro a curso
      </Button>
    </FormGroup>
  );
}

function Carrera_Alumno(props) {
  return (
    <FormGroup>
      <div className="boxer"></div>
      <label>Nombre Carrera:</label>
      <Dropdown
        name="carrera"
        options={props.this.state.carreras}
        value={props.this.state.optcarrera}
        placeholder="Seleccione la carrera"
      />
      <div className="boxer" />
      <div className="boxer" />
      <label>Alumno</label>
      <Dropdown
        name="carrera"
        options={props.this.state.alumnos}
        value={props.this.state.optalumno}
        placeholder="Seleccione carnet del alumno"
      />
      <div className="box"></div>
      <Button color="primary" onClick={() => props.this.Asignar_alumno_carrera}>
        Asignar Alumno a Carrera
      </Button>
    </FormGroup>
  );
}

export default admin;
