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
  let felix = {
    id: expect.any(Number),
    name: 'Felix',
    type: 'Tuxedo',
    url: 'cats/felix.png',
    year: 1892,
    lives: 3,
    isSidekick: false
  };

  let duchess = {
    id: expect.any(Number),
    name: 'Duchess',
    type: 'Angora',
    url: 'cats/duchess.jpeg',
    year: 1970,
    lives: 9,
    isSidekick: false
  };

  let hobbs = {
    id: expect.any(Number),
    name: 'Hobbs',
    type: 'Orange Tabby',
    url: 'cats/hobbs.jpeg',
    year: 1985,
    lives: 6,
    isSidekick: true
  };



 
  it('test postroute', async () => {
    const response = await request.post('/api/pets')
      .send(pet1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(pet1);
    pet1 = response.body;
  });
 
  
  it('test put route', async () => { 
    

    pet1.owner = 'Al Gore';
    
    const response = await request
      .put(`/api/pets/${pet1.id}`)
      .send(pet1);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(pet1); 
  });

  
  
  it('GET list of pets from /api/pets', async () => {
    const r1 = await request.post('/api/pets').send(duchess);
    duchess = r1.body;
    const r2 = await request.post('/api/pets').send(hobbs);
    hobbs = r2.body;
    const r3 = await request.post('/api/pets').send(felix);
    felix = r3.body;

    const response = await request.get('/api/pets');
    const pets = [felix, duchess, hobbs];
    
    expect(response.status).toBe(200);
    expect(pets.length).toEqual(3);
    expect(pets).toEqual(expect.arrayContaining([felix, duchess, hobbs]));
  });

   
  test('GET /api/pets/:id', async () => {
    console.log(pet1, 'pet1');
    const data = await request.post('/api/pets')
      .send(pet1);
    console.log(data.body, 'data');
    const response = await request.get('/api/pets/1'); console.log(response.body, 'body');
    // expect(response.status).toBe(500);
    expect(response.body).toEqual(pet1);
  });
 



  it('test delete route', async () => {
    const response = await request.delete(`/api/pets/${pet1.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(pet1);
    
  });
});