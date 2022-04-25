import { UserModel } from './user.model';
export declare const createUser: (user: UserModel) => Promise<import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/OkPacket")[] | import("mysql/lib/protocol/packets/ResultSetHeader")>;
interface GetUserOptions {
    password?: boolean;
}
export declare const getUser: (condition: string) => (param: string | number, options?: GetUserOptions) => Promise<any>;
export declare const getUserByName: (param: string | number, options?: GetUserOptions) => Promise<any>;
export declare const getUserById: (param: string | number, options?: GetUserOptions) => Promise<any>;
export {};
