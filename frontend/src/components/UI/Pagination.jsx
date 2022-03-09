import styles from './Pagination.module.css'

export default function Pagination ({ usersPerPage, totalUsers, paginate }) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumbers.map(number => (
          <li
            key={number}
            className={styles['page-item'] + ' no-select'}
            onClick={() => {
              paginate(number)
            }}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  )
}
