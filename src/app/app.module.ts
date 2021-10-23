import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core.module';
import { GroupComponent } from './group/group.component';
import { DirectComparisonComponent } from './direct-comparison/direct-comparison.component';
import { CompatibilityTableComponent } from './compatibility-table/compatibility-table.component';
import { TableFormatDirective } from './compatibility-table/table-format.directive';
import { PreferencesComponent } from './preferences/preferences.component';
import { RankingComponent } from './preferences/ranking/ranking.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PreferenceComponent } from './preferences/preference/preference.component';
import { MembershipComponent } from './membership/membership.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    GroupComponent,
    DirectComparisonComponent,
    CompatibilityTableComponent,
    TableFormatDirective,
    PreferencesComponent,
    RankingComponent,
    PreferenceComponent,
    MembershipComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
    CoreModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
