import {Component, Inject, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../../../services/notification.service';
import gql from "graphql-tag";
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-create-alert',
  templateUrl: './create-alert.component.html',
  styleUrls: ['./create-alert.component.scss'],
})
export class CreateAlertComponent implements OnInit {
  severityList = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
  typeList = ['MALWARE', 'VIRUS', 'BASELINE', 'PHISHING', 'DDOS', 'XXS'];

  form: FormGroup;
  isSubmit = false;

  constructor(
    public dialogRef: MatDialogRef<CreateAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    public notifyService: NotificationService,
    private apollo: Apollo,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      alert_id: new FormControl('', [Validators.required]),
      severity: new FormControl('LOW'),
      type: new FormControl('MALWARE'),
      object: new FormControl(''),
      message: new FormControl(''),
      source_log: new FormControl(''),
    });
  }

  closePopup() {
    this.dialogRef.close();
  }

  submitCreateAlert() {
    this.isSubmit = true;
    if (this.form.valid) {
      this.apollo.mutate({
        mutation: gql`
          mutation{
            create_alert(
              alert_id: "${this.form.value.alert_id.trim()}"
              status: "open"
              created: ${Math.floor(new Date().getTime() / 1000)},
              severity: ${this.form.value.severity}
              type: ${this.form.value.type}
              object: "${this.form.value.object}"
              source_log: "${this.form.value.source_log}"
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
          this.notifyService.showSuccess('create alert successfully', 'Create alert');
          this.dialogRef.close();
        },
        (error) => {
          console.error(error);
          this.notifyService.showError('create alert unsuccessfully', 'Create alert');
        }
      );
    }
  }
}
