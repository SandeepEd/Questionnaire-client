import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '../containers/ErrorBoundary';
import { AuthProvider } from './AuthContext';
import { NotificationsProvider } from './NotificationsProvider';
import { QuizProvider } from './QuizProviders';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry(failureCount: number, error: any) {
        if (error.status === 404) { return false; }
        else if (failureCount < 2) { return true; }
        return false;
      },
      staleTime: 1000 * 60 * 60,
      useErrorBoundary: true,
    },
  },
});

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <BrowserRouter>
          <NotificationsProvider>
            <AuthProvider>
              <QuizProvider>
                {children}
              </QuizProvider>
            </AuthProvider>
          </NotificationsProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default AppProviders;
