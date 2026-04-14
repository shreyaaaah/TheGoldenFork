import { gql, request } from 'graphql-request';

const HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
const HYGRAPH_TOKEN = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN;


const makeRequest = async (query, variables = {}) => {
  const headers = {
    'Authorization': `Bearer ${HYGRAPH_TOKEN}`,
    'Content-Type': 'application/json',
  };
  
  return await request(HYGRAPH_ENDPOINT, query, variables, headers);
};


const GET_ALL_ORDERS = gql`
  query GetAllOrders {
    orders(orderBy: orderdate_DESC) {
      id
      username
      useremail
      orderdate
      items
      subtotal
      gst
      deliveryfee
      total
      paymentmode
      statue
      address
    }
  }
`;


const GET_ORDERS_BY_STATUS = gql`
  query GetOrdersByStatus($status: String!) {
    orders(where: { statue: $status }, orderBy: orderdate_DESC) {
      id
      username
      useremail
      orderdate
      items
      subtotal
      gst
      deliveryfee
      total
      paymentmode
      statue
      address
    }
  }
`;


const GET_ORDERS_BY_DATE = gql`
  query GetOrdersByDate($startDate: DateTime!, $endDate: DateTime!) {
    orders(
      where: { 
        orderdate_gte: $startDate, 
        orderdate_lte: $endDate 
      }, 
      orderBy: orderdate_DESC
    ) {
      id
      username
      useremail
      orderdate
      items
      subtotal
      gst
      deliveryfee
      total
      paymentmode
      statue
      address
    }
  }
`;


const GET_ORDERS_BY_EMAIL = gql`
  query GetOrdersByEmail($email: String!) {
    orders(where: { useremail: $email }, orderBy: orderdate_DESC) {
      id
      username
      useremail
      orderdate
      items
      subtotal
      gst
      deliveryfee
      total
      paymentmode
      statue
      address
    }
  }
`;


const UPDATE_ORDER = gql`
  mutation UpdateOrder(
    $id: ID!,
    $username: String,
    $useremail: String,
    $address: String,
    $statue: String,
    $paymentmode: String,
    $subtotal: Float,
    $gst: Float,
    $deliveryfee: Float,
    $total: Float
  ) {
    updateOrder(
      where: { id: $id }
      data: {
        username: $username
        useremail: $useremail
        address: $address
        statue: $statue
        paymentmode: $paymentmode
        subtotal: $subtotal
        gst: $gst
        deliveryfee: $deliveryfee
        total: $total
      }
    ) {
      id
      username
      useremail
      orderdate
      items
      subtotal
      gst
      deliveryfee
      total
      paymentmode
      statue
      address
    }
  }
`;


const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(where: { id: $id }) {
      id
    }
  }
`;


const PUBLISH_ORDER = gql`
  mutation PublishOrder($id: ID!) {
    publishOrder(where: { id: $id }) {
      id
    }
  }
`;


const GET_ORDER_STATS = gql`
  query GetOrderStats {
    orders {
      id
      total
      statue
      orderdate
    }
  }
`;


const SEARCH_ORDERS = gql`
  query SearchOrders($searchTerm: String!) {
    orders(
      where: {
        OR: [
          { username_contains: $searchTerm }
          { useremail_contains: $searchTerm }
          { id_contains: $searchTerm }
        ]
      }
      orderBy: orderdate_DESC
    ) {
      id
      username
      useremail
      orderdate
      items
      subtotal
      gst
      deliveryfee
      total
      paymentmode
      statue
      address
    }
  }
`;


class AdminAPI {
  
  static async getAllOrders() {
    try {
      const data = await makeRequest(GET_ALL_ORDERS);
      return data.orders;
    } catch (error) {
      console.error('Error fetching all orders:', error);
      throw error;
    }
  }

  
  static async getOrdersByStatus(status) {
    try {
      const data = await makeRequest(GET_ORDERS_BY_STATUS, { status });
      return data.orders;
    } catch (error) {
      console.error('Error fetching orders by status:', error);
      throw error;
    }
  }

  
  static async getOrdersByDateRange(startDate, endDate) {
    try {
      const data = await makeRequest(GET_ORDERS_BY_DATE, { 
        startDate: startDate.toISOString(), 
        endDate: endDate.toISOString() 
      });
      return data.orders;
    } catch (error) {
      console.error('Error fetching orders by date range:', error);
      throw error;
    }
  }

  
  static async getOrdersByEmail(email) {
    try {
      const data = await makeRequest(GET_ORDERS_BY_EMAIL, { email });
      return data.orders;
    } catch (error) {
      console.error('Error fetching orders by email:', error);
      throw error;
    }
  }

  
  static async searchOrders(searchTerm) {
    try {
      const data = await makeRequest(SEARCH_ORDERS, { searchTerm });
      return data.orders;
    } catch (error) {
      console.error('Error searching orders:', error);
      throw error;
    }
  }

  
  static async updateOrder(orderId, orderData) {
    try {
      const data = await makeRequest(UPDATE_ORDER, {
        id: orderId,
        ...orderData
      });
      
      
      await this.publishOrder(orderId);
      
      return data.updateOrder;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }

  
  static async deleteOrder(orderId) {
    try {
      const data = await makeRequest(DELETE_ORDER, { id: orderId });
      return data.deleteOrder;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }

  
  static async publishOrder(orderId) {
    try {
      const data = await makeRequest(PUBLISH_ORDER, { id: orderId });
      return data.publishOrder;
    } catch (error) {
      console.error('Error publishing order:', error);
      
      return null;
    }
  }

  
  static async getOrderStats() {
    try {
      const data = await makeRequest(GET_ORDER_STATS);
      const orders = data.orders;
      
      const stats = {
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, order) => sum + (order.total || 0), 0),
        pendingOrders: orders.filter(order => order.statue === 'pending').length,
        completedOrders: orders.filter(order => order.statue === 'completed').length,
        cancelledOrders: orders.filter(order => order.statue === 'cancelled').length,
        processingOrders: orders.filter(order => order.statue === 'processing').length,
        todayOrders: orders.filter(order => {
          const orderDate = new Date(order.orderdate);
          const today = new Date();
          return orderDate.toDateString() === today.toDateString();
        }).length,
        thisWeekOrders: orders.filter(order => {
          const orderDate = new Date(order.orderdate);
          const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          return orderDate >= weekAgo;
        }).length,
        thisMonthOrders: orders.filter(order => {
          const orderDate = new Date(order.orderdate);
          const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
          return orderDate >= monthAgo;
        }).length
      };
      
      return stats;
    } catch (error) {
      console.error('Error fetching order statistics:', error);
      throw error;
    }
  }

  
  static async bulkUpdateOrderStatus(orderIds, newStatus) {
    try {
      const updatePromises = orderIds.map(orderId => 
        this.updateOrder(orderId, { statue: newStatus })
      );
      
      const results = await Promise.all(updatePromises);
      return results;
    } catch (error) {
      console.error('Error bulk updating order status:', error);
      throw error;
    }
  }

  
  static async getRecentOrders(limit = 10) {
    try {
      const RECENT_ORDERS_QUERY = gql`
        query GetRecentOrders($limit: Int!) {
          orders(first: $limit, orderBy: orderdate_DESC) {
            id
            username
            useremail
            orderdate
            items
            subtotal
            gst
            deliveryfee
            total
            paymentmode
            statue
            address
          }
        }
      `;
      
      const data = await makeRequest(RECENT_ORDERS_QUERY, { limit });
      return data.orders;
    } catch (error) {
      console.error('Error fetching recent orders:', error);
      throw error;
    }
  }

  
  static async getOrdersWithFilters(filters = {}) {
    try {
      let whereConditions = {};
      
      
      if (filters.status && filters.status !== 'all') {
        whereConditions.statue = filters.status;
      }
      
      
      if (filters.email) {
        whereConditions.useremail = filters.email;
      }
      
      
      if (filters.startDate) {
        whereConditions.orderdate_gte = filters.startDate;
      }
      if (filters.endDate) {
        whereConditions.orderdate_lte = filters.endDate;
      }
      
      
      if (filters.searchTerm) {
        whereConditions.OR = [
          { username_contains: filters.searchTerm },
          { useremail_contains: filters.searchTerm },
          { id_contains: filters.searchTerm }
        ];
      }
      
      const FILTERED_ORDERS_QUERY = gql`
        query GetFilteredOrders($where: OrderWhereInput!) {
          orders(where: $where, orderBy: orderdate_DESC) {
            id
            username
            useremail
            orderdate
            items
            subtotal
            gst
            deliveryfee
            total
            paymentmode
            statue
            address
          }
        }
      `;
      
      const data = await makeRequest(FILTERED_ORDERS_QUERY, { where: whereConditions });
      return data.orders;
    } catch (error) {
      console.error('Error fetching filtered orders:', error);
      throw error;
    }
  }
}

export default AdminAPI;