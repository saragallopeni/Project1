import { Component } from '@angular/core';
import { FlickrServiceService } from './service/flickr-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'flickrApi';
  
  photos: any[] = [];
  

  constructor(private flickrService: FlickrServiceService) {}
  


  performSearch(keyword: string): void {
    this.flickrService.searchPhotos(keyword).subscribe((data: any) => {
        if (data && data.items) {
          this.photos = data.items; 
        }
      });
    }


}
     

  
  