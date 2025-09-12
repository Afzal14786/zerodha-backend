import mongoose from "mongoose";
import orderModel from "../models/order.model.js";
import holdingModel from "../models/holding.model.js";
import { generateISIN, generateTransactionId } from "../helper/order.helper.js";

export const placeOrder = async (req, res) => {
  /**
   * @description 
   * 
   *    While placing an order, the mongoose will start a session
   *    this session help to complete the transaction correctly,
   * 
   */

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    /**
     * Here we are checking if the user is valid or not
     * 
     *  if valid : let proceed
     *  
     *  if not : then 
     *      abort the transaction and end the session
     */
    if (!req.user || !req.user.id) {
        await session.abortTransaction();
        session.endSession();
        return res.status(401).json({
            success: false,
            message: "Unauthorized : UserId not found in request",
        });
    }

    /**
     * 
     *  In this section of code line no 40
     * 
     *  we are fetching data from user like 
     *      - quantity : What is the quantity?
     *      - price : What is the price?
     *      - symbol: TATA, RELIANCE, TCS, INFOSIS, etc ...
     */
    const {quantity, price, symbol} = req.body;
    const userId = req.user.id;

    /**
     *  Checking if the user enter the details properly or not
     * 
     *  If any one of the details are mission, then 
     *  
     *      - Abort the transaction and end the session
     */
    if (!quantity || !symbol || price === undefined) {
        await session.abortTransaction();
        session.endSession();
        return res.status(401).json({
            success: false,
            message: "Price, Quantity & Symbol are required,"
        });
    }

    /**
     *  Here user is successfully enter the above details properly,
     *  Now calculating the total, and generate isin and transactionId
     */

    const total = quantity * price;
    const isin = generateISIN();
    const transactionId = await generateTransactionId();

    const newOrder = new orderModel({
        user: userId,
        transactionId: transactionId,
        ISIN: isin,
        symbol: symbol,
        quantity: quantity,
        price: price,
        total: total,
        status: "Executed",
        tradeDate: new Date(),
    });

    await newOrder.save({session});

    let holding = await holdingModel.findOne({user: userId, symbol: symbol}).session(session);

    if (holding) {
        const newTotalQuantity = holding.quantity + quantity;
        const newAvgPrice = ((holding.avgPrice * holding.quantity) + (price * quantity)) / newTotalQuantity;

        holding.quantity = newTotalQuantity;
        holding.avgPrice = newAvgPrice;

        await holding.save({session});
    } else {
        /**
         * if user don't have any holding yet then
         * 
         */

        const newHolding = new holdingModel({
            user: userId,
            symbol: symbol,
            quantity: quantity,
            avgPrice: price,
        })

        await newHolding.save({session});
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
        success: true,
        message: "Order placed successfully and holding updated",
        order: newOrder,
    });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.error(`Backend error while placing the order: ${err}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const getAllOrders = async(req, res)=> {
    try {
        const userId = req.user.id;
        const orders = await orderModel.find({user: userId}).sort({tradeDate: -1});

        return res.status(200).json(orders);
    } catch (err) {
        console.error(`Error while fetching all the orders`);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}