var express = require('express');
var fs = require('fs');
const cors = require("cors");

var app = express();
app.use(express.json());

const corsOptions = {
  origin: "https://indian-stock-market-data.vercel.app",
};

app.use(cors(corsOptions));

var database = require("@supabase/supabase-js");
// const supabaseKey = process.env.supabaseKey;
// const supabaseUrl = process.env.supabaseUrl;

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxucmdnc2RobXpraGhzaWd6bGptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MTA1ODUsImV4cCI6MjA0MjI4NjU4NX0.2GD5jwxgeiZw5JZXospBBUplVSPlP788GH5RGOWvWbg"
const supabaseUrl = 'https://lnrggsdhmzkhhsigzljm.supabase.co'
const supabase = database.createClient(supabaseUrl, supabaseKey);

async function getData() {
  var stockData = await supabase
    .from('StockData')
    .select("stockData");

  var d = JSON.stringify(stockData.data);
  return d;
} 

app.get('/', function(request, response){
  const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Indian Stock Market Data Server</title>
            <style>
                body {
                    background: linear-gradient(90deg, rgba(0, 188, 212, 1) 0%, rgba(0, 126, 212, 1) 100%);
                    height: 100vh;
                    width: 100vw;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                    font-size: 24px;
                    color: black;
                    pading: 20px;
                }
                p {
                    font-size: 22px;
                }
                a {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <h1>Hello! The server is currently running on Vercel....</h1>
            <br/>
            <p>Please use <a>indian-stock-market-data-server.vercel.app/api/req</a> to access the API</p>
        </body>
      </html>
    `
  response.send(html);
})

app.get('/api/req', async function(request, response){
  var sendData = await getData();
  response.send(sendData);
})

app.listen(8888);
