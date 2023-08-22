import React, { useCallback, useState } from 'react'
import { DataGrid, SelectBox } from 'devextreme-react'
import { Column, Editing, FilterRow, HeaderFilter, Paging, RequiredRule, Search } from 'devextreme-react/data-grid'
import { servicios, contratos, clientes } from '../data/data'

const Contratos = () => {

  const [selectedServicio, setSelectedServicio] = useState()
  const [selectedCliente, setSelectedCliente] = useState()

  const handleServicioChange = useCallback((e) => {
    setSelectedServicio(e.selectedItem)
  }, [])

  const handleClienteChange = useCallback((e) => {
    setSelectedCliente(e.selectedItem)
  }, [])

  const servicioEditRender = useCallback((cell) => {
    return <SelectBox 
      dataSource={servicios}
      valueExpr='IdServicio'
      displayExpr='Nombre'
      
      onSelectionChanged={handleServicioChange}
    />
  }, [])

  const clienteEditRender = useCallback((cell) => {
    return <SelectBox 
      dataSource={clientes}
      valueExpr='IdCliente'
      displayExpr='DNI'
      onSelectionChanged={handleClienteChange}
    />
  }, [])

  const onRowInserting = useCallback((e) => {
    e.data = {
      Cliente: selectedCliente,
      Servicio: selectedServicio
    }

    if(selectedCliente === null || selectedServicio === null) {
      e.cancel = true
      return;
    }

    setSelectedCliente(null)
    setSelectedServicio(null)
  }, [selectedCliente, selectedServicio])

  return (
    <>
      <DataGrid 
        dataSource={contratos}
        showBorders={true}
        onRowInserting={onRowInserting}
      >
        <Editing 
          mode='form'
          allowAdding={true}
          allowDeleting={true}
        />
        <HeaderFilter visible={true} search={false}/>
        <Paging pageSize={10}/>
        <FilterRow visible={true}/>
        <Column dataField='IdContrato' caption='Id' width={50} allowEditing={false}/>
        <Column dataField='Servicio.Nombre' caption='Servicio' editCellComponent={servicioEditRender}>
          <RequiredRule />
        </Column>
        <Column dataField='Cliente.DNI' caption='Cliente' alignment='left' editCellComponent={clienteEditRender}>
          <RequiredRule />
        </Column>
      </DataGrid>
    </>
  )
}

export default Contratos