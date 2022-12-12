import { useContext } from 'react';
import Context from './UserContext'

const LoggedOut = () => {
    const { user, logout } = useContext(Context)
    return (
        <div className='flex justify-center'>
        <div>
            <div>
            Welcome {user} !
            </div>
            <div className='ml-3'>
                <button className="py-3 mt-3 px-6 border border-transparent shadow text-base font-medium rounded-md text-white bg-blue-600 hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => { logout() }}>Logout</button>
            </div>
            </div>
        </div>
    )
}

export default LoggedOut;
