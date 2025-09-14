import {Component, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Project} from '../../../../services/project.service';

@Component({
  selector: 'app-location',
  imports: [],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent implements OnChanges {
  @Input() project: Project = {} as Project;

  private sanitizer = inject(DomSanitizer);
  private _mapUrl: SafeResourceUrl | null = null;
  private _lastAddress = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['project']) {
      this.updateMapUrl();
    }
  }

  private updateMapUrl() {
    const address = [this.project.service_address_line1, this.project.service_city, this.project.service_state].filter(Boolean).join(', ');
    if (address !== this._lastAddress) {
      this._lastAddress = address;
      if (address) {
        const url = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
        this._mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      } else {
        this._mapUrl = null;
      }
    }
  }

  getMapUrl(): SafeResourceUrl | null {
    return this._mapUrl;
  }

  getGoogleMapsUrl(): string {
    const address = [this.project.service_address_line1, this.project.service_city, this.project.service_state].filter(Boolean).join(', ');
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  }
}
