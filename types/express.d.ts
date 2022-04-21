
import { TokenPayload } from '../src/auth/auth.interface';
import { GetPostOptionFilter, GetPostOptionsPagination } from '../src/post/post.service';

declare global{
  namespace Express{
    export interface Request{
      user: TokenPayload;
      fileMetaData:{
        width?: number;
        height?: number;
        metadata?:{};
        };
      sort:string;
      filter:GetPostOptionFilter;
      pagination:GetPostOptionsPagination;
    }
  }
}










