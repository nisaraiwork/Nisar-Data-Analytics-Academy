export interface SampleDataset {
  id: string;
  title: string;
  description: string;
  category: string;
  fileName: string;
  content: string;
  expectedHighlights: string[];
}

export const SAMPLE_DATASETS: SampleDataset[] = [
  {
    id: 'retail_sales',
    title: 'Karachi Mart Retail Sales (Practice)',
    description: 'Realistic store transaction dataset with product categories, quantities, PKR prices, payment modes, and a couple intentional empty values for cleaning practice.',
    category: 'Retail & Store Sales',
    fileName: 'karachi_mart_sales.csv',
    expectedHighlights: [
      '15 rows, 7 columns',
      'Missing values in "Discount_PKR" & "Customer_Phone"',
      '1 duplicate transaction row to test de-duplication'
    ],
    content: `Transaction_ID,Date,Product_Category,Item_Name,Quantity,Unit_Price_PKR,Total_PKR,Payment_Method,Discount_PKR,Customer_Phone
TXN-1001,2026-10-01,Groceries,Basmati Rice 5kg,2,1850,3700,Cash,0,03001234567
TXN-1002,2026-10-01,Dairy,Fresh Milk 1L,4,280,1120,EasyPaisa,0,03129876543
TXN-1003,2026-10-02,Apparel,Cotton Kurti Medium,1,2500,2500,Credit Card,250,03335551212
TXN-1004,2026-10-02,Electronics,USB-C Fast Cable,3,650,1950,JazzCash,,03456789012
TXN-1005,2026-10-03,Groceries,Cooking Oil 5L,1,2850,2850,Cash,0,
TXN-1006,2026-10-03,Stationery,A4 Paper Ream,5,1100,5500,Credit Card,150,03019998888
TXN-1007,2026-10-04,Apparel,Lawn Suit 3-Piece,2,4500,9000,Cash,500,03214443322
TXN-1008,2026-10-04,Electronics,Bluetooth Earbuds,1,3800,3800,EasyPaisa,300,03310001122
TXN-1009,2026-10-05,Groceries,Sugar 5kg,2,750,1500,Cash,0,03001234567
TXN-1010,2026-10-05,Dairy,Cheddar Cheese 200g,2,850,1700,JazzCash,,03123456789
TXN-1011,2026-10-06,Apparel,Formal Mens Shirt,3,2200,6600,Credit Card,400,03445556677
TXN-1012,2026-10-06,Stationery,Ballpoint Pen Box,10,180,1800,Cash,0,
TXN-1013,2026-10-07,Groceries,Wheat Flour 10kg,1,1650,1650,Cash,0,03058887766
TXN-1014,2026-10-07,Electronics,Power Bank 10000mAh,2,4200,8400,EasyPaisa,400,03221114455
TXN-1001,2026-10-01,Groceries,Basmati Rice 5kg,2,1850,3700,Cash,0,03001234567`
  },
  {
    id: 'ecommerce_orders',
    title: 'Pakistan E-Commerce Order Records',
    description: 'National order deliveries across Karachi, Lahore, Islamabad, Rawalpindi, and Faisalabad with order statuses and customer ratings.',
    category: 'E-Commerce Analytics',
    fileName: 'pak_ecommerce_orders.csv',
    expectedHighlights: [
      'Orders across 5 major cities',
      'Average order basket evaluation',
      'COD vs Digital Payment distribution'
    ],
    content: `OrderID,Customer_City,Product_Name,Category,Amount_PKR,Payment_Type,Delivery_Status,Customer_Rating
ORD-8801,Karachi,Wireless Mouse,Electronics,1850,Cash on Delivery,Delivered,5
ORD-8802,Lahore,Men Leather Wallet,Fashion,2200,Bank Transfer,Delivered,4
ORD-8803,Islamabad,Smart Fitness Band,Wearables,5400,Credit Card,Delivered,5
ORD-8804,Karachi,Portable Blender,Home,3600,Cash on Delivery,Returned,2
ORD-8805,Faisalabad,Sports Running Shoes,Footwear,4800,JazzCash,Delivered,4
ORD-8806,Rawalpindi,Ceramic Coffee Mug,Home,950,EasyPaisa,Delivered,5
ORD-8807,Lahore,Mechanical Keyboard,Electronics,7200,Credit Card,Delivered,5
ORD-8808,Karachi,Cotton Bed Sheet King,Home,3200,Cash on Delivery,Delivered,4
ORD-8809,Multan,Casual T-Shirt Pack,Fashion,1900,Cash on Delivery,Delivered,3
ORD-8810,Islamabad,Noise Cancelling Headphones,Electronics,12500,Credit Card,Delivered,5
ORD-8811,Lahore,Stainless Steel Flask,Home,1600,EasyPaisa,Cancelled,
ORD-8812,Karachi,Leather Laptop Bag,Accessories,4500,Cash on Delivery,Delivered,4`
  },
  {
    id: 'store_expenses',
    title: 'Lesson 01 Practice: 5 Daily Store Expenses',
    description: 'The companion practice dataset for Lesson 01 - tracking utilities, supplies, transport, and inventory replenishment.',
    category: 'Expense Tracking',
    fileName: 'daily_store_expenses.csv',
    expectedHighlights: [
      'Clean small dataset for fast testing',
      'Calculation verification',
      'Daily operational expense breakdown'
    ],
    content: `Expense_ID,Date,Category,Description,Cost_PKR,Payment_Source
EXP-01,2026-10-25,Utilities,Electricity Bill Deposit,8500,Bank Account
EXP-02,2026-10-26,Logistics,Rickshaw Delivery to Warehouse,1200,Cash Drawer
EXP-03,2026-10-27,Inventory,Packaging Bags Box of 500,2800,Cash Drawer
EXP-04,2026-10-28,Refreshments,Tea and Water for Staff,650,Cash Drawer
EXP-05,2026-10-29,Supplies,Printer Ink Cartridge Black,3400,EasyPaisa`
  }
];
