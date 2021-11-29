import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';
import KMeans from "./d3-vis/kmeans";

function App() {
  //d3.select(this.refs.myDiv).style("background-color", "blue");

  return (
    <div>
      <KMeans />
    </div>
  );
}

export default App;
