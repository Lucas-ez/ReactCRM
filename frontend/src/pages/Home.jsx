import React, { useEffect, useState } from 'react'
import { apiUrl } from './../config.json'
import { PieChart } from 'devextreme-react'
import { Connector, Font, Label, Series, Size } from 'devextreme-react/pie-chart'
import httpService from '../services/httpService'
import { Container } from '@mui/material'

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

const Home = () => {

  const [info, setInfo] = useState();

  useEffect(() => {
    getInfo().then(res => setInfo(res))
  }, [])

  return (
    <Container>
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
    </Container>
  )
}


export default Home