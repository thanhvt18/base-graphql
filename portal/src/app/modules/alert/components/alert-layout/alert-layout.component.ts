import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

export interface AlertElement {
  'alert_id'?: string;
  'severity'?: string;
  'created'?: number;
  'object'?: string;
  'type'?: string;
  'status'?: string;
  'message'?: string;
  'linked_case'?: any;
  'source_log'?: string;
  'category'?: string;
  'source'?: string;
}


@Component({
  selector: 'app-alert-layout',
  templateUrl: './alert-layout.component.html',
  styleUrls: ['./alert-layout.component.scss']
})
export class AlertLayoutComponent implements OnInit {
  columnsRender = [
    'alert_id',
    'severity',
    'created',
    'object',
    'type',
    'status',
    'message',
    'linked_case',
    'source_log',
    'category',
    'source',
    'reason_close'];
  displayedColumns: string[] = [
    'select',
    ...this.columnsRender
  ];

  columnsDisplaySpecial = ['created', 'linked_case'];
  dataSource = new MatTableDataSource<AlertElement>([]);
  selection = new SelectionModel<AlertElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: AlertElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.alert_id + 1}`;
  }

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.getAllAlert();
  }

  getAllAlert() {
    this.apollo.watchQuery({
      query: gql`
        {
          alerts{
            alert_id,
            severity,
            created,
            object,
            type,
            status,
            message,
            linked_case {
              case_id
            },
            source_log,
            category,
            source,
            reason_close
          }
        }`,
    }).valueChanges.subscribe(result => {
      this.selection.clear();
      console.log('result', result);
      this.dataSource.data = result.data['alerts'] as AlertElement[];
    });
  }

  setFalsePositive() {
    const alerts = this.selection.selected;
    if (alerts.length > 0) {
      const alertids = alerts.map(alert => alert.alert_id).join(',');
      this.apollo.mutate({
        mutation: gql`
          mutation{
            update_alerts(
              alert_ids: "${alertids}",
              status: "close"
              reason_close: "set false positive"
            ){
              alert_id,
              severity,
              created,
              object,
              type,
              status,
              message,
              linked_case {
                case_id
              },
              source_log,
              category,
              source,
              reason_close
            }
          }
        `
      }).subscribe(
        ({data}) => {
          console.log('success', data);
          const updateAlerts = data['update_alerts'] || [];
          const alertIds = this.dataSource.data.map(alert => alert.alert_id);
          for (let pos = 0, length = updateAlerts.length; pos < length; pos++) {
            const alert = updateAlerts[pos];
            if (alertIds.includes(alert.alert_id)) {
              this.dataSource.data[alertIds.indexOf(alert.alert_id)] = alert;
            }
          }
          this.dataSource.data = JSON.parse(JSON.stringify(this.dataSource.data));
        },
        (error) => {
          console.error(error);
          this.selection.clear();
        }
      );
    }
  }
}
