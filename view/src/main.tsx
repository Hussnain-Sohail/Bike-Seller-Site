import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import AccessTokenProvider from './AccessTokenProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AccessTokenProvider>
      <App />
    </AccessTokenProvider>
  </BrowserRouter>
)
