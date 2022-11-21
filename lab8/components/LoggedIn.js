import { useContext } from 'react';
import Context from './UserContext'

const LoggedIn = (props) => {
    const { login } = useContext(Context)
    const user = props.username
    return (
        <div>
            <button onClick={() => { login(user) }}
                type="submit"
                className="py-3 px-6 border border-transparent shadow text-base font-medium transition-all duration-300 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Login</button>
        </div>
    )
}
export default LoggedIn;
