import { GetPostsOptionsPagination, GetPostsOptionsFilter } from '../post/post.service';
import { CommentModel } from './comment.model';
export declare const createComment: (comment: CommentModel) => Promise<import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/OkPacket")[] | import("mysql/lib/protocol/packets/ResultSetHeader")>;
export declare const isReplyComment: (commentId: number) => Promise<boolean>;
export declare const updateComment: (comment: CommentModel) => Promise<import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/OkPacket")[] | import("mysql/lib/protocol/packets/ResultSetHeader")>;
export declare const deleteComment: (commentId: number) => Promise<import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/OkPacket")[] | import("mysql/lib/protocol/packets/ResultSetHeader")>;
interface getCommentsOptions {
    filter?: GetPostsOptionsFilter;
    pagination?: GetPostsOptionsPagination;
}
export declare const getComments: (options: getCommentsOptions) => Promise<import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/OkPacket")[] | import("mysql/lib/protocol/packets/ResultSetHeader")>;
export declare const getCommentsTotalCount: (options: getCommentsOptions) => Promise<any>;
export {};
