import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPostCategories1644441348131 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: 'PostsCategories',
                columns: [
                    {
                        name: 'postId',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'categoryId',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['postId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'BlogPosts',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        columnNames: ['categoryId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'Categories',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            },
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('PostsCategories');
    }

}
