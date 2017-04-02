import { User } from "./User";

export class userPrivate {
    constructor(
        public id: string,
        public name: string,
        public bio: string,
        public location: string,
        public website: string,
        public photopath: string,
        public emailAddress: string,
        public password: string,
        public userRole: string,
        public peopleThatIFollow: User [],
        public peopleThatFollowMe: User []
    ) {

    }    
}