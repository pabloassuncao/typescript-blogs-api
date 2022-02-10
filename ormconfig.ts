import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/.env' });

export default {
   "type": "mysql",
   "host": process.env.MYSQL_HOST,
   "port": 3306,
   "username": process.env.MYSQL_USER,
   "password": process.env.MYSQL_PASSWORD,
   "database": "blogs_api",
   "synchronize": false,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "seeds": [
      "src/seeding/seeds/**/*.ts"
   ],
   "factories": [
      "src/seeding/factories/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}