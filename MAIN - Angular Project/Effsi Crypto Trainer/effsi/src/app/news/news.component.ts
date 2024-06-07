import { Component, OnInit, Renderer2 } from '@angular/core';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  error!: string|undefined;

  load: boolean = true;
  esc: boolean = false;

  news: any = {};

  constructor(private svc: NewsService, private ren: Renderer2){}

  ngOnInit(): void {
    this.searchNews()
  }

  searchNews(){
    this.svc.searchNews().subscribe(
      (data) => {
        console.log(data)
        this.error = undefined;
        this.news = data;
        this.load = false;
      },
      (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
      }
    );
  }

  goToArticle(link: any) {
    console.log(link)
    window.open('https://seekingalpha.com' + link, '_blank');
  }

}
