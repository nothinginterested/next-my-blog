import {MigrationInterface, QueryRunner} from 'typeorm';
import {Table} from 'typeorm';

export class CreateUsers1598270727632 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {name: 'id', isGenerated: true, type: 'int', generationStrategy: 'increment', isPrimary: true},
                {name: 'username', type: 'varchar'},
                {name: 'passwordDigest', type: 'varchar'},
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('users');
    }

}
