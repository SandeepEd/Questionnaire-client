import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'containers/ErrorBoundary';
import { AuthProvider } from './AuthContext';
import { NotificationsProvider } from './NotificationsProvider';

const queryClient = new QueryClient();

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <BrowserRouter>
          <NotificationsProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </NotificationsProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default AppProviders;
