import './App.css';
import ArchivedNotes from './Pages/ArchivedNotes';
import MyNotes from './Pages/MyNotes';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<MyNotes />} />
        <Route path="archived" >
          <Route index element={<ArchivedNotes />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
