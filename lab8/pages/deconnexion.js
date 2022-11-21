import React from 'react'
import LoggedOut from "../components/LoggedOut.js"

const deconnexion = () => {
    return (
        <div className="b py-16 px-4 sm:px-6 w-screen flex justify-center items-center">
            <div className="mx-auto w-full max-w-2xl rounded-xl bg-white p-8 shadow">
                <LoggedOut />
            </div>
        </div>
    )
}

export default deconnexion