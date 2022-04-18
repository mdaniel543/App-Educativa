import React, { Component, useState } from "react";

import Barra from "../components/menu_bar";

import Dropdown from 'react-dropdown';

import '../styles/titles.css'
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-dropdown/style.css';

import { CsvToHtmlTable } from 'react-csv-to-table';

import ReactFileReader from 'react-file-reader';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Swal from 'sweetalert2';


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter
} from "reactstrap";


class admin extends Component{
    constructor(){
        super();
        this.state = {
            modalInsertarM: false,
            modalInsertarA: false,
            modalEditarM: false,
            modalEditarA: false,
            tasks: [],
            tasks2: [],
            data: {
                user: '',
                numero: '',
                telefono: '',
                direccion: '',
                correo: '',
                fecha: '',
                dpi: '',
                pass: '',
                carnet: '',
            },
            value: '',
            options: ['Maestro', 'Alumno'],
            option: '', 
            load2: false,
            load: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.fetchTest();
        //this.fetchTasks();
        //this.fetchTasks2();
    }
    fetchTest(){
        fetch('http://localhost:8000/test',{method:'GET'})
        .then(res => {
            console.log(res)
        })
        .catch(err => console.error(err));

    }
    fetchTasks() {
        fetch('/Select_Maestro') //consulta todos los maestros en el servidor
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({ tasks: data, load: false});
        });
    }
    fetchTasks2() {
        fetch('/Select_Alumno') //consulta todos los alumnos en el servidor
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({ tasks: data, load: false});
        });
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            data: {
                ...this.state.data,
                [name]: value
            },
        });
    }

    handleFiles = files => {
        var reader = new FileReader();
        reader.onload =  (e) => {
          // Use reader.result
          this.setState({
            value: reader.result
          })
        }
        reader.readAsText(files[0]);
    }

    cerrarSesion = () => {
        window.location.href = './';
    }

    mostrarModalInsertar() {
        this.setState({ modalInsertarM: true })
    }
    cerrarModalInsertarM() {
        this.setState({ modalInsertarM: false })
    }
    
    mostrarModalInsertarA() {
        this.setState({ modalInsertarA: true })
    }
    cerrarModalInsertarA() {
        this.setState({ modalInsertarA: false })
    }
    mostrarModalActualizarM(dato) {
        this.setState({
            data: dato,
            modalEditarM: true
        })
    }
    mostrarModalActualizarA(dato) {
        this.setState({
            data: dato,
            modalEditarA: true
        })
    }
    cerrarModalActualizarA() {
        this.setState({ modalEditarA: false })
    }
    cerrarModalActualizarM() {
        this.setState({ modalEditarM: false })
    }

    eliminarM(dato) {
        this.setState({ load2: true })
        console.log(this.state.data)
        fetch('/delete_alumno', { //eliminar maestro
            method: 'DELETE',
            body: JSON.stringify({
                dpi: dato.dpi, //envio solo dpi
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            Swal.fire(
                'Mensaje !',
                data.msg, //recibo mensaje 
                'info'
            )
            this.fetchTasks();
            this.setState({ load2: false })
        })
        .catch(err => console.error(err));
    }

    eliminarA(dato) {
        this.setState({ load2: true })
        console.log(this.state.data)
        fetch('/delete_alumno', { //eliminar alumno
            method: 'DELETE',
            body: JSON.stringify({
                carnet: dato.carnet, //envio solo carnet
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            Swal.fire(
                'Mensaje !',
                data.msg, //recibo mensaje 
                'info'
            )
            this.fetchTasks2();
            this.setState({ load2: false })
        })
        .catch(err => console.error(err));
    }

    editarM(dato, fecha) {
        let fecha_cambio = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`
        this.setState({ load2: true })
        console.log(this.state.data)
        fetch('/update_maestro', { // metodo put a editar el maestro
            method: 'PUT',
            body: JSON.stringify({
                user: dato.user,
                numero: dato.numero,
                telefono: dato.telefono,
                direccion: dato.direccion,
                correo: dato.correo,
                fecha: fecha_cambio,
                dpi: dato.dpi,
                pass: dato.pass,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire(
                    'Mensaje !',
                    data.msg, // solo un mensaje 
                    'info'
                )
                this.fetchTasks();
                this.setState({ load2: false })
            })
            .catch(err => console.error(err));
        this.cerrarModalActualizarM();
    }

    editarA(dato) {
        this.setState({ load2: true })
        console.log(this.state.data)
        fetch('/update_alumno', { // metodo put a editar el alumno
            method: 'PUT',
            body: JSON.stringify({
                user: dato.user,
                carnet: dato.numero,
                telefono: dato.telefono,
                direccion: dato.direccion,
                correo: dato.correo,
                pass: dato.pass,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire(
                    'Mensaje !',
                    data.msg, // solo un mensaje 
                    'info'
                )
                this.fetchTasks2();
                this.setState({ load2: false })
            })
            .catch(err => console.error(err));
        this.cerrarModalActualizarA();
    }

    insertarM(fecha) {
        let fecha_cambio = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`
        this.setState({ load2: true })
        console.log(this.state.data)
        console.log(fecha_cambio)
        fetch('/insert_maestro', { ///insertar maestro
            method: 'POST',
            body: JSON.stringify({
                user: this.state.data.user,
                numero: this.state.data.numero,
                telefono: this.state.data.telefono,
                direccion: this.state.data.direccion,
                correo: this.state.data.correo,
                fecha: fecha_cambio,
                dpi: this.state.data.dpi,
                pass: this.state.data.pass,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire(
                    'Mensaje!',
                    data.msg,
                    'info'
                )
                this.fetchTasks();
                this.setState({ load2: false })
            })
            .catch(err => console.error(err));
        this.cerrarModalInsertarM()
    }

    insertarA() {
        this.setState({ load2: true })
        console.log(this.state.data)
        fetch('/insert_alumno', { ///insertar alumno
            method: 'POST',
            body: JSON.stringify({
                user: this.state.data.user,
                carnet: this.state.data.carnet,
                telefono: this.state.data.telefono,
                direccion: this.state.data.direccion,
                correo: this.state.data.correo,
                pass: this.state.data.pass,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire(
                    'Mensaje!',
                    data.msg,
                    'info'
                )
                this.fetchTasks2();
                this.setState({ load2: false })
            })
            .catch(err => console.error(err));
        this.cerrarModalInsertarA()
    }

    Carga(){
        this.setState({ load2: true })
        fetch('/carga', { ///insertar alumno
            method: 'POST',
            body: JSON.stringify({
                data: this.state.value, /// te envio todo en esta rama del json, si encuentro otra manera voy a buscar 
                user: this.state.option
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire(
                    'Mensaje!',
                    data.msg,
                    'info'
                )
                this.fetchTasks1();
                this.fetchTasks2();
                this.setState({ load2: false })
            })
            .catch(err => console.error(err));
    }



    render(){
        return <div>
            <Load this = {this}/>
            <Barra this= {this}/>
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
                        <Tab>Crear Carrera</Tab>
                        <Tab>Crear Curso</Tab>
                        <Tab>Asignar Cursos</Tab>
                        <Tab>Asignar Maestros</Tab>
                        <Tab></Tab>
                    </TabList>
                    <TabPanel>
                        <Carga this={this}/>
                    </TabPanel>
                    <TabPanel>
                        <Maestro this={this}/>
                    </TabPanel>
                    <TabPanel>
                        <Alumno this={this}/>
                    </TabPanel>
                </Tabs>
            </Container>
        </div>
    }
}

function Load(props) {
    return (
        <Modal isOpen={props.this.state.load2} fade={false}>
            <div class="load">
                <hr /><hr /><hr /><hr />
            </div>
        </Modal>
    );
}

function Carga(props){
    return(
        <Container>
            <div className="boxer"></div>
            <ReactFileReader 
                multipleFiles={false}
                fileTypes={[".csv"]} 
                handleFiles={props.this.handleFiles}>
                <button className='btn'>Subir Archivo</button>
            </ReactFileReader>
            <div className="boxer"></div>
            <div className="boxer"></div>
            <CsvToHtmlTable
                data = {props.this.state.value}
                csvDelimiter=","
                tableClassName="table table-striped table-hover"
                //hasHeader = {false}
            />  
            <div className="boxer"></div>
            <FormGroup>
                <Dropdown name="Dep"
                    options={props.this.state.options}
                    value={props.this.state.option}
                    placeholder="Seleccione usuarios a cargar" />
            </FormGroup>
            <Button
                fullWidth
                color="primary"
                onClick={() => props.this.Carga()}
            >
                Cargar
            </Button>
        </Container>
    );

}


function Maestro(props){
    var [startDate, setStartDate] = useState(null);
    return(
        <div>
            <Container>
                <br />
                <Button color="primary" onClick={() => props.this.mostrarModalInsertar()}>Crear Maestro</Button>
                <br />
                <br />
                <Table>
                    <thead>
                        <tr>
                            <th>Nombre y Apellido</th>
                            <th>No. Registro</th>
                            <th>Telefono</th>
                            <th>Direccion</th>
                            <th>Correo</th>
                            <th>Fecha Nacimiento</th>
                            <th>DPI</th>
                            <th>Fotografia</th>
                            <th>Contraseña</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    {props.this.state.tasks.map((dato) => (
                        (() => {
                            if (dato.estado === '1') {
                                return <IfyesM dato={dato} this={props.this} />
                            } else {
                                return <ElseM dato={dato} this={props.this} />
                            }
                        })()
                    ))}
                </Table>
            </Container>

            <Modal isOpen={props.this.state.modalInsertarM} fade={false}>
            <ModalHeader>
                <div><h3>Crear Maestro</h3></div>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <label>
                        Nombre y Apellido:
                    </label>
                    <input
                        className="form-control"
                        name="user"
                        type="text"
                        onChange={props.this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Numero registro:
                    </label>
                    <input
                        className="form-control"
                        name="numero"
                        type="number"
                        onChange={props.this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Telefono:
                    </label>
                    <input
                        className="form-control"
                        name="telefono"
                        type="text"
                        onChange={props.this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Direccion:
                    </label>
                    <input
                        className="form-control"
                        name="direccion"
                        type="text"
                        onChange={props.this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Correo:
                    </label>
                    <input
                        className="form-control"
                        name="correo"
                        type="email"
                        onChange={props.this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Fecha Nacimiento:
                    </label>
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
                    <label>
                        DPI:
                    </label>
                    <input
                        className="form-control"
                        name="dpi"
                        type="number"
                        onChange={props.this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Fotografia
                    </label>
                    <p></p>
                    <input type="file"
                        multiple={false}
                        accept=".xml"
                        onChange={props.this.cargarFoto}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Contraseña
                    </label>
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
                <div><h3>Editar Maestro</h3></div>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <label>
                        Nombre y Apellido:
                    </label>
                    <input
                        className="form-control"
                        name="user"
                        type="text"
                        onChange={props.this.handleChange}
                        value={props.this.state.data.user}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Numero registro:
                    </label>
                    <input
                        className="form-control"
                        name="numero"
                        type="number"
                        onChange={props.this.handleChange}
                        value={props.this.state.data.numero}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Telefono:
                    </label>
                    <input
                        className="form-control"
                        name="telefono"
                        type="text"
                        onChange={props.this.handleChange}
                        value={props.this.state.data.telefono}

                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Direccion:
                    </label>
                    <input
                        className="form-control"
                        name="direccion"
                        type="text"
                        onChange={props.this.handleChange}
                        value={props.this.state.data.direccion}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Correo:
                    </label>
                    <input
                        className="form-control"
                        name="correo"
                        type="email"
                        onChange={props.this.handleChange}
                        value={props.this.state.data.correo}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Fecha Nacimiento:
                    </label>
                    <DatePicker
                        className="form-control"
                        name="fecha"
                        dateFormat="dd/MM/yyyy"
                        isClearable
                        placeholderText="Selecciona Fecha"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        value={props.this.state.data.fecha}
                        fixedHeight
                    //withPortal
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        DPI:
                    </label>
                    <input
                        className="form-control"
                        name="dpi"
                        type="text"
                        onChange={props.this.handleChange}
                        value={props.this.state.data.dpi}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Fotografia
                    </label>
                    <p></p>
                    <input type="file"
                        multiple={false}
                        accept=".xml"
                        onChange={props.this.cargarFoto}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Contraseña
                    </label>
                    <input
                        className="form-control"
                        name="pass"
                        type="password"
                        onChange={props.this.handleChange}
                        value={props.this.state.data.pass}
                    />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => props.this.editarM(props.this.state.data, startDate)}
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
            <tr key={dato.registro} >
                <td>{dato.nombre_apellido}</td>
                <td>{dato.registro}</td>
                <td>{dato.telefono}</td>
                <td>{dato.direccion}</td>
                <td>{dato.correo}</td>
                <td>{dato.fecha}</td>
                <td>{dato.dpi}</td>
                <td>{dato.foto}</td>
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
            <tr key={dato.registro} >
                <td>{dato.nombre_apellido}</td>
                <td>{dato.registro}</td>
                <td>{dato.telefono}</td>
                <td>{dato.direccion}</td>
                <td>{dato.correo}</td>
                <td>{dato.fecha}</td>
                <td>{dato.dpi}</td>
                <td>{dato.foto}</td>
                <td>{dato.pass}</td>
                <td>
                </td>
            </tr>
        </tbody>
    );
}

function Alumno(props){
    return(
        <div>
            <Container>
                <br />
                <Button color="primary" onClick={() => props.this.mostrarModalInsertarA()}>Crear Alumno</Button>
                <br />
                <br />
                <Table>
                    <thead>
                        <tr>
                            <th>Nombre y Apellido</th>
                            <th>Carne</th>
                            <th>Telefono</th>
                            <th>Direccion</th>
                            <th>Correo</th>
                            <th>Contraseña</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    {props.this.state.tasks2.map((dato) => (
                        (() => {
                            if (dato.estado === '1') {
                                return <IfyesA dato={dato} this={props.this} />
                            } else {
                                return <ElseA dato={dato} this={props.this} />
                            }
                        })()
                    ))}
                </Table>
            </Container>

            <Modal isOpen={props.this.state.modalInsertarA} fade={false}>
            <ModalHeader>
                <div><h3>Crear Alumno</h3></div>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <label>
                        Nombre y Apellido:
                    </label>
                    <input
                        className="form-control"
                        name="user"
                        type="text"
                        onChange={props.this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Carnet:
                    </label>
                    <input
                        className="form-control"
                        name="carnet"
                        type="number"
                        onChange={props.this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Telefono:
                    </label>
                    <input
                        className="form-control"
                        name="telefono"
                        type="text"
                        onChange={props.this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Direccion:
                    </label>
                    <input
                        className="form-control"
                        name="direccion"
                        type="text"
                        onChange={props.this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Correo:
                    </label>
                    <input
                        className="form-control"
                        name="correo"
                        type="email"
                        onChange={props.this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Contraseña
                    </label>
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
                    onClick={() => props.this.insertarA()}
                >
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
                <div><h3>Editar Alumno</h3></div>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <label>
                        Nombre y Apellido:
                    </label>
                    <input
                        className="form-control"
                        name="user"
                        type="text"
                        onChange={props.this.handleChange}
                        value={props.this.state.data.user}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Carnet:
                    </label>
                    <input
                        className="form-control"
                        name="carnet"
                        type="number"
                        onChange={props.this.handleChange}
                        value={props.this.state.data.carnet}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Telefono:
                    </label>
                    <input
                        className="form-control"
                        name="telefono"
                        type="text"
                        onChange={props.this.handleChange}
                        value={props.this.state.data.telefono}

                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Direccion:
                    </label>
                    <input
                        className="form-control"
                        name="direccion"
                        type="text"
                        onChange={props.this.handleChange}
                        value={props.this.state.data.direccion}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Correo:
                    </label>
                    <input
                        className="form-control"
                        name="correo"
                        type="email"
                        onChange={props.this.handleChange}
                        value={props.this.state.data.correo}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Contraseña
                    </label>
                    <input
                        className="form-control"
                        name="pass"
                        type="password"
                        onChange={props.this.handleChange}
                        value={props.this.state.data.pass}
                    />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => props.this.editarA(props.this.state.data)}
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
            <tr key={dato.carnet} >
                <td>{dato.nombre_apellido}</td>
                <td>{dato.carnet}</td>
                <td>{dato.telefono}</td>
                <td>{dato.direccion}</td>
                <td>{dato.correo}</td>
                <td>{dato.pass}</td>
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
            <tr key={dato.carnet} >
                <td>{dato.nombre_apellido}</td>
                <td>{dato.carnet}</td>
                <td>{dato.telefono}</td>
                <td>{dato.direccion}</td>
                <td>{dato.correo}</td>
                <td>{dato.pass}</td>
                <td>
                </td>
            </tr>
        </tbody>
    );
}



export default admin;