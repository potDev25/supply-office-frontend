import { createContext, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';

const StateContext = createContext({
    user: null,
    user_token: null,
    departments: null,
    notification: null,
    alertNot: null,
    notification_error: null,
    calendarYear: null,
    returnStatus: null,
    categories: null,
    supplier: null,
    supplies: null,
    setSupplies: () => {},
    setSupplier: () => {},
    setCategories: () => {},
    setCalendarYear: () => {},
    setReturnStatus: () => {},
    setDepartments: () => {},
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
    const [departments, _setDepartments] = useState([])          
    const [returnStatus, _setReturnStatus] = useState([])          
    const [supplier, _setSupplier] = useState([])          
    const [categories, _setCategories] = useState([])          
    const [supplies, _setSupplies] = useState([])          
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

    const setDepartments = (departments) => {
        _setDepartments((prev) => {
            return departments.map((item) => ({
                ...prev, label: item.department_name, value: item.id
            }))
        })
    }

    const setSupplies = (departments) => {
        _setSupplies((prev) => {
            return departments.map((item) => ({
                ...prev, label: item.supply_name, value: item.id
            }))
        })
    }

    const setSupplier = (departments) => {
        _setSupplier((prev) => {
            return departments.map((item) => ({
                ...prev, label: item.supplier_name, value: item.id
            }))
        })
    }

    const setCategories = (data) => {
        _setCategories((prev) => {
            return data.map((item) => ({
                ...prev, label: item.name, value: item.id
            }))
        })
    }

    const setReturnStatus = (data) => {
        _setReturnStatus((prev) => {
            return data.map((item) => ({
                ...prev, label: item.return_status, value: item.return_status
            }))
        })
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
            returnStatus,
            categories,
            setCategories,
            setReturnStatus,
            setAlertNot,
            notification_error,
            setNotification,
            setNotificationError,
            setUser,
            setUserToken,
            calendarYear,
            setCalendarYear,
            setDepartments,
            departments,
            supplier,
            setSupplier,
            supplies,
            setSupplies
         }}>

            {children}

        </StateContext.Provider>
    ) 

}

export const useStateContext = () => useContext(StateContext)