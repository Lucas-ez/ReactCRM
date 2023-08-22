import React from 'react'
import { DataGrid } from 'devextreme-react'
import { Column, Editing, Paging } from 'devextreme-react/data-grid'
import ODataStore from 'devextreme/data/odata/store'
import { apiUrl } from './../config.json'

const Contratos = () => {
  return (
    <>
      Contratos
      <DataGrid 
        dataSource={dataSource}
        showBorders={true}
      >
        <Column dataField='IdContrato' caption='Id' width={50}/>
        <Column dataField='Cliente.DNI' caption='DNI'/>
        <Column dataField='Cliente.Nombre' caption='Cliente'/>
        <Column dataField='Servicio.Nombre' caption='Servicio'/>
      </DataGrid>
    </>
  )
}

const dataSource = {
  store: new ODataStore({
    url: `${apiUrl}/odata/contratos`,
    key: 'IdContrato',
    keyType: {
      IdContrato: 'Int32'
    },
    version: 4
  }),
  expand: ['Cliente', 'Servicio'],
  select: [
    'IdContrato',
  ]
}

export default Contratos