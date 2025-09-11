/**
 * Generates mock live stock data based on the stored average price.
 * This simulates the behavior of a real-time market data API.
 * @param {number} avgPrice - The average price from the user's holding.
 * @returns {object} Mock live data including current price and day changes.
 */

export const fetchLiveStockPrice = (avgPrice) => {
    const flactuation =  (Math.random() - 0.5) * avgPrice * 0.1;
    const currentPrice = avgPrice + flactuation;

    const dayChangeAmount = flactuation;
    const dayChangePercentage = (dayChangeAmount * avgPrice) / 100;

    return {
        currentPrice: parseFloat(currentPrice.toFixed(2)),
        dayChangeAmount: parseFloat(dayChangeAmount.toFixed(2)),
        dayChangePercentage: parseFloat(dayChangePercentage.toFixed(2)),
    };
}

