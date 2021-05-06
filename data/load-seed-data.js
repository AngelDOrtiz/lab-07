/* eslint-disable no-console */
import client from '../lib/client.js';
// import our seed data:
import pets from './pets.js';

run();

async function run() {

  try {

    await Promise.all(
      pets.map(pet => {
        return client.query(`
          INSERT INTO pets (name, type, url, owner, lives, is_sidekick)
          VALUES ($1, $2, $3, $4, $5, $6);
        `,
        [pet.name, pet.type, pet.url, pet.owner, pet.lives, pet.isSidekick]);
      })
    );
    

    console.log('seed data load complete');
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}