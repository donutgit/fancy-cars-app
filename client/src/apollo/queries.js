import gql from "graphql-tag";

export const GET_CAR = gql`
  {
    cars {
      id
      mark
      model
      nominations
      votes
      premium
      imageUrl
    }
  }
`;

export const ADD_CAR = gql`
  mutation AddCar(
    $mark: String!
    $model: String!
    $nominations: [String!]!
    $votes: Int!
    $premium: Boolean!
    $imageUrl: String!
  ) {
    addCar(
      mark: $mark
      model: $model
      nominations: $nominations
      votes: $votes
      premium: $premium
      imageUrl: $imageUrl
    ) {
      id
      mark
      model
    }
  }
`;

export const UPDATE_CAR = gql`
  mutation UpdateCar(
    $id: ID!
    $mark: String!
    $model: String!
    $nominations: [String!]!
    $votes: Int!
    $premium: Boolean!
    $imageUrl: String!
  ) {
    updateCar(
      id: $id
      mark: $mark
      model: $model
      nominations: $nominations
      votes: $votes
      premium: $premium
      imageUrl: $imageUrl
    ) {
      id
    }
  }
`;

export const REMOVE_CAR = gql`
  mutation RemoveCar($id: ID!) {
    removeCar(id: $id) {
      id
    }
  }
`;

export const GET_CARS_NOMINATIONS = gql`
  {
    cars {
      id
      mark
      model
      nominations
      imageUrl
      premium
      votes
    }
    nominations {
      id
      name
    }
  }
`;

export const GET_NOMINATIONS = gql`
  {
    nominations {
      id
      name
    }
  }
`;
export const ADD_NOMINATION = gql`
  mutation AddNomination($name: String!) {
    addNomination(name: $name) {
      id
      name
    }
  }
`;
export const UPDATE_NOMINATION = gql`
  mutation UpdateNomination($id: ID!, $name: String!) {
    updateNomination(id: $id, name: $name) {
      id
      name
    }
  }
`;
export const REMOVE_NOMINATION = gql`
  mutation RemoveNomination($id: ID!) {
    removeNomination(id: $id) {
      id
      name
    }
  }
`;

export const GET_VOTES = gql`
  {
    votes {
      id
      name
      email
      phone
    }
  }
`;
export const ADD_VOTE = gql`
  mutation AddVote(
    $name: String!
    $email: String!
    $phone: BigInt!
    $voteResult: JSON!
  ) {
    addVote(
      name: $name
      email: $email
      phone: $phone
      voteResult: $voteResult
    ) {
      id
    }
  }
`;

export const REMOVE_VOTE = gql`
  mutation RemoveVote($id: ID!) {
    removeVote(id: $id) {
      id
    }
  }
`;

export const GET_USERS = gql`
  {
    users {
      id
      name
      surname
      username
      email
      date
    }
  }
`;

export const GET_USER = gql`
   query User($id: String!) {
     user(id: $id) {
       id
       username
       role
     }
   }
`;

export const REMOVE_USER = gql`
  mutation($id: ID!) {
    removeUser(id: $id) {
      id
    }
  }
`;

export const REGISTER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      username
      email
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refToken
      exp
      errors
    }
  }
`;
