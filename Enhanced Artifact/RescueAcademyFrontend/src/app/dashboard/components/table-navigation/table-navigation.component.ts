/**
 * Setup for Bootstraps Pagination
 *
 * @author Justin Swinney
 * @Date 4/9/2024
 * @version 1.0
 *
 **/

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-table-navigation',
  standalone: true,
  imports: [FormsModule, NgForOf],
  templateUrl: './table-navigation.component.html',
  styleUrl: './table-navigation.component.scss'
})
export class TableNavigationComponent {
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1;
  @Output() pageChanged = new EventEmitter<number>();

  get pages(): number[] {
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.currentPage + 2);
    return Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);
  }

  navigatePage(page: number): void {
    console.log('Navigating to page:', page);
    this.pageChanged.emit(page);
  }
}
