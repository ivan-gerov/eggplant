import InputLabelField from './UI/InputLabelField.jsx'

import { useState } from 'react'
import classes from './UserForm.module.css'

export default function UserForm ({ newUserHandler }) {
  const baseUserFormState = {
    name: '',
    date_of_birth: '',
    email: '',
    number_of_children: ''
  }
  const [userFormState, setUserFormState] = useState(baseUserFormState)
  const [error, setError] = useState('')

  return (
    <div className={classes.input}>
      {<div id={classes.error_field}>{error}</div> || ''}
      <form onSubmit={addUserHandler}>
        <InputLabelField
          label='Name'
          type='text'
          onChange={handleChange}
          value={userFormState.name}
          name='name'
        />
        <InputLabelField
          label='Date of Birth'
          type='date'
          onChange={handleChange}
          value={userFormState.date_of_birth}
          name='date_of_birth'
        />
        <InputLabelField
          label='Email'
          type='email'
          onChange={handleChange}
          value={userFormState.email}
          name='email'
          required
        />
        <InputLabelField
          label='Number of Children'
          type='number'
          min='0'
          onChange={handleChange}
          value={userFormState.number_of_children}
          name='number_of_children'
          required
        />
        <button type='submit' className='no-select'>
          Add User
        </button>
      </form>
    </div>
  )

  function handleChange (event) {
    event.preventDefault()
    setError('')
    setUserFormState({
      ...userFormState,
      [event.target.name]: event.target.value
    })
  }

  function addUserHandler (event) {
    event.preventDefault()
    const today = new Date()
    const parsedDOB = new Date(userFormState.date_of_birth)
    if (parsedDOB > today) {
      setError(
        `"${parsedDOB.toLocaleDateString()}" is an invalid date of birth!`
      )
      return
    }

    const namePattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/
    if (!namePattern.test(userFormState.name)) {
      setError(`"${userFormState.name}" is an invalid name!`)
      return
    }

    fetch(`http://localhost:5000/api/v1/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userFormState)
    })
      .then(response => response.json())
      .catch(error => console.log(error))

    newUserHandler()
    setUserFormState(baseUserFormState)
  }
}
