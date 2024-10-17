export interface AuthJWT {   
    signIn(user: any, pass: string): Promise<any>;
    findUser(username: string): Promise<any>;
}