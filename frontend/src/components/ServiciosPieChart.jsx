import { apiUrl } from './../config.json'
import PieChart, { Series, Label, Font, Connector, Size, Legend } from 'devextreme-react/pie-chart'
import httpService from "../services/httpService"
import { useState, useEffect } from 'react'

const getServicios = async () => {
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

const ServiciosPieChart = () => {

  const [servicios, setServicios] = useState();

  useEffect(() => {
    getServicios().then(res => setServicios(res))
  }, [])

  return (
    <PieChart
      dataSource={servicios}
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
      <Legend
        orientation="horizontal"
        itemTextPosition="right"
        horizontalAlignment="center"
        verticalAlignment="top"
      />
    </PieChart>
  )
}

export default ServiciosPieChart