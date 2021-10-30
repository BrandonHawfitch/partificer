import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MemberService } from '../shared/member.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSave() {
    // this.dataStorageService.storeRecipes();
    console.log(this.memberService.getMembers());
  }

  onFetch() {
    // this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
