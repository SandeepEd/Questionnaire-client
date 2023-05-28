import { createContext, CSSProperties, useContext, useEffect, useState } from 'react';

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

  const removeNotification = (index: number) => {
    setNotifications((notifications) => notifications.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(([ , ...restOfTheNotifications ]) => [ ...restOfTheNotifications ]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [ notifications ]);

  return <>
    <NotificationContext.Provider value={{ createNotification, clearNotifications }}>
      {notifications.map((notification, i) =>
        <div key={i} className={`fixed flex flex-row items-center justify-between 
        m-4 ${notification.type === `error` ? `bg-red-500 
        text-white` : `bg-green-300`}  px-3 py-2 rounded`} style={{
          top: `${i * 50}px`,
          right: `0`,
        } as CSSProperties}
        >
          <div className="pr-4">
            {notification.message}
          </div>
          <button onClick={() => removeNotification(i)}>
            X
          </button>
        </div>)
      }
      {children}
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
