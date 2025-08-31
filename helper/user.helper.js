/**
 * @brief  Utility functions to generate random user-related data.
 *
 * Generates:
 * - Bank account number  => 16-digit unique account number
 * - Bank name            => Random bank name (not unique)
 * - PAN card number      => 10-character unique alphanumeric (ABCDE1234F format)
 * - Unique user ID       => 7-character alphanumeric (unique)
 * - Default profile avatar => Done separately in generateUserImage.js
 * - Demat (BO) number    => 16-digit unique number
 * - Segments             => ["MF", "BSE", "NSE"] (static)
 * - Support code         => 4-digit unique numeric code
 */


// Generate account number (16 digits)
export const generateAccountNumber = () => {
    let acc = "";
    for (let i = 0; i < 16; i++) {
        acc += Math.floor(Math.random() * 10);
    }
    return acc;
};

// Generate unique user id (7 alphanumeric chars)
export const generateUserId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "123456789";
    let userId = "";

    // generate first 3
    for (let i = 0; i < 3; i++) {
        userId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // second 3 digits
    for (let i = 0; i < 3; ++i) {
        userId += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    // last digit
    userId += chars.charAt(Math.floor(Math.random() * chars.length));

    return userId;
};

// Generate PAN card number (ABCDE1234F format)
export const generatePanCardNumber = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";

    let pan = "";
    // First 5 letters
    for (let i = 0; i < 5; i++) {
        pan += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    // Next 4 digits
    for (let i = 0; i < 4; i++) {
        pan += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    // Last letter
    pan += letters.charAt(Math.floor(Math.random() * letters.length));

    return pan;
};

// Generate random Demat (BO) number (16 digits)
export const generateDematNumber = () => {
    let demat = "";
    for (let i = 0; i < 16; i++) {
        demat += Math.floor(Math.random() * 10);
    }
    return demat;
};

// Generate support code (4 digits)
export const generateSupportCode = () => {
    let code = "";
    for (let i = 0; i < 4; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
};

const BANK_NAMES = [
  // Major Indians Bank
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank of India",
  "Indian Bank",
  "Bank of India",
  "Central Bank of India",
  "Indian Overseas Bank",
  "UCO Bank",
  "IDBI Bank",
  "Yes Bank",
  "IndusInd Bank",
  "IDFC First Bank",
  "Federal Bank",
  "South Indian Bank",
  "RBL Bank",
  "Bandhan Bank",
  "Karur Vysya Bank",
  "DCB Bank",
  "Jammu & Kashmir Bank",

  // some international bank
  "HSBC Bank",
  "Citibank",
  "Standard Chartered Bank",
  "Deutsche Bank",
  "Barclays Bank",
  "BNP Paribas",
  "DBS Bank",
  "Bank of America",
  "JP Morgan Chase",
  "Wells Fargo"
];


export const generateBankName = () => {
    return BANK_NAMES[Math.floor(Math.random() * BANK_NAMES.length)];
};

// Static segments
export const SEGMENTS = ["MF", "BSE", "NSE"];
