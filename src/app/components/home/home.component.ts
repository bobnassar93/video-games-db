import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game, APIResponse } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public sort!: string;
  public games!: Array<Game>;
  private routeSub!: Subscription;
  private gameSub!: Subscription;
  public counts!: number;
  private page: number = 1;
  private nextPage!: number;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', this.page, params['game-search']);
      } else {
        this.searchGames('metacrit', this.page);
      }
    });
  }

  searchGames(sort: string, page: number = 1, search?: string): void {
    let _search = search;

    if (this.activatedRoute.snapshot.params['game-search']) {
      _search = this.activatedRoute.snapshot.params['game-search'];
    }
    this.gameSub = this.httpService
      .getGameList(sort, page, _search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        this.counts = gameList.count;
        const urlParams = new URLSearchParams(gameList.next);
        this.nextPage = +urlParams.get('page')! || 1;
      });
  }

  getNextPage = (): void => {

    const search = this.activatedRoute.snapshot.params['game-search'];

    this.gameSub = this.httpService
      .getGameList(this.sort, this.nextPage, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        this.counts = gameList.count;
        const urlParams = new URLSearchParams(gameList.next);
        this.nextPage = +urlParams.get('page')! || 1;
      });
  }

  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
