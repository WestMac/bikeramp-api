import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Trip {
    @PrimaryGeneratedColumn("uuid")
    id:number;

    @Column()
    start: string;

    @Column()
    destination: string;
    
    @Column({ name: 'distance', type: 'decimal', precision: 6, scale: 2})
    distance: number;

    @Column({ name: 'price', type: 'decimal', precision: 6, scale: 2})
    price: number;

    @Column({ type: 'timestamptz' })
    createdAt: Date;
}