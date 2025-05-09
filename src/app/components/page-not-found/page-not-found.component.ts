import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [HlmButtonDirective],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {
  constructor(private _location: Location) {}

  backToPreviousPage() {
    this._location.back();
  }
}
