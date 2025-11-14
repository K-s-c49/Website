import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@/app/store';
import { Toaster } from 'sonner';

/**
 * Centralizes application providers so the root render tree stays tidy.
 * Easily extend with theme, i18n, or analytics providers without touching main.jsx.
 */

export function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        {children}
        <Toaster position="top-right" richColors closeButton />
      </BrowserRouter>
    </Provider>
  );
}

