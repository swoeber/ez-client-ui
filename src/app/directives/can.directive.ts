// directives/can.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core';
import { UserStore } from '../store/user.store';

type Mode = 'all' | 'any';

@Directive({ selector: '[can]', standalone: true })
export class CanDirective {
  private list: string[] = [];
  private mode: Mode = 'all';
  private readonly store = inject(UserStore);

  constructor(private tpl: TemplateRef<unknown>, private vcr: ViewContainerRef) {
    effect(() => this.render()); // re-evaluate when permissions change
  }

  @Input({ alias: 'can' }) set can(value: string | string[]) {
    this.list = Array.isArray(value) ? value : [value];
    this.render();
  }
  @Input() set canAny(_: boolean) {
    this.mode = 'any';
    this.render();
  }
  @Input() set canAll(_: boolean) {
    this.mode = 'all';
    this.render();
  }

  private render() {
    let ok = false;
    
    if (this.store.anyOf(['admin'])) {
      ok = true;
    } else {
      ok = this.mode === 'any' ? this.store.anyOf(this.list) : this.store.allOf(this.list);
    }

    this.vcr.clear();
    if (ok) this.vcr.createEmbeddedView(this.tpl);
  }
}
