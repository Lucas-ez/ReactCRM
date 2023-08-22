import { DataGrid } from 'devextreme-react';
import ODataStore from 'devextreme/data/odata/store';
import { apiUrl } from './../config.json'
import { useAuth } from './../contexts/auth'

const Usuarios = () => {

  const { user } = useAuth()

  if(user.role !== 'Admin') {
    return (
      <span>
        Unauthorized
      </span>
    )
  }

  return (
    <>
      Usuarios
      <DataGrid 
        dataSource={dataSource}
        showBorders={true}
      >

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