import './App.css';
import Game from './components/Game/Game.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Wordle</h1>
      </header>
      <body className="Body-text">
        <Game size="5"/>
      </body>
    </div>
  );
}

export default App;
