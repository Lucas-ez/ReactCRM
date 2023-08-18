import { DataGrid } from 'devextreme-react'
import ODataStore from 'devextreme/data/odata/store'
import { apiUrl } from './../config.json'

const Servicios = () => {
  return (
    <>
      Servicios
      <DataGrid dataSource={dataSource}>

      </DataGrid>
    </>
  )
}

const dataSource = {
  store: new ODataStore({
    url: `${apiUrl}/odata/servicios`,
    key: 'IdServicio',
    keyType: {
      IdContrato: 'Int32'
    },
    version: 4
  })
}

export default Servicios