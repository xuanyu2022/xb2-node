import { UserModel } from './user.model';
export declare const createUser: (user: UserModel) => Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
interface GetUserOptions {
    password?: boolean;
}
export declare const getUserByName: (name: string, options?: GetUserOptions) => Promise<any>;
export {};
