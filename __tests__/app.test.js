import app from '../lib/app.js';
import supertest from 'supertest';
import client from '../lib/client.js';
import { execSync } from 'child_process';

const request = supertest(app);

describe('API Routes', () => {

  beforeAll(() => {
    execSync('npm run setup-db');
  });

  afterAll(async () => {
    return client.end();
  });
  // id: expect.any(Number),
  const pets = [
    {
      id: expect.any(Number),
      name: 'Felix',
      type: 'Snake',
      url: 'cats/felix.png',
      owner: 'John',
      lives: 3,
      isSidekick: false
    },
    {
      id: expect.any(Number),
      name: 'Garfield',
      type: 'Orange Hamster',
      url: 'cats/garfield.jpeg',
      owner: '',
      lives: 7,
      isSidekick: false
    },
    {
      id: expect.any(Number),
      name: 'Duchess',
      type: 'Bird',
      url: 'cats/duchess.jpeg',
      owner: '',
      lives: 9,
      isSidekick: false
    },
    {
      id: expect.any(Number),
      name: 'Stimpy',
      type: 'Rat',
      url: 'cats/stimpy.jpeg',
      owner: '',
      lives: 1,
      isSidekick: true
    },
    {
      id: expect.any(Number),
      name: 'Sylvester',
      type: 'Mouse',
      url: 'cats/sylvester.jpeg',
      owner: '',
      lives: 1,
      isSidekick: true
    },
    {
      id: expect.any(Number),
      name: 'Tigger',
      type: 'Tiger',
      url: 'cats/tigger.jpeg',
      owner: '',
      lives: 8,
      isSidekick: false
    },
    {
      id: expect.any(Number),
      name: 'Hello Kitty',
      type: 'Cat',
      url: 'cats/hello-kitty.jpeg',
      owner: '',
      lives: 9,
      isSidekick: false
    },
    {
      id: expect.any(Number),
      name: 'Hobbs',
      type: 'Tiger',
      url: 'cats/hobbs.jpeg',
      owner: 'Calvin',
      lives: 6,
      isSidekick: true
    }
  ];
  

  // If a GET request is made to /api/cats, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data?
  it('GET /api/pets', async () => {
    // act - make the request
    const response = await request.get('/api/pets');

    // was response OK (200)?
    expect(response.status).toBe(200);

    // did it return the data we expected?
    expect(response.body).toEqual(pets);

  });

  // If a GET request is made to /api/pets/:id, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data for the cat with that id?
  test('GET /api/pets/:id', async () => {
    const response = await request.get('/api/pets/2');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(pets[1]);
  });
});