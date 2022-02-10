import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '../../entity'
import argon2 from 'argon2'
 
export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id: 1,
          displayName: 'Lewis Hamilton',
          email: 'lewishamilton@gmail.com',
          password: await argon2.hash('123456', { type: argon2.argon2id }),
          image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
        },
        {
          id: 2,
          displayName: 'Michael Schumacher',
          email: 'MichaelSchumacher@gmail.com',
          password: await argon2.hash('123456', { type: argon2.argon2id }),
          image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
        },
      ])
      .execute()
  }
}