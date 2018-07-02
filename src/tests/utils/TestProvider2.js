import React, { Component } from "react";
import Faker from "faker";
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import { MemoryRouter } from "react-router";
import { SchemaLink } from "apollo-link-schema";
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";
import PropTypes from "prop-types";

// NB: Import schema string instead of the schema executable so we don't
// end up importing server related code to the client
import schemaString from "eq-author-graphql-schema";

import createApolloClient from "apollo/createApolloClient";
import createApolloCache from "apollo/createApolloCache";

// Default mocks
export default class TestProvider extends Component {
  static createSchema = () => makeExecutableSchema({ typeDefs: schemaString });

  static propTypes = {
    /* eslint-disable react/forbid-prop-types */
    storeState: PropTypes.object,
    graphqlMocks: PropTypes.object,
    /* eslint-enable react/forbid-prop-types */
    children: PropTypes.node
  };

  constructor(props) {
    super(props);
    this.schema = makeExecutableSchema({ typeDefs: schemaString });
    this.apolloClient = createApolloClient(
      new SchemaLink({ schema: this.schema }),
      createApolloCache()
    );

    this.addDefaultMocks();
  }

  componentWillMount() {
    const { graphqlMocks } = this.props;
    this.mockGraphql(graphqlMocks);
  }

  componentWillReceiveProps({ graphqlMocks, storeState }) {
    // this.setStoreState(storeState);
    this.mockGraphql(graphqlMocks);
  }

  addDefaultMocks() {
    // addMockFunctionsToSchema({
    //   schema: this.schema,
    //   mocks: {
    //     ID: () => Faker.random.uuid(),
    //     String: () => Faker.lorem.sentence()
    //   }
    // });
  }

  mockGraphql(mocks = {}) {
    addMockFunctionsToSchema({
      schema: this.schema,
      mocks
    });
  }

  // setStoreState(storeState) {
  //   this.store = TestProvider.createStore(storeState);
  // }

  // getStoreState() {
  //   return this.store.getState();
  // }

  // getActions() {
  //   return $testProvider.getStoreState().actionHistory;
  // }

  // getLastAction() {
  //   return this.getActions()[0];
  // }

  render() {
    return (
      <MemoryRouter>
        <Provider store={this.store}>
          <ApolloProvider client={this.apolloClient}>
            {this.props.children}
          </ApolloProvider>
        </Provider>
      </MemoryRouter>
    );
  }
}
