import React, { useEffect, useMemo, useState } from 'react'
import { apiUrl } from './../config.json'
import { Box, PieChart } from 'devextreme-react'
import { Connector, Font, Label, Series, Size } from 'devextreme-react/pie-chart'
import httpService from '../services/httpService'
import { Container, Paper, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const getInfo = async () => {
  // Obtengo servicios
  const res = await httpService.get(`${apiUrl}/odata/servicios`)
  const servicios = res.data.value

  // Por cada servicio obtengo la cantidad de contratos con ese servicio
  const contratos = await Promise.all( 
    servicios.map( async servicio => {
      const res = await httpService
        .get(`${apiUrl}/odata/contratos?%24select=IdContrato&%24expand=Servicio&%24filter=Servicio%2FNombre%20eq%20%27${servicio.Nombre}%27&%24count=true`)
      
      const qty = res.data['@odata.count']
      return {
        "Nombre" : servicio.Nombre,
        "Cantidad" : qty
      };
    })
  )

  return contratos
}

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

const Home = () => {

  const [info, setInfo] = useState();

  useEffect(() => {
    getInfo().then(res => setInfo(res))
  }, [])

  return (
    <Container>
      <Stack 
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        alignItems='center'
      >
        <Stack 
          display='flex'
          flexDirection='row'
          gap={12}
          paddingTop={2}
          paddingBottom={6}
        >
          <CustomBox name='Servicios'/>
          <CustomBox name='Clientes'/>
          <CustomBox name='Contratos'/>
        </Stack>
        <PieChart
          dataSource={info}
          palette="Soft Blue"
          title='Cantidad de contratos por servicio'
          >
          <Series
            argumentField='Nombre'
            valueField='Cantidad'
            >
            <Label visible={true}>
              <Font size={12}/>
              <Connector visible={true} width={1}/>
            </Label>
          </Series>
          <Size width={800}/>
        </PieChart>
      </Stack>
    </Container>
  )
}


export default Home