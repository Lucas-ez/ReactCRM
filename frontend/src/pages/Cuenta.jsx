import React, { useEffect } from 'react'
import { useAuth } from './../contexts/auth'

const Cuenta = () => {
  const { user } = useAuth()

  useEffect(() => {
    console.log(user);
  }, [])

  if(!user) return <span>Error</span>

  return (
    <div>Cuenta</div>
  )
}

export default Cuenta