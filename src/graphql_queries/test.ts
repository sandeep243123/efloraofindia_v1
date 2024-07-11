import * as gql from 'gql-query-builder';
type NonEmptyArray<T> = [T, ...T[]];
type MyKeys = 'login' | 'getPosts'
interface QueryParams {
    login : {
        details : {
            usermail : NonEmptyArray<string>,  
            password : string
        }
    }, 
    getPosts : {
        details? : {
            showMyPosts : boolean,
            searchText : string
        }
    }
}
// credits goes to https://stackoverflow.com/a/50375286
// function intersection producec - functin overloads
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;
type IsNever<T> = [T] extends [UnionToIntersection<T>] ? true : false;

type Values<T> = T[keyof T]

/**
 * Generate all possible combinations of allowed arguments
 */
type AllOverloads<Mappings, Keys extends string> = {
    [Prop in Keys]:
    Prop extends keyof Mappings
    ? (key: Prop, data: Mappings[Prop]) => any
    : (key: Prop) => any
}

/**
 * Convert all allowed combinations to function overload
 */
type Overloading<Mappings, Keys extends string> =
    keyof Mappings extends Keys
    ? UnionToIntersection<Values<AllOverloads<Mappings, Keys>>>
    : never


const myCoolGeneric: Overloading<QueryParams, MyKeys> = (
    key: string,
    data?: unknown
) => null as any


const queryToType = {
    login : "userLogin"
}

function queryBuilder<T extends MyKeys>(key: T, data: QueryParams[T]): any {
    // Your function logic here
    return gql.query({
        operation : key, 
        variables : data
    })
}

export {queryBuilder};