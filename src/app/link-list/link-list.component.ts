import {Component, OnDestroy, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Link} from '../type';
import {ALL_LINKS_QUERY, AllLinksQueryResponse, NEW_LINKS_SUBSCRIPTION} from '../graphql';
import {AuthService} from "../auth.service";
import {Subscription} from "apollo-client/util/Observable";
import {ApolloQueryResult} from "apollo-client";
// import {Observable} from "apollo-client/util/Observable";
import {switchMap} from "rxjs/internal/operators";
//import 'rxjs/add/operator/switchMap;
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})

export class LinkListComponent implements OnInit {
  public allLinks: Link[] = [];
  public loading: boolean = true;

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.apollo.watchQuery({
      query: ALL_LINKS_QUERY
    }).valueChanges.subscribe(async (response: any) => {
      this.allLinks = await response.data.links;
      this.loading = false;
    });

  }

}
//
// export class LinkListComponent implements OnInit, OnDestroy {
//   allLinks: Link[] = [];
//   loading: boolean = true;
//   logged: boolean = false;
//   subscriptions: Subscription[] = [];
//
//   constructor(private apollo: Apollo, private authService: AuthService) {
//   }
//
//   ngOnInit() {
//
//     this.authService.isAuthenticated
//       //.distinctUntilChanged()
//     .subscribe(isAuthenticated => {
//       this.logged = isAuthenticated
//     });
//
//     // const querySubscription = this.apollo.watchQuery({
//     //   query: ALL_LINKS_QUERY
//     // }).valueChanges.subscribe((response) => {
//     //   this.allLinks = response.data.links;
//     //   this.loading = response.data.loading;
//     // });
//     //
//     // this.subscriptions = [...this.subscriptions, querySubscription];
//
//     // const allLinkQuery: Observable<ApolloQueryResult<AllLinkQueryResponse>> = this.apollo.watchQuery({
//     //   query: ALL_LINKS_QUERY
//     // });
//     const getQuery = (variables): Observable<ApolloQueryResult<AllLinkQueryResponse>> => {
//       const query = this.apollo.watchQuery<AllLinkQueryResponse>({
//         query: ALL_LINKS_QUERY,
//         variables
//       });
//
//       query
//         .subscribeToMore({
//           document: NEW_LINKS_SUBSCRIPTION,
//           updateQuery: (previous: AllLinkQueryResponse, { subscriptionData }) => {
//
//             // Casting to any because typings are not updated
//             const newAllLinks = [
//               (<any>subscriptionData).Link.node,
//               ...previous.allLinks
//             ];
//             return {
//               ...previous,
//               allLinks: newAllLinks
//             }
//           }
//         });
//       return query.valueChanges;
//     };
//
//     const allLinkQuery: Observable<ApolloQueryResult<AllLinkQueryResponse>> = Observable
//       // .combineLatest(first$, skip$, orderBy$, (first, skip, orderBy) => ({ first, skip, orderBy }))
//       .switchMap((variables: any) => getQuery(variables));
//
//     const querySubscription = allLinkQuery.subscribe((response) => {
//       this.allLinks = response.data.links;
//       this.loading = response.data.loading;
//     });
//
//     this.subscriptions = [...this.subscriptions, querySubscription];
//
//   }
//
//   updateStoreAfterVote (store, createVote, linkId) {
//     const data = store.readQuery({
//       query: ALL_LINKS_QUERY
//     });
//     const votedLink = data.allLinks.find(link => link.id === linkId);
//     votedLink.votes = createVote.link.votes;
//
//     store.writeQuery({ query: ALL_LINKS_QUERY, data })
//    }
//
//   ngOnDestroy(): void {
//     for (let sub of this.subscriptions) {
//       if (sub && sub.unsubscribe) {
//         sub.unsubscribe();
//       }
//     }
//   }
// }
