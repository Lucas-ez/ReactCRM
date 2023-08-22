import { DataGrid } from 'devextreme-react'
import { Column, Editing } from 'devextreme-react/data-grid'
import { servicios } from '../data/data'

const Servicios = () => {
  return (
    <>
      <DataGrid 
        dataSource={servicios}
        showBorders={true}
      >
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


export default Servicios