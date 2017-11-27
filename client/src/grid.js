import update from 'immutability-helper';
import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import * as d3 from "d3";
import PricingPanel from './PricingPanel';
import Papa from 'papaparse';
import * as $ from 'jquery';
import NoZeroFormatter from './NoZeroFormatter';

//TODO: change requires to imports
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');
const { DraggableHeader: { DraggableContainer }} = require('react-data-grid-addons');

export default class Grid extends Component {
  constructor(props) {
    super(props); 
    
    const columnSetup = [
      { key: 'name', title: 'Name', name: 'NAME', visible: true, filterable: true, sortable: true, draggable: true, resizable: true, width: 70},
       {key: 'bloomberg', title: 'Bloomberg', name: 'BBG', visible: true, filterable: true, sortable: true, draggable: true, resizable: true, width: 90},
      {key: 'sedol', title: 'SEDOL', name: 'SEDOL', visible: true, filterable: true, sortable: true, draggable: true, resizable: true, width: 90},
      {key: 'isin', title: 'ISIN', name: 'ISIN', visible: true, filterable: true, sortable: true, draggable: true, resizable: true, width: 100},
      { key: 'qty', title: 'Quantity', name: 'QTY', visible: true, filterable: true, sortable: true, draggable: true, resizable: true, formatter: NoZeroFormatter, width: 70 },
      { key: 'price', title: 'Price', name: 'PX', visible: true, filterable: true, sortable: true, draggable: true, resizable: true, width: 70 },
      { key: 'net', title: 'Netted Quantity', name: 'NET', visible: true, filterable: true, sortable: true, draggable: true, resizable: true, formatter: NoZeroFormatter, width: 70 },
      { key: 'stable', title: 'Stable Quantity', name: 'STABLE', visible: true, filterable: true, sortable: true, draggable: true, resizable: true, formatter: NoZeroFormatter, width: 70},
      { key: 'unstable', title: 'Unstable Quantity', name: 'UNST', visible: true, filterable: true, sortable: true, draggable: true, resizable: true, formatter: NoZeroFormatter, width: 70},
      { key: 'repo', title: 'Repo Quantity', name: 'REPO', visible: true, filterable: true, sortable: true, draggable: true, resizable: true, formatter: NoZeroFormatter, width: 70},
      { key: 'repoRate', title: 'Repo Rate', name: 'REPO RT', visible: true, filterable: true, sortable: true, draggable: true, resizable: true, formatter: NoZeroFormatter, width: 70},
      { key: 'externalBorrow', title: 'External Borrow Quantity', name: 'EXT BR', visible: true, filterable: true, sortable: true, draggable: true, resizable: true, formatter: NoZeroFormatter, width: 70},
      { key: 'borrowRate', title: 'Borrow Rate', name: 'BR RT', visible: true, filterable: true, sortable: true, draggable: true, resizable: true, formatter: NoZeroFormatter, width: 70},
      { key: 'alm', title: 'ALM Quantity', name: 'ALM', visible: true, filterable: true, sortable: true, draggable: true, resizable: true, formatter: NoZeroFormatter, width: 70},
      { key: 'almRate', title: 'ALM Rate', name: 'ALM RT', visible: true, filterable: true, sortable: true, draggable: true, resizable: true, formatter: NoZeroFormatter, width: 70},
      { key: 'lcr', title: 'LCR', name: 'LCR', visible: true, filterable: true, sortable: true, draggable: true, resizable: true, formatter: NoZeroFormatter, width: 70},
      { key: 'rwa', title: 'RWA', name: 'RWA', visible: true, filterable: true, sortable: true, draggable: true, resizable: true, formatter: NoZeroFormatter, width: 70}, 
      { key: 'tier', title: 'Equity Tier', name: 'TIER', visible: true, filterable: true, sortable: true, draggable: true, resizable: true, width: 70},
      { key: 'indicativeLoanRate', title: 'Indicative Loan Rate', name: 'IND LO RT', visible: true, sortable: true, filterable: true, draggable: true, resizable: true, formatter: NoZeroFormatter, width: 70},
      { key: 'currency', title: 'Currency', name: 'CCY', visible: true, filterable: true, sortable: true, draggable: true, resizable: true, width: 70}
     ];
    
    this.state = {
      rows: [],
      filters: {},
      hist: {},
      columns: columnSetup
    }
  }
  
  componentDidMount() {
    this.createRows();
    this.grid.onToggleFilter();
    this.grid.onColumnResize = this.handleColResize;
  }
  
  handleColResize = (index, width) => {
    const newColList = update(this.state.columns, {[index]: {width: { $set: width}}});
        
    this.setState({
      columns: newColList
    }) 
  }
  
  close = () => {
    this.setState({ showIOI: false });
  }
    
  createRows = () => {        
    var file = '/Basket2.csv';
    
    var bigThis = this;
    $.get(file, function( data ) {
      Papa.parse(data,
       {header: true, complete: function(results) {
         bigThis.processUserInput(results);
      }});
    });
  }

  formatRowInput = (data) => {
    let rows = [];
    for (let i = 0; i < data.length; i++) {
      rows.push({
        id: i,
        name: data[i]['Name'],
        bloomberg: data[i]['Bloomberg'],
        sedol: data[i]['SEDOL'],
        isin: data[i]['ISIN'],
        qty: data[i]['Qty'],
        price: data[i]['Price'],
        net: data[i]['Net'],
        stable: data[i]['Stable'],
        unstable: data[i]['Unstable'],
        repo: data[i]['Repo'],
        repoRate: data[i]['RepoRate'],
        externalBorrow: data[i]['ExtBorrow'],
        alm: data[i]['ALM'],
        almRate: data[i]['almRate'],
        lcr: data[i]['LCR'],
        rwa: data[i]['RWA'],
        borrowRate: data[i]['BorrowRate'],
        tier: data[i]['Tier'],
        indicativeLoanRate: data[i]['IndLoanRate'],
        currency: data[i]['Currency']
      });
    }
    return rows;
  }
  
  processUserInput = (basket) => {
    var file = '/RussellRefData.csv';
    var input = basket.data;
   
    d3.csv(file, (data) => {
      let rows = [];
      for (let j = 0; j < input.length; j++) {
      for (let i=0; i<data.length; i++) {
        if (data[i]['Code'] === (input[j]['Name'])){
          
          var qty = input[j]['Qty'];
          var net = Math.floor(Math.random() * qty/100)*100;
          var stablePercent = Math.floor(Math.random() * 10)/10;
          var stable = net * stablePercent;
          var unstable = net - stable;
          
          // will be overwritten conditionally below
          var ext = 0;
          var borRate = 0;
          var repo = 0;
          var repoRate = 0;
          var alm = 0;    
          
          if (qty > 0) {
            var left = qty - net;
            repo = Math.floor((Math.random() * (left - left * .5) + left * .5)/100) * 100
            repoRate = data[i]['RepoRate']
            alm = left - repo;
            // short only
            ext = 0;
            borRate = 0;
          } else {
            ext = qty - net;
            borRate = data[i]['BorrowRate'];
            //long only
            repo = 0;
            repoRate = 0;
            alm = 0;
          }
      
          rows.push({
            id: i,
            name: data[i]['Code'],
            bloomberg: data[i]['Bloomberg'],
            sedol: data[i]['SEDOL'],
            isin: data[i]['ISIN'],
            qty: qty,
            price: data[i]['Price'],
            net: net,
            stable: stable,
            unstable: unstable,
            repo: repo,
            repoRate: repoRate,
            externalBorrow: ext,
            alm: alm,
            almRate: data[i]['almRate'],
            lcr: data[i]['LCR'],
            rwa: data[i]['RWA'],
            borrowRate: borRate,
            tier: data[i]['Tier'],
            indicativeLoanRate: data[i]['IndLoanRate'],
            currency: data[i]['Currency']
          });
          
          //found it so use this to short-circuit rest of the for loop
          i = data.length;
        }  
      }}
      this.setState({rows: rows, originalRows: rows})
    });
  }
  
  getSize =() => {
    return this.getRows().length;
  }
  
  getRows = () => {
    return Selectors.getRows(this.state);    
  }
  
  rowGetter = (i) => {
    let rows = this.getRows();
    return rows[i];
  }
  
  handleFilterChange = (filter) => {
    let newFilters = Object.assign({}, this.state.filters);
    
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    
    this.setState({ filters: newFilters });
  }
  
  onClearFilters = () => {
    this.setState({filters: {} });
  }
  
  handleGridSort = (sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      }
    };

    const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);

    this.setState({ rows });
  }
  
  uploadRows = (rows) => {
    this.processUserInput(rows);
  }
  
  onHeaderDrop = (source, target) => {
    const stateCopy = Object.assign({}, this.state);
    const columnSourceIndex = this.state.columns.findIndex(
      i => i.key === source
    );
    const columnTargetIndex = this.state.columns.findIndex(
      i => i.key === target
    );

    stateCopy.columns.splice(
      columnTargetIndex,
      0,
      stateCopy.columns.splice(columnSourceIndex, 1)[0]
    );

    const emptyColumns = Object.assign({},this.state, { columns: [] });
    this.setState(
      emptyColumns
    );

    const reorderedColumns = Object.assign({},this.state, { columns: stateCopy.columns });
    this.setState(
      reorderedColumns
    );
  }
  
  clickCol = (col) => {
    const colIndex = this.state.columns.findIndex(
      i => i.name === col
    );
    
    var newCols = [];
    
    if (this.state.columns[colIndex].name === col) {
      newCols = update(this.state.columns, {[colIndex]: {visible: {$set: !this.state.columns[colIndex].visible}}});
    }
    
    this.setState({
      columns: newCols
    })
  }
  
  hideCols = (columns) => {
    var newCols = this.state.columns;
    
    for (var j = 0; j < this.state.columns.length; j ++) {
      for (var i = 0; i <columns.length; i++) {
        if (this.state.columns[j].name === columns[i]) {
          newCols = update(newCols, {[j]: {visible: {$set: false}}})
        }
        else if (!columns.includes(this.state.columns[j].name)){
          newCols = update(newCols, {[j]: {visible: {$set: true}}})
        }
      } 
      if (columns.length === 0) {
        newCols = update(newCols, {[j]: {visible: {$set: true}}})
      }
    }
    
    this.setState({
      columns: newCols
    });
  }
  
  render() {
    const cols = this.state.columns.filter(column => column.visible === true);
        
    return  (
      <div>
        <DraggableContainer 
          onHeaderDrop={this.onHeaderDrop}>
          <ReactDataGrid
            ref={(grid) => { this.grid = grid; }}
            onGridSort={this.handleGridSort}
            columns={cols}
            rowGetter={this.rowGetter}
            rowsCount={this.getSize()}
            minHeight={this.props.height}
            toolbar={<Toolbar enableFilter={true}/>}
            onAddFilter={this.handleFilterChange}
            onClearFilters={this.onClearFilters}
          />
        </DraggableContainer>
        <PricingPanel 
          gridref={this.grid}
          cols={this.state.columns}
          hideCols={this.hideCols} 
          uploadRows={this.uploadRows}
          clickCol={this.clickCol}
        />
      </div>
    );
  }
}