import gql from "graphql-tag";
const ADD_COMMENT_MUTATION = gql`
  mutation($text: String!, $commentById: Int!, $commentedOn: String!, $originalCommentId: Int, $originalPostId: Int){
    addComment(text:$text, CommentById:$commentById, commentedOn: $commentedOn, OriginalCommentId: $originalCommentId, OriginalPostId: $originalPostId) {
      id
      isActive
      text
      CommentedOn
    }
  }
`
export {
  ADD_COMMENT_MUTATION
}