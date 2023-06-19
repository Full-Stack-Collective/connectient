import styles from '../styles.module.css'
import test from '@styles/test.module.css'

export default function Admin() {
  return (
    <main className={styles.main}>
      <h1 className={test.text}>Welcome to the Admin page!</h1>
      <p>Please enter your username and password to be granted access.</p>
      <form method="post">
        <div>
          <label htmlFor="adminUsername">Username: </label>
          <input
            type="text"
            id="adminUsername"
            name="adminUsername"
            placeholder="Enter username"
          />
        </div>
        <div>
          <label htmlFor="adminPassword">Password: </label>
          <input
            type="password"
            id="adminPassword"
            name="adminPassword"
            placeholder="Enter password"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}
