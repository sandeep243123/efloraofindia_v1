
import {queryBuilder} from './test.js';
import { gql, useLazyQuery } from '@apollo/client';

function resolver(queryBuilderResponse){
    return new Promise((accept, reject) => {
        const [queryHandler] = useLazyQuery(gql`${queryBuilderResponse.query}`, {
            onCompleted : (data) => {
                accept(data);
            }, 
            variables : queryBuilderResponse.variables,
            onError : (err)  => {
                reject(err)
            }
        });
        queryHandler();
    } 
    
    )

}

export { resolver };
