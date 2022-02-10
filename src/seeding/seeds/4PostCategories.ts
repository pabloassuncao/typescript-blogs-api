import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { PostCategories } from '../../entity'
 
export default class CreatePostCategories implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.query(`
      INSERT INTO PostsCategories (postId, categoryId) VALUES
      (1, 1),
      (2, 2);
    `)
  }
}