import React, {PureComponent} from "react";
import bindMethodsToObject from "../shared/helpers/bind-methods"

class Search extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };

    bindMethodsToObject(this, "_handleChange", "_handleEnterKey")
  }

  _handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  _handleEnterKey(event) {
    if(event.keyCode === 13) { // 13 = enter
      this.props.onSearch(this.state)
    }
  }


  render() {
    return (
      <React.Fragment>
        <label htmlFor="search" className="mr-2">Search for</label>
        <input type="text" id="search" value={this.state.value} onChange={this._handleChange} onKeyUp={this._handleEnterKey} />
      </React.Fragment>
    );
  }
}

export default Search;