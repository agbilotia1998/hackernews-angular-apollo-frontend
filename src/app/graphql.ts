import { Link } from './type';
import gql from 'graphql-tag';

export const ALL_LINKS_QUERY = gql`
  query AllLinks{
    links{
      id
      description
      url
      createdAt
    }
  }
`;

export interface AllLinkQueryResponse {
  allLinks: Link[];
  loading: boolean;
}
