import { useState, useEffect } from 'react'

import UserForm from '../components/UserForm'
import UsersTable from '../components/UsersTable'

export default function Users () {
  const [baseUsersState, setBaseUsersState] = useState('')
  const [users, setUsers] = useState([...baseUsersState])
  const [isLoading, setLoading] = useState(false)
  const [newUser, setNewUser] = useState(false)

  useEffect(async () => {
    setLoading(true)
    let data = await fetch(`http://localhost:5000/api/v1/user`).then(data =>
      data.json()
    )
    setLoading(false)
    setUsers(data)
    setBaseUsersState(data)
    setNewUser(false)
  }, [newUser])

  function newUserHandler (user) {
    setNewUser(true)
  }

  return (
    <>
      <UserForm newUserHandler={newUserHandler} />
      <UsersTable
        users={users}
        setUsers={setUsers}
        isLoading={isLoading}
        baseUsersState={baseUsersState}
      />
    </>
  )
}
