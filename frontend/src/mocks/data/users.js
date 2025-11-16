export const users = [
  {
    id: 'user-1',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex@example.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=200&h=200',
    address: {
      line1: '123 Market Street',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'USA',
    },
  },
  {
    id: 'user-2',
    firstName: 'Priya',
    lastName: 'Patel',
    email: 'priya@example.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=200&h=200',
    address: {
      line1: '678 Ocean Avenue',
      city: 'Miami',
      state: 'FL',
      postalCode: '33101',
      country: 'USA',
    },
  },
  {
    id: 'admin-1',
    firstName: 'Jordan',
    lastName: 'Lee',
    email: 'admin@codecraftecom.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=facearea&w=200&h=200',
  },
];

export const getUserById = (id) => users.find((user) => user.id === id);






