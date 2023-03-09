import { createContext, useReducer, useContext  } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "PUT":
            return action.payload
        case "CLEAR":
            return null
        default:
            return null
    }
}

const NotificationContext = createContext()
export const useNotificationValue = () => {
    const NotificationAndDispatch = useContext(NotificationContext)
    return NotificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const NotificationAndDispatch = useContext(NotificationContext)
    return NotificationAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext