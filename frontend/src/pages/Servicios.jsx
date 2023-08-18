import { DataGrid } from 'devextreme-react'
import ODataStore from 'devextreme/data/odata/store'
import { apiUrl } from './../config.json'
import { Column, Editing } from 'devextreme-react/data-grid'

const Servicios = () => {
  return (
    <>
      Servicios
      <DataGrid dataSource={dataSource}>
        <Editing 
          allowAdding={true}
          allowUpdating={true}
          allowDeleting={true}
        />
        <Column dataField='IdServicio' caption='Id' width={50} allowEditing={false}/>
        <Column dataField='Nombre'/>
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