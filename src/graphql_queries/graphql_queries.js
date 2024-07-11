import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

const getpostquery = gql`
query GetPosts($details: searchQuery) {
    getPosts(details: $details) {
    createdAt
    description
    imagesLink
    postID
    postedBy
    }
}
`
const loginquery = gql`
query Login($details: userLogin) {
    login(details: $details) {
      token
    }
  }
`

export default { loginquery, getpostquery };