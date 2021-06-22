import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { BrowserRouter, Route } from "react-router-dom";

import { AuthContextProvider } from './contexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        {/* O exact serve pra indicar que o endereço deve ser exatamente o indicado em path. Caso cntrário, ele pode acessar um endereço que inicie com aquele caractere*/}
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;