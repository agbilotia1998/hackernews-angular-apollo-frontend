import {NgModule} from '@angular/core';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {GC_AUTH_TOKEN} from "./constants";
import {ApolloLink} from 'apollo-link';

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})

export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const uri = 'http://localhost:4000';
    const http = httpLink.create({ uri });
    const middleware = new ApolloLink((operation, forward) => {
      const token = localStorage.getItem(GC_AUTH_TOKEN);
      if (token) {
        operation.setContext({
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
        });
      }
      return forward(operation);
    });

    apollo.create({
      link: middleware.concat(http),
      cache: new InMemoryCache()
    });
  }
}
