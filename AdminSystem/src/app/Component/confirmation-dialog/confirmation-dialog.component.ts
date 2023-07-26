import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
  <div class="show">
  <h1 mat-dialog-title>Confirmation</h1>
  <div mat-dialog-content>
    {{ data }}
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">No</button>
    <button mat-button color="primary" [mat-dialog-close]="true">Yes</button>
  </div>
</div>
`,
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
