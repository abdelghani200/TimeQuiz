import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 5;
  @Input() totalItems: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  get isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }

  onPageChange(pageNumber: number): void {
    this.pageChange.emit(pageNumber);
  }
  
  getPagesArray(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
}

}
