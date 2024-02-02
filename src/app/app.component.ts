import { Component, HostListener } from '@angular/core';
import { FlickrServiceService } from './service/flickr-service.service';

export interface Photo {
  title: string;
  id: string;
  media: {
    m: string;
  };
  author: {
    name: string;
    uri: string;
  };
  published: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flickrApi';
  photos: Photo[] = [];
  page: number = 1;
  currentKeyword: string = '';  

  constructor(private flickrService: FlickrServiceService) {}

  performSearch(keyword: string): void {
    this.currentKeyword = keyword;
    this.flickrService.searchPhotos(keyword, this.page).subscribe((data: any) => {
      console.log('Te dhenat', data);
      if (data && data.items) {
        const newPhotos: Photo[] = data.items.map((item: any) => {
          const resolution = this.getResolution(item);
          return {
            title: item.title,
            id: item.id,
            media: item.media,
            author: item.author,
            published: item.published,
            resolution: resolution,
          } as Photo;
        });
  
        this.photos = this.photos.concat(newPhotos);
        this.page++;
      }
    });
  }
  
  getResolution(photo: Photo): string {
    if (photo.media && photo.media.m) {
      const img = new Image();
      img.src = photo.media.m;

      const resolution = `${img.width}x${img.height}`;
      return resolution;
    } else {
      return 'Jo e qasshme';
    }
  }
  
 @HostListener('window:scroll')
onScroll() {
  const scrollPosition = window.innerHeight + window.scrollY;
  const bodyHeight = document.body.offsetHeight;

  if (scrollPosition >= bodyHeight - 500) {
    this.performSearch(this.currentKeyword); 
  }
}

}
