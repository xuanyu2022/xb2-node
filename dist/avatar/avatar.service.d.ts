import { AvatarModel } from './avatar.model';
export declare const createAvatar: (avatar: AvatarModel) => Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
export declare const findAvatarByUserId: (userId: number) => Promise<any>;
