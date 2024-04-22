import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry, Country } from '../../interfaces/country.interfaces';
import { Observable, filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'selector-pages',
  templateUrl: './selector-pages.component.html',
})
export class SelectorPagesComponent implements OnInit{

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required ],
    country: ['', Validators.required ],
    border: ['', Validators.required ]
  })

  public countriesByRegion: SmallCountry[] = [];

  public borders: SmallCountry[] = [];

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ){}


  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  public onRegionChanged(): void {
    this.myForm.get('region')!.valueChanges
      .pipe(
        tap( () => this.myForm.get('country')!.setValue('') ),
        tap( () => this.myForm.get('border')!.setValue('') ),
        switchMap( region => this.countriesService.getCountriesByRegion(region) ),
      )
      .subscribe( countries => {
        this.countriesByRegion = countries;
      });
  }

  onCountryChanged(): void {
    this.myForm.get('country')!.valueChanges
      .pipe(
        tap( () => this.myForm.get('border')!.setValue('') ),
        filter( (value: string) => value.length > 0),
        switchMap( (alphaCode) => this.countriesService.getCountryByAlphaCode( alphaCode )),
        switchMap( country => this.countriesService.getCountryBordersByCodes( country.borders )),
      )
      .subscribe( countries => {
        this.borders = countries;
      });
  }




}
