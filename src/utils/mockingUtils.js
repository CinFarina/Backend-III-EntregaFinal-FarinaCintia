import { faker } from '@faker-js/faker';

// Generar usuarios falsos
export const generateMockUsers = (numUsers = 5) => {
  const users = [];

  for (let i = 0; i < numUsers; i++) {
    users.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: faker.helpers.arrayElement(['user', 'admin']),
      pets: []
    });
  }

  return users;
};

// Generar mascotas falsas
export const generateMockPets = (numPets = 10) => {
  const pets = [];

  for (let i = 0; i < numPets; i++) {
    pets.push({
      name: faker.person.firstName(),
      species: faker.animal.type ? faker.animal.type() : faker.word.noun(),
      adopted: faker.datatype.boolean()
    });
  }

  return pets;
};

// Función general para generar datos
export const generateMockData = (numUsers = 5, numPets = 10) => {
  try {
    const users = generateMockUsers(numUsers);
    const pets = generateMockPets(numPets);

    return { users, pets };
  } catch (error) {
    console.error('❌ Error generando datos falsos:', error.message);
    throw new Error('Error generando datos');
  }
};