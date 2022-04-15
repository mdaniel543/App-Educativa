import Button from '@mui/material/Button';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Barra(props){
    return <Toolbar sx={{ flexWrap: 'wrap' }}>
    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
       App Educativa
    </Typography>
    <Button onClick={() => props.this.cerrarSesion()} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
      Cerrar Sesion
    </Button>
  </Toolbar>
}

export default Barra;