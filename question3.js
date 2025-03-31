[
  {
    // Unwind the 'items' array to process each item individually
    "$unwind": "$items"
  },
  {
    // Group the data by 'store' and the month of the 'date' field
    "$group": {
      "_id": {
        "store": "$store", // Group by store
        "month": { 
          "$dateToString": { 
            "format": "%Y-%m", // Extract the year and month from the 'date'
            "date": "$date" 
          } 
        }
      },
      // Calculate total revenue for each store and month
      "totalRevenue": { 
        "$sum": { 
          "$multiply": ["$items.quantity", "$items.price"] 
        } 
      },
      // Calculate total quantity of items sold for each store and month
      "totalQuantity": { "$sum": "$items.quantity" },
      // Calculate the total number of items (count of items)
      "totalItems": { "$sum": 1 },
      // Calculate the total price of items sold for each store and month
      "totalPrice": { "$sum": "$items.price" }
    }
  },
  {
    // Project the final fields: store, month, totalRevenue, and averagePrice
    "$project": {
      "_id": 0, // Exclude the '_id' field
      "store": "$_id.store", // Include store
      "month": "$_id.month", // Include month
      "totalRevenue": 1, // Include totalRevenue
      // Calculate average price by dividing totalPrice by totalItems
      "averagePrice": { "$divide": ["$totalPrice", "$totalItems"] }
    }
  },
  {
    // Sort by store and month in ascending order
    "$sort": { "store": 1, "month": 1 }
  }
]
