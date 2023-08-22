import ODataStore from 'devextreme/data/odata/store'
import { apiUrl } from './../config.json'


const servicios = {
  store: new ODataStore({
    url: `${apiUrl}/odata/servicios`,
    key: 'IdServicio',
    keyType: {
      IdContrato: 'Int32'
    },
    version: 4
  }),
}

const clientes = {
  store: new ODataStore({
    url: `${apiUrl}/odata/clientes`,
    key: 'IdCliente',
    keyType: {
      IdContrato: 'Int32'
    },
    version: 4
  }),
}

const contratos = {
  store: new ODataStore({
    url: `${apiUrl}/odata/contratos`,
    key: 'IdContrato',
    keyType: {
      IdContrato: 'Int32'
    },
    version: 4
  }),
  expand: ['Cliente', 'Servicio'],
  select: [
    'IdContrato',
  ]
}

export { servicios, clientes, contratos }