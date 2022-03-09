import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSort,
  faSortAsc,
  faSortDesc
} from '@fortawesome/free-solid-svg-icons'

import styles from './SortingColumnHeader.module.css'

export default function SortingColumnHeader (props) {
  function onClick (event) {
    event.preventDefault()
    if (props.headerState == 'asc') {
      props.headerStateHandler(props.name, 'desc')
    } else {
      props.headerStateHandler(props.name, 'asc')
    }
  }

  return (
    <>
      <th onClick={onClick} name={props.name} className='no-select'>
        {props.label}

        {!props.headerState ? (
          <FontAwesomeIcon className={styles.icon} icon={faSort} />
        ) : null}
        {props.headerState == 'asc' ? (
          <FontAwesomeIcon className={styles.icon} icon={faSortAsc} />
        ) : null}
        {props.headerState == 'desc' ? (
          <FontAwesomeIcon className={styles.icon} icon={faSortDesc} />
        ) : null}
      </th>
    </>
  )
}
