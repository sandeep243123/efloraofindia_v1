import * as gql from 'gql-query-builder';
const myCoolGeneric = (key, data) => null;
const queryToType = {
    login: "userLogin"
};
function queryBuilder(key, data) {
    // Your function logic here
    return gql.query({
        operation: key,
        variables: data
    });
}
export { queryBuilder };
