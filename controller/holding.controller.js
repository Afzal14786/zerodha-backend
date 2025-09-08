import holdingModel from "../models/holding.model.js";


// this is the all holding getting from the DB
export const getAllHoldings = async (req, res) => {
  try {
    const userId = req.user.id; // assuming req.user is populated by auth middleware

    const allHoldings = await holdingModel.findOne({ user: userId }); // corrected this line

    res.json(allHoldings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching holdings' });
  }
};
