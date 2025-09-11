/**
 * 
 * @description 
 * 
 * This `order.helper.js` will help the project to generate some random data for user, whenever a user places an order .
 * 
 *      This file is responsible for generating 
 * 
 *      1. transactionId: 20 digit unique numeric 
 *      2. ISIN: A 12 digit alpha numeric for identify each order uniquely
 */

export const generateTransactionId = async ()=> {
    let transactionId = "";
    for (let i = 0; i < 20; ++i) {
        transactionId += Math.floor(Math.random() * 10);
    }

    return transactionId;
}

export const generateISIN = () => {
  const countryCode = "IN"; 
  const identifierChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let identifier = "";
  for (let i = 0; i < 9; i++) {
    identifier += identifierChars.charAt(Math.floor(Math.random() * identifierChars.length));
  }
  const checkDigit = Math.floor(Math.random() * 10).toString();
  const isin = countryCode + identifier + checkDigit;

  return isin;
};