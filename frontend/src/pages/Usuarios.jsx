import { DataGrid } from 'devextreme-react';
import ODataStore from 'devextreme/data/odata/store';
import { apiUrl } from './../config.json'

const Usuarios = () => {
  return (
    <>
      Usuarios
      <DataGrid dataSource={dataSource}>

      </DataGrid>
    </>
  )
}

const dataSource = {
  store: new ODataStore({
    url: `${apiUrl}/odata/usuarios`,
    key: 'Username',
    keyType: {
      IdContrato: 'String'
    },
    version: 4
  }),
  // select: [
  //   'IdContrato',
  // ]
}

export default Usuarios