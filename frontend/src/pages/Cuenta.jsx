import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { apiUrl } from './../config.json'
import { useAuth } from './../contexts/auth'
import { Form } from 'devextreme-react'
import { Button, Stack, Typography } from '@mui/material'
import httpService from '../services/httpService'
import { SimpleItem } from 'devextreme-react/form'

const Cuenta = () => {
  const { user } = useAuth()
  const [cuenta, setCuenta] = useState()
  const [showPassword, setShowPassword] = useState(false)

  if(!user) return <span>Error</span>
  
  const showPasswordEditorOptions = useMemo(() => ({
    text: 'Mostrar/Ocultar contraseña',
    value: showPassword,
    onValueChanged: () => setShowPassword(!showPassword)
  }), [showPassword])

  
  const passwordEditorOptions = useMemo(() =>( {
    mode: !showPassword && 'password'
  }), [showPassword])

  useEffect(() => {
    httpService.get(`${apiUrl}/odata/usuarios?filter=Username%20eq%20'${user.username}'`)
      .then(res => setCuenta(res.data.value[0]))
  }, [])

  const onSave = useCallback( async (e) => {
    e.preventDefault()

    try {
      if(cuenta.Nombre === '' || cuenta.Password === '') throw new Error("Campos requeridos")

      await httpService.patch(`${apiUrl}/odata/usuarios('${cuenta.Username}')`, cuenta)
      alert("Guardado")
    } catch(err) {
      alert(err)
    }

  }, [cuenta])
  
  return (
    <Stack alignItems={'center'}>
      <Typography variant='h4' paddingBottom={4}>
        Mi Cuenta
      </Typography>
      <form onSubmit={onSave}>
        <Stack display='flex' gap={6} width={600}>
          <Form formData={cuenta}>
            <SimpleItem dataField='Username' editorOptions={usernameEditorOptions}/>
            <SimpleItem dataField='Nombre' />
            <SimpleItem dataField='Password' editorOptions={passwordEditorOptions} />
            <SimpleItem editorType='dxCheckBox' editorOptions={showPasswordEditorOptions}/>
            <SimpleItem dataField='IsAdminRol' editorType='dxCheckBox' editorOptions={isAdminEditorOptions}/>
          </Form>
          <Button variant='contained' type='submit'>Guardar</Button>
        </Stack>
      </form>
    </Stack>
  )
}

const usernameEditorOptions = {
  disabled: true
}

const isAdminEditorOptions = {
  disabled: true
}

export default Cuenta