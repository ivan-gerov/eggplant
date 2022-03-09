import { useState } from 'react'
import styles from './UsersTable.module.css'

import SortingColumnHeader from './UI/SortingColumnHeader'
import Pagination from './UI/Pagination'

export default function UsersTable ({
  users,
  setUsers,
  isLoading,
  baseUsersState
}) {
  const baseHeaderState = {
    name: '',
    date_of_birth: '',
    email: '',
    number_of_children: ''
  }
  const [headerState, setHeaderState] = useState(baseHeaderState)
  const [filterState, setFilterState] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage, setUsersPerPage] = useState(15)

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

  function paginate (pageNumber) {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      {isLoading ? (
        <h3> Loading...</h3>
      ) : (
        <div>
          <input
            className='no-select'
            id={styles.filter}
            type='text'
            onChange={filterUsers}
            value={filterState}
          />
          <table>
            <thead>
              <tr>
                <SortingColumnHeader
                  name='name'
                  label='Name'
                  headerState={headerState.name}
                  headerStateHandler={headerStateHandler}
                />
                <SortingColumnHeader
                  name='date_of_birth'
                  label='Date of Birth'
                  headerState={headerState.date_of_birth}
                  headerStateHandler={headerStateHandler}
                />
                <SortingColumnHeader
                  name='email'
                  label='Email'
                  headerState={headerState.email}
                  headerStateHandler={headerStateHandler}
                />
                <SortingColumnHeader
                  name='number_of_children'
                  label='Number of Children'
                  headerState={headerState.number_of_children}
                  headerStateHandler={headerStateHandler}
                />
              </tr>
            </thead>
            <tbody>
              {currentUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.date_of_birth}</td>
                  <td>{user.email}</td>
                  <td>{user.number_of_children}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            usersPerPage={usersPerPage}
            totalUsers={users.length}
            paginate={paginate}
          />
        </div>
      )}
    </>
  )

  function headerStateHandler (header, currentHeaderState) {
    const updatedHeaderState = {
      ...baseHeaderState,
      [header]: currentHeaderState
    }
    setHeaderState(updatedHeaderState)
    sortUsers(header, currentHeaderState)
  }

  function sortUsers (headerName, currHeaderState) {
    users.sort((a, b) => {
      if (currHeaderState == 'asc') {
        return a[headerName] > b[headerName] ? 1 : -1
      } else {
        return a[headerName] < b[headerName] ? 1 : -1
      }
    })
    if (!currHeaderState) {
      setUsers(baseUsersState)
    }
  }

  function filterUsers (event) {
    event.preventDefault()
    setFilterState(event.target.value)
    const filterValue = event.target.value
    if (filterValue) {
      setUsers(
        users.filter(user => {
          if (
            user['name'].includes(filterValue) ||
            user['email'].includes(filterValue)
          ) {
            return user
          }
        })
      )
    } else {
      setUsers(baseUsersState)
    }
  }
}
