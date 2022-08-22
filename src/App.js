import { BrowserRouter as Router, Route } from "react-router-dom";
import YaziListesi from "./components/YaziListesi";
import YaziDetayi from "./components/YaziDetayi";
import YaziEkle from "./components/YaziEkle";
import YaziDuzenle from "./components/YaziDuzenle";
import YorumDuzenle from "./components/YorumDuzenle";

function App() {
  return (
    <Router>
      <div className="App">
        <header></header>
        <div className="ui raised very padded text container segment">
          <Route path="/" exact component={YaziListesi}></Route>
          <Route path="/posts/:id" exact component={YaziDetayi}></Route>
          <Route path="/yaziekle"  exact component={YaziEkle}></Route>
          <Route path="/posts/:id/edit" exact component={YaziDuzenle}></Route>
          <Route path="/posts/:id/comments/:id/edit" exact component={YorumDuzenle}></Route>
          
        </div>
      </div>
    </Router>
  );
}

export default App;
