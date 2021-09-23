import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit = (form: NgForm): void => {
    this.router.navigate(['search', form.value.search]); // extract the value of the search input tag using the ngForm syntax, form.value.search --> 'search' is the name of the input that we put ngModel directive in it
  }

}
