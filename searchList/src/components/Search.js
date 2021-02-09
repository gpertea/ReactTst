import React, { Component } from "react";
import List from './List'

class Search extends Component {
  
  constructor(props) {
    super(props);
    this.getFilteredList = this.getFilteredList.bind(this);
    this.handleListSel = this.handleListSel.bind(this);
    this.state = { places: [], srch: "" };
  }

  handleListSel(item) {
    this.setState({srch: item});
  }

  getFilteredList(s) {
    let items = this.state.places.map( item => item.region+' - '+item.name );
    if (s.length===0) 
        return [];
    let flt = items.filter((c) => {
             const regex = RegExp("\\b"+s,"i");
             return regex.exec(c) !== null;
        });
    return flt;
  }
 
  changeFilter = (event) => {
    let input=event.target.value;
    this.setState({srch: input});    
  }

  /* DO NOT MODIFY */
  componentDidMount() {
    const allPlaces = [];
    const endpoint = 'data.json';
    //endpoint could be remote, http returning a JSON object
    fetch(endpoint)
      .then(data => data.json())
      .then(results => {
        allPlaces.push(...results)
        this.setState({ places: allPlaces })
      })
      .catch(error => console.log(error));
  }

  render() {
    const flt=this.getFilteredList(this.state.srch);

    return (
      <div>
        <input type="text" size="54" placeholder="Search" value={this.state.srch} onChange={this.changeFilter}/>
        <List fltItems={flt} selectCall={this.handleListSel} />
       </div> 
    )
  }


}

export default Search
