export class UserModel {
    constructor(
        public role: string,
        public name: string,
        public email: string,
        public password?: string,
        public uid?: string
    ) { }


   
}