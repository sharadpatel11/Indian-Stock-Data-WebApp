import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        stockData: [],
        DataisLoaded: false,
    };
  }

componentDidMount() {
    fetch("https://indian-stock-market-data-server.vercel.app/api/req")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                stockData: json,
                DataisLoaded: true,
            });
        });
  }
  render() {
    const { DataisLoaded, stockData } = this.state;
    if (!DataisLoaded)
        return (
            <div>
            </div>
        );

    return (
      <div className="app">
        <div className="stock_market">
          <h1>NSE/BSE Stock Prices</h1>
          <p>(Updated every 30 mins during market open hours)</p>
          <div className="market">
            <div className="stocks">
              <div className="market_headers">
                <div className="market_header">
                    <h2>N</h2>
                    <h2>S</h2>
                    <h2>E</h2>
                </div>
                <div className='index_ticker'>
                    <p>Nifty 50</p>
                    <p>₹{stockData[0].stockData.NSE_Index_Price}</p>
                </div>
              </div>
              <div className="wrapper">
                <div className="stock">
                    {stockData[0].stockData.NSE.map((item) => (
                      <div key={item.id} className="ticker">
                        <p>{item.Name}</p>
                        <p>{item.Price}</p>
                      </div>
                    ))}
                    {stockData[0].stockData.NSE.map((item) => (
                      <div key={item.id} className="ticker">
                        <p>{item.Name}</p>
                        <p>{item.Price}</p>
                      </div>
                    ))}
                    {stockData[0].stockData.NSE.map((item) => (
                      <div key={item.id} className="ticker">
                        <p>{item.Name}</p>
                        <p>{item.Price}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="stocks">
              <div className="market_headers">
                <div className="market_header">
                    <h2>B</h2>
                    <h2>S</h2>
                    <h2>E</h2>
                </div>
                <div className='index_ticker'>
                    <p>Sensex</p>
                    <p>₹{stockData[0].stockData.BSE_Index_Price}</p>
                </div>
              </div>
              <div className="wrapper">
                <div className="stock">
                    {stockData[0].stockData.BSE.map((item) => (
                      <div key={item.id} className="ticker">
                        <p>{item.Name}</p>
                        <p>{item.Price}</p>
                      </div>
                    ))}
                    {stockData[0].stockData.BSE.map((item) => (
                      <div key={item.id} className="ticker">
                        <p>{item.Name}</p>
                        <p>{item.Price}</p>
                      </div>
                    ))}
                    {stockData[0].stockData.BSE.map((item) => (
                      <div key={item.id} className="ticker">
                        <p>{item.Name}</p>
                        <p>{item.Price}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
