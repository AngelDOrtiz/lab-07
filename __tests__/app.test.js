import app from '../lib/app.js';
import supertest from 'supertest';
import client from '../lib/client.js';
import { execSync } from 'child_process';

const request = supertest(app);

describe('API Routes', () => {

  beforeAll(() => {
    execSync('npm run recreate-tables');
  });

  afterAll(async () => {
    return client.end();
  });
  // id: expect.any(Number),
  let pet1 = {
    id: 1,
    name: 'Felix',
    type: 'Snake',
    url: 'cats/felix.png',
    owner: 'John',
    lives: 3,
    isSidekick: false
  };

  let pets = [
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
  
  let pet2 =  {
    id: 10,
    name: 'Hobbs',
    type: 'Tiger',
    url: 'cats/hobbs.jpeg',
    owner: 'Calvin',
    lives: 6,
    isSidekick: true
  };
  let allPets = [
    {
      id: 1,
      name: 'Hobbs',
      type: 'Tiger',
      url: 'cats/hobbs.jpeg',
      owner: 'Calvin',
      lives: 6,
      isSidekick: true
    },
    {
      id: 2,
      name: 'Hobbs',
      type: 'Tiger',
      url: 'cats/hobbs.jpeg',
      owner: 'Calvin',
      lives: 6,
      isSidekick: true
    },
    {
      id: 3,
      name: 'Hobbs',
      type: 'Tiger',
      url: 'cats/hobbs.jpeg',
      owner: 'Calvin',
      lives: 6,
      isSidekick: true
    },
    {
      id: 4,
      name: 'Felix',
      type: 'Snake',
      url: 'cats/felix.png',
      owner: 'John',
      lives: 3,
      isSidekick: false
    },
    {
      id: 5,
      name: 'Felix',
      type: 'Snake',
      url: 'cats/felix.png',
      owner: 'John',
      lives: 3,
      isSidekick: false
    }
  ];
  // If a GET request is made to /api/cats, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data?
  // it('GET /api/pets', async () => {
  //   // act - make the request
  //   const newPets = await request.post('/api/pets').send(allPets);
  //   allPets = newPets.body;
  //   console.log(allPets);
  //   const response = await request.get('/api/pets');
  //   // console.log(response.body, 'body');
  //   // was response OK (200)?
  //   expect(response.status).toBe(200);

  //   // did it return the data we expected?
  //   expect(response.body).toEqual(expect.arrayContaining([allPets]));

  // });

  // If a GET request is made to /api/pets/:id, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data for the cat with that id?
  test('GET /api/pets/:id', async () => {
    console.log(pet1, 'pet1');
    const data = await request.post('/api/pets')
      .send(pet1);
    console.log(data.body, 'data');
    const response = await request.get('/api/pets/1'); console.log(response.body, 'body');
    // expect(response.status).toBe(500);
    expect(response.body).toEqual(pet1);
  });
  it('test postroute', async () => {
    const response = await request.post('/api/pets')
      .send(pet1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(pet1);
    pet1 = response.body;
  });

  it.skip('test put route', async () => { console.log(pet2);
    pet2.owner = 'Al Gore';
    const response = await request.put(`/api/pets/${pet2.id}`)
      .send(pet2);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(pet2); console.log(response.body);
  });

  it('test delete route', async () => {
    const response = await request.delete(`/api/pets/${pet1.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(pet1);
    
  });

  it.skip('GET /api/pets', async () => {
    // act - make the request
    const newPets = await request.post('/api/pets').send(allPets);
    allPets = newPets.body;
    console.log(allPets);
    const response = await request.get('/api/pets');
    // console.log(response.body, 'body');
    // was response OK (200)?
    expect(response.status).toBe(200);

    // did it return the data we expected?
    expect(response.body).toEqual(expect.arrayContaining([allPets]));

  });

});

describe.skip('test get route', () => {
  beforeAll(() => {
    execSync('npm run recreate-tables');
  });

  afterAll(async () => {
    return client.end();
  });
  let pets = [
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

  it('GET /api/pets', async () => {
    // act - make the request
    const newPets = await request.post('/api/pets').send(pets);
    pets = newPets.body;
    // console.log(pet2);
    const response = await request.get('/api/pets');
    // console.log(response.body, 'body');
    // was response OK (200)?
    expect(response.status).toBe(500);

    // did it return the data we expected?
    expect(response.body).toEqual(newPets);

  });

});