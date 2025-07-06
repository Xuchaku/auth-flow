import { createRoot } from 'react-dom/client';
import './index.css';
import { StoreProvider } from '@app/providers/StoreProvider';
import App from './App';

createRoot(document.getElementById('root')!).render(
   <StoreProvider>
      <App />
   </StoreProvider>,
);
