import { useEffect, useState } from 'react'
import { Route, BrowserRouter, Routes, RouterProvider, createBrowserRouter, redirect, Navigate } from 'react-router-dom'
import { Container } from '@mui/material'
import Roles from './componants/Roles'
import UserSignUp from './auth.tsx/UserSignUp'
import LayOut from './routes/LayOut'
import Users from './componants/Users'
import SignIn from './auth.tsx/SignIn'
import Home from './home/Home'
import FeatureSpecificPermissions from './componants/FeatureSpecificPermissions'
import RoleInfo from './componants/RoleInfo'
import Permission from './componants/Permission'
import FeatureLayOut from './routes/FeatureLayOut'



function App() {
  const [featuresNPermission, setFeaturesNPermission] = useState([])

  let rolePermissions = extractPermmissinsForAfeature('Roles')
  let userPermissions = extractPermmissinsForAfeature('Users')
  let todosPermissions = extractPermmissinsForAfeature('Todos')
  let NotesPermissions = extractPermmissinsForAfeature('Notes')

  function extractPermmissinsForAfeature(feature) {
    return featuresNPermission.find((f) => f?.feature == feature)
  }

  function mapCrudRooutes(TodosRNotes) {
    return ['add', 'list', 'read', 'edit', 'delete'].map((path) => {
      return {
        path: `${path}`,
        element: <Permission permissionDetail={path} isPermission={TodosRNotes === 'Todos' ? todosPermissions : NotesPermissions} TodosRNotes={TodosRNotes} />
      }

    })
  }

  function mapTodosNNotesRoutes() {

    return ['Todos', 'Notes'].map((path) => {
      return {
        path: path,
        element: <FeatureLayOut />,
        children: [{
          index: true,
          element: <FeatureSpecificPermissions permissions={path == 'Notes' ? NotesPermissions : todosPermissions} />
        },
        ...mapCrudRooutes(path)

        ]
      }

    })
  }

  

    let router = createBrowserRouter(
      [
        { path: '/', element: <SignIn /> },
        {
          path: 'admin',
          element: <LayOut setFeaturesNPermission={setFeaturesNPermission} features={featuresNPermission} />,
          children: [
            { path: 'userSignUp', element: <UserSignUp /> },
            { path: 'roles',  element:rolePermissions &&  <Roles rolePermissions={rolePermissions} /> },
            { path: 'roleInfoTable', element:rolePermissions && <RoleInfo rolePermissions={rolePermissions} /> },
            { path: 'roleInfoTable/:roleId', element:rolePermissions && <RoleInfo rolePermissions={rolePermissions} /> },
            { path: 'users', element:userPermissions && <Users userPermissions={userPermissions} /> },
            { path: 'user/:subUserId', element:userPermissions && <UserSignUp userPermissions={userPermissions} /> },
             ...mapTodosNNotesRoutes()
          ]
        },
      ]
    )

    return (
      <Container>
        <RouterProvider router={router} />
      </Container>

    )
  }

  export default App




