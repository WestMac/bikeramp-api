import {MigrationInterface, QueryRunner} from "typeorm";

export class TripMigration1636328830087 implements MigrationInterface {
    name = 'TripMigration1636328830087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trip" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start" character varying NOT NULL, "destination" character varying NOT NULL, "distance" numeric(6,2) NOT NULL, "price" numeric(6,2) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_714c23d558208081dbccb9d9268" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "trip"`);
    }

}
