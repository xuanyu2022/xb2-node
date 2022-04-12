import { CommentModel } from './comment.model';
export declare const createComment: (comment: CommentModel) => Promise<import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/OkPacket")[] | import("mysql/lib/protocol/packets/ResultSetHeader")>;
export declare const isReplyComment: (commentId: number) => Promise<boolean>;
