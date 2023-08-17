import { LoadPanel } from "devextreme-react"
import UnauthenticatedContent from "./UnauthenticatedContent"
import { useAuth } from "./contexts/auth"
import Content from "./Content"


function App() {
  const { user, loading } = useAuth()

  if(loading) {
    return <LoadPanel visible={true}/>
  }

  if(user) {
    return <Content />
  }

  return <UnauthenticatedContent />
}


export default App
