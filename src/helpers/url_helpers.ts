const urls = {
  // CREATE
  PRODUCT_CREATE: "/product/add",

  // Requests
  REQUESTS: "/ProductRequest",
  SYSTEM_ALERT: "ProductRequest/alert",
  REQUEST_STATS: "/productrequest/stats",
  REQUEST_ACTIVITY_LOG: "/productrequest/activitylog",

  // Products
  PRODUCT: "/product",
  PRODUCT_STATS: "product/stats",
  PRODUCT_DETAILS: "product/product-details",

  ACTIVITY_LOG: "/product/activitylog",

  // Validate
  VALIDATE_NAME: "/product/verify-name",

  //  Invesment
  INVESTMENT_CREATE: "/investment/add",
  INVESTMENT_EDIT: "/investment/edit",
  
  //investment
  INVESTMENT: '/Investment',
  INVESTMENT_REQUEST: '/InvestmentRequest',
  INVESTMENT_STATS: '/Investment/stats',
  INVESTMENT_REQUEST_STATS: '/InvestmentRequest/stats',
  INVESTMENT_ACTIVITY_LOG: '/Investment/activitylog',
  INVESTMENT_REQUEST_ACTIVITY_LOG: '/InvestmentRequest/activitylog',
  
  INVESTMENT_CALC: "/investment/calc",
  INVESTMENT_DASHBOARD_STATS: '/Dashboard/investmentstats',
  CHARGES: "/charges/",

  // Security Purchase
  SECURITY_PURCHASE_CREATE: "/SecurityPurchase/add",
  SECURITY_PURCHASE_REQUEST: "/SecurityPurchaseRequest",
  SECURITY_PURCHASE_ACTIVITY_LOG: "SecurityPurchase/activityLog",
  SECURITY_PURCHASE_REQUEST_ACTIVITY_LOG: "SecurityPurchaseRequest/activityLog"
};

export default urls;
