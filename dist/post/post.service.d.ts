import { TokenPayload } from '../auth/auth.interface';
import { PostModel } from './post.model';
export interface GetPostsOptionsFilter {
    name: string;
    sql?: string;
    param?: string;
}
export interface GetPostsOptionsPagination {
    limit: number;
    offset: number;
}
interface GetPostOptions {
    sort?: string;
    filter?: GetPostsOptionsFilter;
    pagination?: GetPostsOptionsPagination;
    currentUser?: TokenPayload;
}
export declare const getPosts: (options: GetPostOptions) => Promise<import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/OkPacket")[] | import("mysql/lib/protocol/packets/ResultSetHeader")>;
export declare const createPost: (post: PostModel) => Promise<import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/OkPacket")[] | import("mysql/lib/protocol/packets/ResultSetHeader")>;
export declare const updatePost: (postId: number, post: PostModel) => Promise<import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/OkPacket")[] | import("mysql/lib/protocol/packets/ResultSetHeader")>;
export declare const deletePost: (postId: number) => Promise<import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/OkPacket")[] | import("mysql/lib/protocol/packets/ResultSetHeader")>;
export declare const createPostTag: (postId: number, tagId: number) => Promise<import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/OkPacket")[] | import("mysql/lib/protocol/packets/ResultSetHeader")>;
export declare const postHasTag: (postId: number, tagId: number) => Promise<boolean>;
export declare const deletePostTag: (postId: number, tagId: number) => Promise<import("mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql/lib/protocol/packets/OkPacket") | import("mysql/lib/protocol/packets/OkPacket")[] | import("mysql/lib/protocol/packets/ResultSetHeader")>;
export declare const getPostsTotalCount: (options: GetPostOptions) => Promise<any>;
export interface GetPostByIdOptions {
    currentUser?: TokenPayload;
}
export declare const getPostById: (postId: number, options?: GetPostByIdOptions) => Promise<any>;
export {};
