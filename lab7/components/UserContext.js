import {createContext, useState} from 'react'

const Context = createContext()

export default Context

export const ContextProvider = ({
  children
}) => {
  const [user, setUser] = useState('invité')
  return (
    <Context.Provider
      value={{
        user: user,
        login: (user) => {
          setUser(user)
        },
        logout: () => {
          setUser('invité')
        }
      }}
    >
      {children}
    </Context.Provider>
  )
}

