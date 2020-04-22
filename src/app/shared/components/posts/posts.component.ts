import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Post} from '../../interfaces';
import {PostsService} from '../../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post[];
  page = 1;
  // у меня не работает пагинация с 10 (сервер не отвечает), поэтому установил 5
  limit = 5;
  isLoading = false;

  @ViewChild('postsContainer', {static: true}) postsContainer: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    const scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

    if ((scrollHeight - window.scrollY) < (window.innerHeight + (scrollHeight / 100 * 20))) {
      this.loadNewPosts();
    }
  }

  constructor(private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.loadNewPosts();
  }

  // проверка на скролл, если посты загрузились при инициализации и скролл не появился - true
  needNewPosts() {
    return this.postsContainer.nativeElement.offsetHeight < window.innerHeight;
  }

  loadNewPosts() {
    if (!this.isLoading) {
      this.isLoading = true;
      this.postsService.getPosts(this.page, this.limit).subscribe(posts => {
        if (this.posts) {
          this.posts = this.posts.concat(posts);
        } else {
          this.posts = posts;
        }

        this.page = this.page + 1;
        this.isLoading = false;
        // загружаем посты ещё если скролла нет
        if (this.needNewPosts()) {
          this.loadNewPosts();
        }
      }, error => {
        this.isLoading = false;
      });
    }
  }

}
