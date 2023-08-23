import React from 'react'
import httpService from '../services/httpService';
import { useState, useEffect } from 'react'
import { apiUrl } from './../config.json'
import { Chart } from 'devextreme-react';
import { Legend, CommonSeriesSettings, SeriesTemplate, Label, Connector} from 'devextreme-react/chart';

const getInfo = async () => {
  const resServicios = httpService.get(`${apiUrl}/odata/servicios/$count`)
  const resClientes = httpService.get(`${apiUrl}/odata/clientes/$count`)
  const resContratos = httpService.get(`${apiUrl}/odata/contratos/$count`)

  const qtyServicios = (await resServicios).data
  const qtyClientes = (await resClientes).data
  const qtyContratos = (await resContratos).data

  return [
    {
      key: 'Servicios',
      qty: qtyServicios
    },
    {
      key: 'Clientes',
      qty: qtyClientes
    },
    {
      key: 'Contratos',
      qty: qtyContratos
    },
  ]
}

const InfoBarChart = () => {

  const [info, setInfo] = useState()

  useEffect(() => {
    getInfo().then(res => setInfo(res))
  }, [])

  console.log(info);

  return (
    <Chart 
      dataSource={info} 
      palette="Soft Blue"
      title={'Servicios, contratos y clientes registrados'}
    >
      <CommonSeriesSettings 
        argumentField='key'
        valueField='qty'
        type='bar'
        ignoreEmptyPoints='true'
      >
        <Label visible={true} position='inside' />
      </CommonSeriesSettings>
      <SeriesTemplate nameField='key' />
      <Legend verticalAlignment="top" horizontalAlignment="center" orientation='horizontal'/>
    </Chart>
  )
}

export default InfoBarChart