export interface Category {
  id: string;
  value: string;
  label: string;
  description?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  description?: string;
  available: boolean;
}

export const defaultCategories: Category[] = [
  { id: '1', value: 'breakfast', label: 'Breakfast' },
  { id: '2', value: 'lunch', label: 'Lunch' },
  { id: '3', value: 'dinner', label: 'Dinner' },
  { id: '4', value: 'drinks', label: 'Drinks' },
  { id: '5', value: 'desserts', label: 'Desserts' },
];

export const initialMenuItems: MenuItem[] = [
  // Breakfast
  { id: '1', name: 'Avocado Toast', price: 650, categoryId: '1', available: true },
  { id: '2', name: 'Eggs Benedict', price: 850, categoryId: '1', available: true },
  { id: '3', name: 'French Toast', price: 720, categoryId: '1', available: true },
  { id: '4', name: 'Granola Bowl', price: 580, categoryId: '1', available: true },
  { id: '5', name: 'Smoked Salmon Bagel', price: 950, categoryId: '1', available: false },
  
  // Lunch
  { id: '6', name: 'Caesar Salad', price: 780, categoryId: '2', available: true },
  { id: '7', name: 'Grilled Chicken Sandwich', price: 920, categoryId: '2', available: true },
  { id: '8', name: 'Soup of the Day', price: 520, categoryId: '2', available: true },
  { id: '9', name: 'Quinoa Bowl', price: 880, categoryId: '2', available: true },
  
  // Dinner
  { id: '10', name: 'Grilled Salmon', price: 1850, categoryId: '3', available: true },
  { id: '11', name: 'Filet Mignon', price: 2450, categoryId: '3', available: true },
  { id: '12', name: 'Mushroom Risotto', price: 1380, categoryId: '3', available: true },
  { id: '13', name: 'Roasted Chicken', price: 1520, categoryId: '3', available: true },
  
  // Drinks
  { id: '14', name: 'Espresso', price: 500, categoryId: '4', available: true },
  { id: '15', name: 'Cappuccino', price: 550, categoryId: '4', available: true },
  { id: '16', name: 'Fresh Orange Juice', price: 650, categoryId: '4', available: true },
  { id: '17', name: 'House Wine (Glass)', price: 900, categoryId: '4', available: true },
  
  // Desserts
  { id: '18', name: 'Tiramisu', price: 620, categoryId: '5', available: true },
  { id: '19', name: 'Chocolate Fondant', price: 720, categoryId: '5', available: true },
  { id: '20', name: 'Crème Brûlée', price: 580, categoryId: '5', available: true },
];

export const formatPrice = (price: number): string => {
  return `${price.toFixed(0)} ETB`;
};
