import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createBlogPost1644437982767 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: 'BlogPosts',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'content',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'userId',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'published',
                        type: 'datetime',
                        isNullable: false,
                    },
                    {
                        name: 'updated',
                        type: 'datetime',
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['userId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'Users',
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE',
                    },
                ],
            }
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('BlogPosts');
    }

}
