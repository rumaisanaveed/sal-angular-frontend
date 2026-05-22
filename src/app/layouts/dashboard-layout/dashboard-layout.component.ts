import { Component, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-layout.component',
  imports: [SidebarComponent, RouterOutlet, MatSidenavModule, MatIconModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  @ViewChild('drawer') drawer!: MatSidenav;

  isMobile = false;

  private breakpointObserver = inject(BreakpointObserver);

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
