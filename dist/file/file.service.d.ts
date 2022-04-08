import { FileModel } from './file.model';
export declare const createFile: (file: FileModel) => Promise<import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/ResultSetHeader") | import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket")[]>;
export declare const findFileById: (fileId: number) => Promise<any>;
