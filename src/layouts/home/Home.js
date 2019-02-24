import React, { Component } from 'react'
import PizzaBox from './PizzaBox.jsx';
import {pizzas} from './dummyData';

class Home extends Component {
  render() {

    const pizzaCells = pizzas.map((pizza, index) => {
      return (
      <PizzaBox
        key={index}
        image={pizza.image}
        name={pizza.name}
        description={pizza.description}
      />)
    });

    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Welcome to Casa Nostra Pizzas</h1>
            <p>Please place your order:</p>
            {pizzaCells}
          </div>
        </div>
      </main>
    )
  }
}

export default Home
