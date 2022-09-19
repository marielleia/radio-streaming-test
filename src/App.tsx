import { ChangeEvent, useState } from 'react';
import './App.css';
import List from './components/List';
import Search from './components/Search';
import axios from 'axios';

function App() {
  const [search, setSearch]=useState('');
  const [list, setList] = useState([]);
  const [init, setInit] = useState(true);

  const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setSearch(e.target.value);
  }
  const handleClick = ()=>{
    const url = "http://95.179.139.106/json/stations/search?name=" + search;

    axios.get(url)
      .then(result => {
        setList(result.data);
        setInit(false);
      })
      .catch(console.error);

  }
  return (
    <div className="App">
      <header>
        <h1>RADIO FACTORIA</h1>
      </header>
      <Search value = {search}
      handleClick={handleClick}
        handleChange={handleChange}/>
      {/* <section>
        <input type="text" placeholder="Escribe el nombre de la radio" />
        <button >Buscar</button>
      </section> */}
      <List init={init} list={list}/>
    </div>
  );
}

export default App;