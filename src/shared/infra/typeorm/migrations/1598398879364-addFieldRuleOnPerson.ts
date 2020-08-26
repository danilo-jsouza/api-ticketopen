import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addFieldRuleOnPerson1598398879364
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'persons',
      new TableColumn({
        name: 'rule',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('persons', 'rule');
  }
}
