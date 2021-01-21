import React, { Component } from "react";
class List extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
      }
    
      handleSelect(e) {
        this.props.selectCall(e.target.innerHTML);
      }
    
    render() {
        return (
             <div>
             <ul class="searchList" onClick={this.handleSelect}>
              {
                  this.props.fltItems.map(function(item) {
                      return <li key={item}>{item}</li>
                  })
              }
              </ul>
              </div>
        );
      }
    
}

export default List