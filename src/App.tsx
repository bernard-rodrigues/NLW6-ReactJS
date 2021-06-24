import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from './contexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        {/* Essa tag faz co que, se uma rota foi satisfeita, ele pare de procurar por outras rotas */}
        <Switch>
          {/* O exact serve pra indicar que o endereço deve ser exatamente o indicado em path. Caso cntrário, ele pode acessar um endereço que inicie com aquele caractere*/}
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          {/* Quando o react acessar uma rota que seja /rooms/~qualquer coisa~ ele vai retornar o componente room e também vai passar um parâmetro id, que é tudo que vem depois da barra */}
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;