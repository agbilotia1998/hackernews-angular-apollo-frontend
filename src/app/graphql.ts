import { Link, User } from './type';
import gql from 'graphql-tag';

export const ALL_LINKS_QUERY = gql`
  query AllLinks{
    links{
      id
      description
      url
    }
  }
`;

export const CREATE_LINK_MUTATION = gql `
  mutation CreateLinkMutation($description: String!, $url: String!){
    postLink(url: $url, description: $description){
      url
      description
      postedBy{
        id
        email
      }
    }
  }`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
    signup(
      name: $name,
      email: $email,
      password: $password
    ) {
      token
      user {
        id
      }
    }
  }
`;

export const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    login(
      email: $email,
      password: $password
    ) {
      token
      user {
        id
      }
    }
  }
`;

export interface CreateUserMutationResponse {
  loading: boolean;
  createUser: {
    token: string,
    user?: User
  };
}

export interface SignInMutationResponse {
  loading: boolean;
  signinUser: {
    token: string,
    user?: User
  };
}

export interface AllLinkQueryResponse {
  allLinks: Link[];
  loading: boolean;
}

export interface CreateLinkMutationResponse {
  createLink: Link;
  loading: boolean;
}
