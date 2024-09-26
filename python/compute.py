import requests
from bs4 import BeautifulSoup
from tickers import tickers
import json
from supabase import create_client, Client

url: str = "Supabase_Url"
key: str = "Supabase_Key"
supabase: Client = create_client(url, key)

NSE_Tickers = tickers["NSE"]
NSE_Prices = []

nse_index_url = "https://www.google.com/finance/quote/NIFTY_50:INDEXNSE"
response = requests.get(nse_index_url)
soup = BeautifulSoup(response.text, "html.parser")
class1 = "YMlKec fxKbKc"
nse_index_price = str(soup.find(class_=class1).text)

bse_index_url = "https://www.google.com/finance/quote/SENSEX:INDEXBOM"
response = requests.get(bse_index_url)
soup = BeautifulSoup(response.text, "html.parser")
class1 = "YMlKec fxKbKc"
bse_index_price = str(soup.find(class_=class1).text)


for i in range(0, len(NSE_Tickers)):
    url = f"https://www.google.com/finance/quote/{NSE_Tickers[i]}:NSE"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    class1 = "YMlKec fxKbKc"
    price = str(soup.find(class_=class1).text)
    class2 = "zzDege"
    name = str(soup.find(class_=class2).text)
    temp = { "Name": f'{name}', "Price":f'{price}' }
    NSE_Prices.append(temp)

BSE_Tickers = tickers["BSE"]
BSE_Prices = []

for i in range(0, len(NSE_Tickers)):
    url = f"https://www.google.com/finance/quote/{BSE_Tickers[i]}:BOM"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    class1 = "YMlKec fxKbKc"
    price = str(soup.find(class_=class1).text)
    temp = {"Name": f'{tickers["BSE_NAMES"][i]}', "Price": f'{price}'}
    BSE_Prices.append(temp)

prices = { "NSE_Index_Price" : nse_index_price, "BSE_Index_Price": bse_index_price, "NSE": NSE_Prices, "BSE": BSE_Prices}
json_obj = json.dumps(prices, indent=4)

response = (
    supabase.table("StockData")
    .update({"stockData": prices})
    .eq('primary_key', 1)
    .execute()
)
res = supabase.table("StockData").select("*").execute()