import { DataGrid } from 'devextreme-react';
import ODataStore from 'devextreme/data/odata/store';
import { apiUrl } from './../config.json'
import { Column, Editing, EmailRule, RequiredRule, Paging, FormItem } from 'devextreme-react/data-grid';

const Clientes = () => {
  return (
    <>
      Clientes
      <DataGrid 
        dataSource={dataSource}
        showBorders={true}
      >
        <Editing 
          mode='form'
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
          confirmDelete={true}
          
        />
        <Paging pageSize={10}/>
        <Column dataField='IdCliente' caption='Id' width={50} allowEditing={false}/>
        <Column dataField='DNI' dataType='number'>
          <RequiredRule />
        </Column>
        <Column dataField='Nombre'>
          <RequiredRule />
        </Column>
        <Column dataField='Telefono'>
          <RequiredRule />
        </Column>
        <Column dataField='Mail'>
          <RequiredRule />
          <EmailRule />
        </Column>
        <Column dataField='Direccion'>
          <RequiredRule />
        </Column>
        <Column dataField='Observaciones'>
          <FormItem colSpan={2} editorType='dxTextArea'/>
        </Column>
      </DataGrid>
    </>
  )
}

const dataSource = {
  store: new ODataStore({
    url: `${apiUrl}/odata/clientes`,
    key: 'IdCliente',
    keyType: {
      IdContrato: 'Int32'
    },
    version: 4
  }),
}

export default Clientes