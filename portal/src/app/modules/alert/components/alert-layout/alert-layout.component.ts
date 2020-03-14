import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-alert-layout',
  templateUrl: './alert-layout.component.html',
  styleUrls: ['./alert-layout.component.scss']
})
export class AlertLayoutComponent implements OnInit {

  data;

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
              {
          alert(alert_id:"alert123"){
            alert_id,
            created
          }
        }`,
    }).valueChanges.subscribe(result => {
      this.data = result.data;
    });
  }
}
