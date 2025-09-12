
/**
 * This file help me to generate dummy stock data
 */

// import { faker } from '@faker-js/faker';


// const sampleCompanies = [
//   { symbol: "RELIANCE", name: "Reliance Industries", exchange: "NSE" },
//   { symbol: "HDFCBANK", name: "HDFC Bank", exchange: "NSE" },
//   { symbol: "TCS", name: "Tata Consultancy Services", exchange: "NSE" },
//   { symbol: "BHARTIARTL", name: "Bharti Airtel", exchange: "NSE" },
//   { symbol: "ICICIBANK", name: "ICICI Bank", exchange: "NSE" },
//   { symbol: "SBIN", name: "State Bank of India", exchange: "NSE" },
//   { symbol: "HINDUNILVR", name: "Hindustan Unilever", exchange: "NSE" },
//   { symbol: "INFY", name: "Infosys", exchange: "NSE" },
//   { symbol: "ITC", name: "ITC Ltd", exchange: "NSE" },
//   { symbol: "AXISBANK", name: "Axis Bank", exchange: "NSE" },
//   { symbol: "LT", name: "Larsen & Toubro", exchange: "NSE" },
//   { symbol: "MARUTI", name: "Maruti Suzuki India", exchange: "NSE" },
//   { symbol: "M&M", name: "Mahindra & Mahindra", exchange: "NSE" },
//   { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", exchange: "NSE" },
//   { symbol: "HCLTECH", name: "HCL Technologies", exchange: "NSE" },
//   { symbol: "SUNPHARMA", name: "Sun Pharmaceutical", exchange: "NSE" },
//   { symbol: "POWERGRID", name: "Powergrid Corporation of India", exchange: "NSE" },
//   { symbol: "ADANIPORTS", name: "Adani Ports & SEZ", exchange: "NSE" },
//   { symbol: "ADANIENT", name: "Adani Enterprises", exchange: "NSE" },
//   { symbol: "JSWSTEEL", name: "JSW Steel", exchange: "NSE" },
//   { symbol: "TATASTEEL", name: "Tata Steel", exchange: "NSE" },
//   { symbol: "TATAMOTORS", name: "Tata Motors", exchange: "NSE" },
//   { symbol: "COALINDIA", name: "Coal India", exchange: "NSE" },
//   { symbol: "ONGC", name: "Oil & Natural Gas Corporation", exchange: "NSE" },
//   { symbol: "NTPC", name: "NTPC", exchange: "NSE" },
//   { symbol: "ASIANPAINT", name: "Asian Paints", exchange: "NSE" },
//   { symbol: "GRASIM", name: "Grasim Industries", exchange: "NSE" },
//   { symbol: "HINDALCO", name: "Hindalco Industries", exchange: "NSE" },
//   { symbol: "TITAN", name: "Titan Company", exchange: "NSE" },
//   { symbol: "EICHERMOT", name: "Eicher Motors", exchange: "NSE" },
//   { symbol: "DRREDDY", name: "Dr. Reddy's Laboratories", exchange: "NSE" },
//   { symbol: "CIPLA", name: "Cipla", exchange: "NSE" },
//   { symbol: "SBILIFE", name: "SBI Life Insurance", exchange: "NSE" },
//   { symbol: "BAJFINANCE", name: "Bajaj Finance", exchange: "NSE" },
//   { symbol: "BAJAJFINSV", name: "Bajaj Finserv", exchange: "NSE" },
//   { symbol: "INDUSINDBK", name: "IndusInd Bank", exchange: "NSE" },
//   { symbol: "HDFCLIFE", name: "HDFC Life", exchange: "NSE" },
//   { symbol: "TATACONSUM", name: "Tata Consumer Products", exchange: "NSE" },
//   { symbol: "ETERNAL", name: "Eternal (Zomato)", exchange: "NSE" },
//   { symbol: "JIOFIN", name: "Jio Financial Services", exchange: "NSE" },
//   { symbol: "SHRIRAMFIN", name: "Shriram Finance", exchange: "NSE" },
//   { symbol: "INDIGO", name: "InterGlobe Aviation (IndiGo)", exchange: "NSE" },
//   { symbol: "VEDL", name: "Vedanta", exchange: "NSE" },
//   { symbol: "GODREJCP", name: "Godrej Consumer Products", exchange: "NSE" },
//   { symbol: "HAVELLS", name: "Havells India", exchange: "NSE" },
//   { symbol: "BANKBARODA", name: "Bank of Baroda", exchange: "NSE" },
//   { symbol: "TORNTPHARM", name: "Torrent Pharmaceuticals", exchange: "NSE" },
//   { symbol: "BOSCHLTD", name: "Bosch India", exchange: "NSE" },
//   { symbol: "PNB", name: "Punjab National Bank", exchange: "NSE" },
//   { symbol: "HDFCAMC", name: "HDFC AMC", exchange: "NSE" },
//   { symbol: "GAIL", name: "GAIL", exchange: "NSE" },
//   { symbol: "DLF", name: "DLF", exchange: "NSE" },
//   { symbol: "SHREECEM", name: "Shree Cement", exchange: "NSE" },
//   { symbol: "ABB", name: "ABB India", exchange: "NSE" },
//   { symbol: "HEROMOTOCO", name: "Hero MotoCorp", exchange: "NSE" },
//   { symbol: "POLYCAB", name: "Polycab India", exchange: "NSE" }
// ];


// export const generateDummyStocks = (count = 300) => {
//   let stocks = [];

//   for (let i = 0; i < count; i++) {
//     const company =
//       sampleCompanies[i % sampleCompanies.length] ||
//       {
//         symbol: faker.string.alpha(4).toUpperCase(),
//         name: faker.company.name(),
//         exchange: faker.helpers.arrayElement(["NSE", "BSE"]),
//       };

//     const price = faker.number.float({ min: 100, max: 5000, precision: 0.01 });
//     const prevClose = price - faker.number.float({ min: -50, max: 50 });
//     const change = price - prevClose;
//     const percentChange = (change / prevClose) * 100;

//     stocks.push({
//       symbol: company.symbol + i, // make unique
//       name: company.name,
//       exchange: company.exchange,
//       type: faker.helpers.arrayElement(["EQ", "FUT", "OPT"]),
//       price,
//       change,
//       percentChange,
//       open: price + faker.number.float({ min: -20, max: 20 }),
//       high: price + faker.number.float({ min: 0, max: 50 }),
//       low: price - faker.number.float({ min: 0, max: 50 }),
//       prevClose,
//       volume: faker.number.int({ min: 1000, max: 1000000 }),
//       lowerCircuit: price * 0.9,
//       upperCircuit: price * 1.1,
//       bids: Array.from({ length: 3 }, () => ({
//         price: faker.number.float({ min: price - 20, max: price, precision: 0.01 }),
//         orders: faker.number.int({ min: 1, max: 10 }),
//         qty: faker.number.int({ min: 10, max: 500 }),
//       })),
//       offers: Array.from({ length: 3 }, () => ({
//         price: faker.number.float({ min: price, max: price + 20, precision: 0.01 }),
//         orders: faker.number.int({ min: 1, max: 10 }),
//         qty: faker.number.int({ min: 10, max: 500 }),
//       })),
//       lastTradedTime: faker.date.recent(),
//     });
//   }

//   return stocks;
// };
