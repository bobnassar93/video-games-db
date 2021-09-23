import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() counts: number = 0;
  @Output() onPageChange = new EventEmitter<{ event: PageEvent }>();

  constructor() { }

  ngOnInit(): void {
  }

  onPageChangeEmitter = (event: PageEvent): void => {
    this.onPageChange.emit({ event });
  }

}
