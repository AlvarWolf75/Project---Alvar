const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3001/getOrders');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error; // Propagate the error for handling in the calling code
    }
  };
  
  export default { fetchOrders };