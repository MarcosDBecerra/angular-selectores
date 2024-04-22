import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorPagesComponent } from './pages/selector-pages/selector-pages.component';
import { CountriesRoutingModule } from './countries-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    SelectorPagesComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [ HttpClient ]
})
export class CountriesModule { }
