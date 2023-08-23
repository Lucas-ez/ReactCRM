import { Container, Stack } from '@mui/material'
import CustomBox from '../components/CustomBox'
import ServiciosPieChart from '../components/ServiciosPieChart'
import InfoBarChart from '../components/InfoBarChart'

const Home = () => {

  return (
    <>
      <Stack 
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        alignItems='center'
        gap={2}
      >
        <Stack display='flex' flexDirection='row' paddingTop={6} gap={8}>
          <ServiciosPieChart />
          <InfoBarChart />
        </Stack>
        <Stack 
          display='flex'
          flexDirection='row'
          gap={12}
          paddingTop={6}
          paddingBottom={2}
        >
          <CustomBox name='Servicios'/>
          <CustomBox name='Clientes'/>
          <CustomBox name='Contratos'/>
        </Stack>
      </Stack>
    </>
  )
}


export default Home