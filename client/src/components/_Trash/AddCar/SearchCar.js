import React, { Component } from "react";
import List from "./List";

class SearchCar extends Component {
  state = {
    initialItems: [
      "Apples",
      "Broccoli",
      "Chicken",
      "Duck",
      "Eggs",
      "Fish",
      "Granola",
      "Hash Browns"
    ],
    items: []
  };

  filterList = (event) => {
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item) {
      return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    this.setState({ items: updatedList });
  }
  
  render() {
    console.log(this.state);
    return (
      <div className="filter-list">
        <form>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search"
              onChange={this.filterList}
            />
          </fieldset>
        </form>
        <List items={this.state.items} />
      </div>
    );
  }
}

export default SearchCar;
