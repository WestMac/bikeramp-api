export class TripModel {
    constructor(
        public distance: number,
        public start: string,
        public destination: string,
        public price: number,
        public createdAt: Date
    ) {}
}