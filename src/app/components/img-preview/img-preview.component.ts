import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-img-preview',
  templateUrl: './img-preview.component.html',
  styleUrls: ['./img-preview.component.scss']
})
export class ImgPreviewComponent implements OnInit {

  @Input() src!: string;

  constructor() { }

  ngOnInit = (): void => {
  }
}
