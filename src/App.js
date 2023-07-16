
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './context';
import AppRoute from './routes/appRoute';


function App() {
  return (
    <>
     <ContextProvider>
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App;
