import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/app/models';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-game-tabs',
  templateUrl: './game-tabs.component.html',
  styleUrls: ['./game-tabs.component.scss']
})
export class GameTabsComponent implements OnInit {

  @Input() game!: Game;
  src!: string;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  previewScreenshot = (src: string): void => {
    this.src = src;
    const dialogRef = this.dialog.open(ImagePreviewDialog, {
      data: {
        'src': src
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.src = '';
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-img-preview-dialog',
  template: '<img style="width: 100%;" src={{data.src}}/>'
})
export class ImagePreviewDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
}
