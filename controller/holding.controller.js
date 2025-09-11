import holdingModel from "../models/holding.model.js";
import {fetchLiveStockPrice} from "../services/stockService.js"

// this is the all holding getting from the DB
export const getAllHoldings = async (req, res) => {
  try {
    const userId = req.user.id; // assuming req.user is populated by auth middleware

    const holdings = await holdingModel.find({ user: userId });

    const enrichedHoldings = [];

    for (const holding of holdings) {
      const liveData = fetchLiveStockPrice(holding.avgPrice);

      const currentValue = holding.quantity * liveData.currentPrice;
      const pnl = (liveData.currentPrice - holding.avgPrice) * holding.quantity;
      const isLoss = pnl < 0;

      const dayChange = liveData.dayChangeAmount;
      const netChange = liveData.dayChangePercentage;

      enrichedHoldings.push({
        name: holding.symbol,
        qty:  holding.quantity,
        avg:  holding.avgPrice,
        price: liveData.currentPrice,
        currentValue: currentValue,
        pnl: pnl,
        net: `${netChange > 0 ? '+' : ''}${netChange.toFixed(2)}%`,
        day: `${dayChange > 0 ? '+' : ''}${dayChange.toFixed(2)}`,
        isLoss: isLoss
      });

    }

    return res.status(200).json(
      enrichedHoldings,
    );

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching holdings' });
  }
};