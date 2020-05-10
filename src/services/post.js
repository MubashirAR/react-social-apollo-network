import gql from 'graphql-tag';

const CREATE_POST_MUTATION = gql`
  mutation addPost($text: String, $postType: String, $originalPostId: Int) {
    addPost(text: $text, postType: $postType, OriginalPostId: $originalPostId) {
      text
      CreatedById
      postType
      OriginalPostId
      isActive
    }
  }
`;
export {
  CREATE_POST_MUTATION
}