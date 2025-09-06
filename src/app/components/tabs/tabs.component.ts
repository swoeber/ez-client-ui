import {Component, Input, ContentChildren, QueryList, AfterContentInit, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-tab',
  template: '<ng-content></ng-content>'
})
export class TabComponent {
  @Input() label!: string;

  constructor(public elementRef: ElementRef) {
  }
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  selectedIndex = 0;

  ngAfterContentInit() {
    this.updateTabVisibility();
  }

  selectTab(index: number) {
    this.selectedIndex = index;
    this.updateTabVisibility();
  }

  private updateTabVisibility() {
    this.tabs.forEach((tab, i) => {
      tab.elementRef.nativeElement.style.display = i === this.selectedIndex ? 'block' : 'none';
    });
  }
}
