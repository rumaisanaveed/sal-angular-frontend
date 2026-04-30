import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../app/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard-layout.component',
  imports: [SidebarComponent, RouterOutlet, MatSidenavModule, MatIconModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  @ViewChild('drawer') drawer!: MatSidenav;

  isMobile = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver.observe(['(max-width: 768px)']).subscribe((result) => {
      this.isMobile = result.matches;

      if (this.drawer) {
        if (this.isMobile) {
          this.drawer.close();
        } else {
          this.drawer.open();
        }
      }
    });
  }
}
