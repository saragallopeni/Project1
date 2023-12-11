import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  @Output() searchEmitter = new EventEmitter<string>();
  searchTerm: string = '';

  performSearch(): void {
    if (this.searchTerm.trim() !== '') {
      this.searchEmitter.emit(this.searchTerm.trim());
    }
  }}