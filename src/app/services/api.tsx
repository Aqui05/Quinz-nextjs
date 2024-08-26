const BASE_URL = 'http://localhost:5000/api'; // URL de base du backend

// Fonction pour récupérer tous les menus
export async function fetchMenus() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 secondes timeout

  try {
    const response = await fetch(`${BASE_URL}/menus`, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error('Failed to fetch menus');
    }
    return await response.json();
  } catch (error) {
    if (error === 'AbortError') {
      console.error('Request timed out');
      throw new Error('Request timed out');
    }
    console.error('Error fetching menus:', error);
    throw error;
  }
}

export async function fetchMenu(menuId: any) {
  try {
    const response = await fetch(`${BASE_URL}/menu/${menuId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch menu');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
}

// Fonction pour récupérer une commande spécifique
export async function fetchOrder(orderId: any) {
  try {
    const response = await fetch(`${BASE_URL}/orders/${orderId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}

// Fonction pour créer une nouvelle commande
export async function createOrder(orderData: any) {
  try {
    const response = await fetch(`${BASE_URL}/orders/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}
