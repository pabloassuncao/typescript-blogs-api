import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Category } from '../../entity'
 
export default class CreateCategories implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values([
        {
          id: 1,
          name: 'Inovação',
        },
        {
          id: 2,
          name: 'Escola',
        }
      ])
      .execute()
  }
}