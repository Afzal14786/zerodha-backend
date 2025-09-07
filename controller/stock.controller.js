// controllers/stock.controller.js
import Stock from "../schemas/stock.schema.js";
// this will generate the dummy data

// import { generateDummyStocks } from "../helper/stock.helper.js";

// Seed DB with dummy data (only if empty)
// export const seedStocks = async (req, res) => {
//   try {
//     const existing = await Stock.countDocuments();
//     if (existing > 0) {
//       return res.status(400).send("Stocks already exist. Skipping seed.");
//     }

//     const stocks = generateDummyStocks(300);
//     await Stock.insertMany(stocks);

//     res.send("Dummy Stock Data Inserted.");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(" Error seeding stocks.");
//   }
// };


export const updateStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({}, "_id price prevClose open high low volume");

    const ops = stocks.map((stock) => {
      // random fluctuation (±10)
      const newPrice = stock.price + (Math.random() * 20 - 10);
      const price = Math.max(newPrice, 1); // prevent negative
      const change = price - stock.prevClose;
      const percentChange = (change / stock.prevClose) * 100;

      return {
        updateOne: {
          filter: { _id: stock._id },
          update: {
            $set: {
              prevClose: stock.price,
              price,
              change,
              percentChange,
              open: stock.open || price,
              high: Math.max(stock.high || price, price),
              low: Math.min(stock.low || price, price),
              volume: stock.volume + Math.floor(Math.random() * 5000),
              lastTradedTime: new Date(),
            },
          },
        },
      };
    });

    if (ops.length > 0) {
      await Stock.bulkWrite(ops);
    }

    res.send(`Updated ${ops.length} stocks successfully.`);
  } catch (err) {
    console.error("Error updating stocks:", err);
    res.status(500).send("Error updating stocks.");
  }
};

// now seach the stock based on input by the user

export const getStock = async(req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(500).json({
      success: false,
      message: "Query string q is required",
    });
  }

  try {
    const stock = await Stock.find({
      symbol: { $regex: query, $options: "i" },
    }).limit(15);

    return res.json({
      success: true,
      data: stock,
    });

  } catch (err) {
    console.error(`Error While Searching The Stocks : ${err}`);
    return res.status(500).json({
      success: false,
      message: "Error From Server While Fatching The Stock Details",
    });
  }
}