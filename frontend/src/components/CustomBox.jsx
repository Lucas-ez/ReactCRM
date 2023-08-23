import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const CustomBox = ({name}) => {

  const styles = useMemo(() => ({
    padding: '1.6rem',
  }), [])
  
  return (
    <Link to={`/${name}`}>
      <Button variant="outlined" sx={styles}>
        <Typography>
          Ver {name}
        </Typography>
      </Button>
    </Link>
  )
}

export default CustomBox