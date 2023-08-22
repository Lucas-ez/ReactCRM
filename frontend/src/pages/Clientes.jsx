import { DataGrid } from 'devextreme-react';
import { Column, Editing, EmailRule, RequiredRule, Paging, FormItem, FilterRow } from 'devextreme-react/data-grid';
import { clientes } from '../data/data';

const Clientes = () => {
  return (
    <>
      <DataGrid 
        dataSource={clientes}
        showBorders={true}
      >
        <Editing 
          mode='form'
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
          confirmDelete={true}
          
        />
        <FilterRow visible={true} />
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


export default Clientes