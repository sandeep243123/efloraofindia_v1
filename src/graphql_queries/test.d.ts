declare type NonEmptyArray<T> = [T, ...T[]];
declare type MyKeys = 'login' | 'getPosts';
interface QueryParams {
    login: {
        details: {
            usermail: NonEmptyArray<string>;
            password: string;
        };
    };
    getPosts: {
        details?: {
            showMyPosts: boolean;
            searchText: string;
        };
    };
}
declare function queryBuilder<T extends MyKeys>(key: T, data: QueryParams[T]): any;
export default queryBuilder;
