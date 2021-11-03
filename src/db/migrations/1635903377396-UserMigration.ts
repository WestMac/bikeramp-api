import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1635903377396 implements MigrationInterface {
    name = 'UserMigration1635903377396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trip" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "distance" numeric(6,2) NOT NULL, "price" numeric(6,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_714c23d558208081dbccb9d9268" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "trip"`);
    }

}
