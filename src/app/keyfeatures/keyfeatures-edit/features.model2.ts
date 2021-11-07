export class ApplicationFeature {
    constructor(
        public title: string,
        public heading: string,
        public subject: string,
        public description: string,
        public featureType: string,
        public expectedRelease: string,
        public titleColor: string,
        public id?: string,
        public editMode?: boolean) { }
}