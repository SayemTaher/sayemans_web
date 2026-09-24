import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import { preloadRoute } from './routes/routes';
import './styles/index.css';

const container = document.getElementById('root');
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Prerendered pages are hydrated; in dev (empty root) we render from scratch.
if (container.firstElementChild) {
  await preloadRoute(location.pathname);
  hydrateRoot(container, app);
}
else createRoot(container).render(app);
