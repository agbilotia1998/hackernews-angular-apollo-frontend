import {Subscription} from "apollo-client/util/Observable";
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Link} from '../type';
import {timeDifferenceForDate} from '../util';
import {ALL_LINKS_QUERY, CREATE_VOTE_MUTATION} from '../graphql';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.css']
})

export class LinkItemComponent implements OnInit, OnDestroy {
  @Input()
  link: Link;

  @Input()
  index: number = 0;

  @Input()
  pageNumber: number = 0;

  @Input()
  isAuthenticated: boolean = false;

  //linksPerPage = LINKS_PER_PAGE;
  subscriptions: Subscription[] = [];

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
  }

  voteForLink() {
    const linkId = this.link.id;

    const mutationSubscription = this.apollo.mutate({
      mutation: CREATE_VOTE_MUTATION,
      variables: {
        linkId
      },
      update: (store, { data: { vote } }) => {
        this.updateStoreAfterVote(store, vote, linkId);
      }
    })
      .subscribe();

    this.subscriptions = [...this.subscriptions, mutationSubscription];
  }

  updateStoreAfterVote (store, createVote, linkId) {
    const data = store.readQuery({
      query: ALL_LINKS_QUERY
    });

    const votedLink = data.links.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    store.writeQuery({ query: ALL_LINKS_QUERY, data })
  }

  humanizeDate(date: string) {
    return timeDifferenceForDate(date);
  }


  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      if (sub && sub.unsubscribe) {
        sub.unsubscribe();
      }
    }
  }
}
