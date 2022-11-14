import { useContext } from 'react';
import Context from './UserContext'


export default () => {
  const { user } = useContext(Context)
  return (
    <div>
      {user ? <LoggedIn /> : <LoggedOut />}
    </div>
  )
}