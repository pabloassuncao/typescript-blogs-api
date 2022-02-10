import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { BlogPost } from '../../entity'
 
export default class CreateBlogPosts implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.createQueryBuilder()
    .insert()
    .into(BlogPost)
    .values([
      {
        id: 1,
        title: 'Post do Ano',
        content: 'Melhor post do ano',
        userId: 1,
        published: new Date('2011-08-01T19:58:00.000Z'),
        updated: new Date('2011-08-01T19:58:51.000Z'),
      },
      {
        id: 2,
        title: 'Vamos que vamos',
        content: 'Foguete não tem ré',
        userId: 1,
        published: new Date('2011-08-01T19:58:00.000Z'),
        updated: new Date('2011-08-01T19:58:51.000Z'),
      },
    ])
    .execute();
    
    
    
    
    
    // .query(`
    //   INSERT INTO BlogPosts (id, title, content, userId, published, updated) VALUES
    //   (1,'Post do Ano','Melhor post do ano',1,now(),now()),
    //   (2,'Vamos que vamos','Foguete não tem ré',1,now(),now());
    //   `) 
  }
}