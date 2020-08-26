import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import Person from '@modules/persons/infra/typeorm/entities/Person';
import { admin } from '../seeds/admin';

export default class insertSeed1598399224017 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminRepo = getRepository(Person);
    adminRepo.save(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
