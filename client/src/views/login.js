import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";

const theme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    fetchB(data);
  };

  const fetchB = (dato) => {
    fetch("/app/login", {
      method: "POST",
      body: JSON.stringify({
        nombre: dato.get("user"),
        pass: dato.get("password"),
        rol: dato.get("rol"),
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id === undefined) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Usuario y/o Contraseña incorrecta",
          });
          console.log(data)
          return;
        }
        console.log(data)
        console.log(dato.get("rol"))
        switch (dato.get("rol")) {
          case "A":
            window.location.href = `./admin/${data.id}`;
            break;
          case "E":
            window.location.href = `./student/${data.id}`;
            break;
          case "M":
            window.location.href = `./teacher/${data.id}`;
            break;
          default:
            break;
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="Usuario"
              name="user"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="rol"
              name="rol"
              label="Rol"
              autoFocus
              select
            >
              <MenuItem value="A">Admnistrador</MenuItem>
              <MenuItem value="M">Maestro</MenuItem>
              <MenuItem value="E">Usuario</MenuItem>
            </TextField>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
