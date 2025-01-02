import { Message, Notification, Order, Product, User } from '@/types';
import { faker } from '@faker-js/faker';

export function generateUser(): User {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'user',
  };
}

export function generateDummyUsers(): User[] {
  return Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: 'user',
  }));
}

export function generateDummyData(): Product[] {
  return Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    quantity: faker.number.int(),
    quantitySold: faker.number.int(),
    colors: [faker.color.rgb()],
    sizes: ['S', 'M', 'L', 'XL'],
    type: faker.commerce.product(),
    category: faker.commerce.department(),
  }));
}

// messages data

export function generateDummyMessages(): Message[] {
  return Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    sender: faker.person.fullName(),
    receiver: faker.person.fullName(),
    message: faker.lorem.sentence(),
    timestamp: faker.date.recent().toISOString(),
  }));
}

//orders data

export function generateDummyOrders(): Order[] {
  return Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    products: generateDummyData(),
    total: faker.number.float(),
    status: 'pending',
    timestamp: faker.date.recent().toISOString(),
  }));
}

// notifications data

export function generateDummyNotifications(): Notification[] {
  return Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    message: faker.lorem.sentence(),
    timestamp: faker.date.recent().toISOString(),
  }));
}
