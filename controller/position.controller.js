import positionModel from "../models/position.model.js";
import { fetchLiveStockPrice } from "../services/stockService.js";

/**
 * This feature is not yet working, still in process, because of data
 */
export const getAllPosition = async (req, res) => {
    try {
      const userId = req.user.id;
      const positions = await positionModel.find({ user: userId });

      const enrichedPositions = [];
      for (const position of positions) {
          // Mock live market data
          const liveData = fetchLiveStockPrice(position.avgPrice);

          // Calculate Unrealized P&L
          const pnl = (liveData.currentPrice - position.avgPrice) * position.quantity;
          const isLoss = pnl < 0;

          // Format and enrich the data for the frontend
          enrichedPositions.push({
              name: position.symbol,
              product: position.productType,
              qty: position.quantity,
              avg: parseFloat(position.avgPrice.toFixed(2)),
              price: liveData.currentPrice,
              pnl: parseFloat(pnl.toFixed(2)),
              net: `${liveData.dayChangePercentage > 0 ? '+' : ''}${liveData.dayChangePercentage.toFixed(2)}%`,
              day: `${liveData.dayChangeAmount > 0 ? '+' : ''}${liveData.dayChangeAmount.toFixed(2)}`,
              isLoss: isLoss,
          });
      }
      
      res.json(enrichedPositions);

    } catch (err) {
      console.error(`Error while fetching the position from server: ${err}`);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
}