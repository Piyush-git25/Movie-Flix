import './App.css';
import Header from './Components/Header/header'
import BottomNav from './Components/MainNav'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Movies from './Pages/Movies/movies'
import Search from './Pages/Search/search'
import Trending from './Pages/Trending/trending'
import Series from './Pages/Series/series'
import { Container } from '@material-ui/core';
function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <div className="app">
          <Container>
            <Switch>
              <Route path='/' component={Trending} exact></Route>
              <Route path='/movies' component={Movies}></Route>
              <Route path='/series' component={Series}></Route>
              <Route path='/search' component={Search}></Route>
            </Switch>
            {/* <h1>hello</h1> */}
          </Container>
        </div>
          <BottomNav />
      </BrowserRouter>
    </>
  );
}

export default App;
