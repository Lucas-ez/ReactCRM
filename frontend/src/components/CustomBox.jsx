import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Paper, Typography } from "@mui/material";

const CustomBox = ({name}) => {

  const colors = useMemo(() => ({
    Servicios : '#e78683',
    Clientes : '#97da97',
    Contratos : '#839bda'
  }), [])

  console.log(colors[name]);

  const styles = useMemo(() => ({
    padding: '2rem',
    backgroundColor: colors[name],
  }), [])
  
  return (
    <Link to={`/${name}`}>
      <Paper sx={styles}>
        <Typography fontSize={18} fontWeight={500} color='white'>
          Ver {name}
        </Typography>
      </Paper>
    </Link>
  )
}

export default CustomBox