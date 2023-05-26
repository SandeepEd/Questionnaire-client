import { createContext, useContext, useEffect, useState } from 'react';

interface NotificationProps {
  title?: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface NotificationContextProps {
  createNotification: (notification: NotificationProps) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextProps | null>(null);

export const NotificationsProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [ notifications, setNotifications ] = useState<NotificationProps[]>([]);

  const createNotification = (notification: NotificationProps) => {
    setNotifications([ ...notifications, notification ]);
  };

  const clearNotifications = () => {
    setNotifications(() => []);
  };

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(([ , ...restOfTheNotifications ]) => [ ...restOfTheNotifications ]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [ notifications ]);

  //   console.log(`notifications :::`, notifications);

  return <>
    <NotificationContext.Provider value={{ createNotification, clearNotifications }}>
      {children}
      {notifications.map((notification, i) =>
        <div key={i} className={`fixed flex flex-row items-center justify-between 
                    top-0 left-0 m-4 ${notification.type === `error` ? `bg-red-500 
                    text-white` : `bg-green-300`}  px-3 py-2 rounded`}>
          <div className="pr-4">
            {notification.message}
          </div>
          {/* <button onClick={ }>
                        X
                    </button> */}
        </div>)
      }
    </NotificationContext.Provider>
  </>;
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === null) {
    throw new Error(`useNotification must be used within a NotificationProvider`);
  }
  return context;
};
