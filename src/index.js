import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Titlebar from "./Titlebar";
import Footbar from "./Footbar";

import Listitems from "./Listitems";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: "",
        key: ""
      }
    };
    this.handelInput = this.handelInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }
  handelInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now()
      }
    });
  }
  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      if (!this.state.items) { // evaluates to true if currentVideo is null
        const newitems = [newItem];

      this.setState(
        {
          items: newitems,
          currentItem: {
            text: "",
            key: ""
          }
        },
        () => {
          window.localStorage.setItem(
            "savedList",
            JSON.stringify(this.state.items)
          );
        }
      );
      }
      else{
      const newitems = [...this.state.items, newItem];

      this.setState(
        {
          items: newitems,
          currentItem: {
            text: "",
            key: ""
          }
        },
        () => {
          window.localStorage.setItem(
            "savedList",
            JSON.stringify(this.state.items)
          );
        }
      );
      }
    }
  }
  deleteItem(key) {
    const filteredItems = this.state.items.filter(item => item.key !== key);
    this.setState(
      {
        items: filteredItems
      },
      () => {
        window.localStorage.setItem(
          "savedList",
          JSON.stringify(this.state.items)
        );
      }
    );
  }
  setUpdate(value, key) {
    const itemS = this.state.items;
    itemS.map(item => {
      if (item.key === key) {
        item.text = value;
      }
    });
    this.setState(
      {
        items: itemS
      },
      () => {
        window.localStorage.setItem(
          "savedList",
          JSON.stringify(this.state.items)
        );
      }
    );
  }
  componentDidMount() {
    const list = window.localStorage.getItem("savedList");
    const parsedList = JSON.parse(list);

    this.setState({
      items: parsedList
    });
  }
  render() {
    return (
      <div className="App">
        <Titlebar/>
        <header>
          <form id="todoform" onSubmit={this.addItem}>
            <input
              type="text"
              value={this.state.currentItem.text}
              onChange={this.handelInput}
              placeholder="Enter Text"
            />
            <button type="submit">Add</button>
          </form>
        </header>
        <br />
        <Listitems
          items={this.state.items}
          deleteItem={this.deleteItem}
          setUpdate={this.setUpdate}
        />
        <Footbar/>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
