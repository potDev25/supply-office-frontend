import { createContext, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';

const StateContext = createContext({
    user: null,
    user_token: null,
    notification: null,
    alertNot: null,
    notification_error: null,
    calendarYear: null,
    setCalendarYear: () => {},
    setPassengers: () => {},
    setNotification: () => {},
    setAlertNot: () => {},
    setNotificationError: () => {},
    setUser: () => {},
    setUserToken: () => {},
})

export const ContextProvider = ({children}) => {

    const [user, setUser] = useState({})
    const [calendarYear, setCalendarYear] = useState({})
    const [notification, _setNotification] = useState('')          
    const [alertNot, _setAlertNot] = useState('')
    const [notification_error, _setNotificationError] = useState('')
    const [user_token, _setUserToken] = useState(localStorage.getItem('USER_TOKEN'))

    const setUserToken = (user_token) => {
        _setUserToken(user_token)
        if(user_token){
            localStorage.setItem('USER_TOKEN', user_token)
        }else{
            localStorage.removeItem('USER_TOKEN')
        }
    }

    const setNotification = (notification) => {
        _setNotification(notification)
        setTimeout(() => {
            _setNotification('')
        }, 1500)
    }

    const setAlertNot = (notification) => {
        _setAlertNot(notification)
        setTimeout(() => {
            _setAlertNot('')
        }, 1500)
    }

    const setNotificationError = (notification) => {
        _setNotificationError(notification)
        setTimeout(() => {
            _setNotificationError('')
        }, 2000)
    }

    return (
        <StateContext.Provider value={{ 
            user,
            user_token,
            notification,
            alertNot,
            setAlertNot,
            notification_error,
            setNotification,
            setNotificationError,
            setUser,
            setUserToken,
            calendarYear,
            setCalendarYear
         }}>

            {children}

        </StateContext.Provider>
    ) 

}

export const useStateContext = () => useContext(StateContext)