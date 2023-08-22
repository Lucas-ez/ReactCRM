import React, { useMemo } from 'react'
import { Divider } from '@mui/material'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useAuth } from '../contexts/auth'
import { Link } from 'react-router-dom'
import { PeopleAlt, Home, ManageAccounts, ElectricalServices, Article, Person } from '@mui/icons-material'

const NavLinks = () => {
  const { user } = useAuth()
  const links = useMemo(() => ([
    {
      text: 'Home',
      path: '/',
      icon: <Home />
    },
    {
      text: 'Servicios',
      path: '/servicios',
      icon: <ElectricalServices />
    },
    {
      text: 'Clientes',
      path: '/clientes',
      icon: <PeopleAlt />
    },
    {
      text: 'Contratos',
      path: '/contratos',
      icon: <Article />
    },
  ]), [])

  return (
    <>
      <Divider />
      <List>
        {links.map(link => (
          <Link to={link.path} key={link.text}>
            <ListItem key={link.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {link.icon}
                </ListItemIcon>
                <ListItemText primary={link.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <Link to={'/cuenta'}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Person /> 
            </ListItemIcon>
            <ListItemText primary='Mi Cuenta'/>
          </ListItemButton>
        </ListItem>
      </Link>
      <Divider />
      {
        user && user.role === 'Admin' && (
          <>
            <List>
              <Link to={'/usuarios'}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <ManageAccounts /> 
                    </ListItemIcon>
                    <ListItemText primary='Usuarios'/>
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
            <Divider />
          </>
        )
      }

    </>
  )
}

export default NavLinks