import { CheckBox, DataGrid } from 'devextreme-react';
import ODataStore from 'devextreme/data/odata/store';
import { apiUrl } from './../config.json'
import { useAuth } from './../contexts/auth'
import { Column, Editing, FormItem, RequiredRule } from 'devextreme-react/data-grid';

const Usuarios = () => {

  const { user } = useAuth()

  if(user.role !== 'Admin') return <span>Unauthorized</span>

  return (
    <>
      <DataGrid 
        dataSource={dataSource}
        showBorders={true}
      >
      <Editing 
        mode='form'
        allowAdding={true}
        allowDeleting={true}
        // allowUpdating={true}
      />
      <Column dataField='Username'>
        <RequiredRule />
      </Column>
      <Column dataField='Nombre'>
        <RequiredRule />
      </Column>
      <Column dataField='Password' >
        <RequiredRule />
      </Column>
      <Column dataField='IsAdminRol' dataType='boolean' caption='Admin' />
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