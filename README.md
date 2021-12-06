# Vincit Rising Star Pre-Assignment
The pre-assignment for Vincit's Rising Star -program. Project consists of two parts, an API for returning historical data of Bitcoin and a UI made with React that displays the data in question neatly.

## Installing
This project is hosted in two places, this GitHub repository and Azure cloud. 

### Azure
Links for Azure versions:

API: https://pre-assignment-api.azurewebsites.net  
UI: https://pre-assignment-ui.azurewebsites.net

### GitHub
In your terminal, run:
```
git clone https://github.com/partahauki/vincit-pre-assignment-2021/
```

Cloned folder contains two subfolders, one for API and one for UI. Navigate to Api -folder and install its dependencies using:
```
npm i
```
After that, you can start the API using:
```
npm start
```
Make sure port 8080 is available for the API.

Same thing for the UI. Navigate to react-ui -folder and run the same commands:
```
npm i
npm start
```
For the UI, make sure port 3000 is available.

## How to use the API
This API responds to three different routes, that provide historical Bitcoin data from a user defined date range. User is always required to pass startDate and endDate -parameters in a YYYY-MM-DD -format as query parameters. Api always returns JSON-data.  

#### __/downtrend__ 
Returns the longest streak of days in a given date range, where Bitcoin price was going down.  
{ maxStreak: number }

#### __/volume__ 
Returns the date when there was the highest trading volume and the amount of that volume.  
{ maxVolume: number, date: string }

#### __/time-machine__ 
Returns the best day to buy and sell in a given date range.  
{ maxDifference: number, buyDate: string, sellDate: string }

An example of a working API-call in a local environment would be:
```
http://localhost:8080/downtrend?startDate=2020-01-01&endDate=2021-01-01
```

## Some details and thoughts
The API generates a price for every day in the user provided date range. It always selects the price that is most near midnight UTC, for example if it is looking for a price for 2020-02-10 and there is data with timestamp 2020-02-09 23:59 and 2020-02-10 00:03 available it chooses 2020-02-09 23:59.

The API was linted with modified Airbnb-eslint and the UI was linted with modified Google-eslint.

If I were to do this project again, I would use typescript, as it makes the code much more understandable and documenting the code easier.