import { DataGrid } from 'devextreme-react';
import ODataStore from 'devextreme/data/odata/store';
import { apiUrl } from './../config.json'

const Clientes = () => {
  return (
    <>
      Clientes
      <DataGrid dataSource={dataSource}>

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
  // select: [
  //   'IdContrato',
  // ]
}

export default Clientes