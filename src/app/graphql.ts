import { Link, User } from './type';
import gql from 'graphql-tag';

export const ALL_LINKS_QUERY = gql`
  query AllLinks($first: Int, $skip: Int, $orderBy: LinkOrderByInput){
    links(first: $first, skip: $skip, orderBy: $orderBy){
      id
      description
      url
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
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

export const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink{
      id
      url
      description
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

export const CREATE_VOTE_MUTATION = gql`
  mutation CreateVoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

export const ALL_LINKS_SEARCH_QUERY = gql`
  query AllLinksSearchQuery($searchText: String!) {
    links(filter: 
      $searchText
    ) {
      id
      url
      description
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

export interface AllLinksSearchQueryResponse {
  loading: boolean;
  allLinks: Link[];
}

export interface CreateVoteMutationResponse {
  loading: boolean;
  createVote: {
    id: string;
    link: Link;
    user: User;
  };
}

export interface NewLinkSubcriptionResponse {
  newLink: Link;
}

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
