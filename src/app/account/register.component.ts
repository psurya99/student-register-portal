import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


import { AccountService,AlertService,CountyListService } from '@app/_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    courseList: Array<any> = [];

 
    stateInfo: any[] = [];
    countryInfo: any[] = [];
    cityInfo: any[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private cscService: CountyListService
    ) { }

    ngOnInit() {
        this.getCountries();

        this.courseList = [
            { code: 1, name: "MCA" },
            { code: 2, name: "MBA" },
            { code: 3, name: "BTech" },
            { code: 4, name: "MTech" },
            { code: 5, name: "MS IT" }
          ]

        this.form = this.formBuilder.group({
            username:['',Validators.required],
            firstName: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            course: ['', Validators.required],
            country: ['', Validators.required],
            state: ['', Validators.required],
            city: ['', Validators.required],

          
          
          });
    }



    getCountries(){
        this.cscService.allCountries().
        subscribe(
          data2 => {
            this.countryInfo=data2.Countries;
            //console.log('Data:', this.countryInfo);
          },
          err => console.log(err),
          () => console.log('complete')
        )
      }
    
      onChangeCountry(countryValue:any) {
        this.stateInfo=this.countryInfo[countryValue].States;
        this.cityInfo=this.stateInfo[0].Cities;
       // console.log(this.cityInfo);
      }
    
      onChangeState(stateValue:any) {
        this.cityInfo=this.stateInfo[stateValue].Cities;
        //console.log(this.cityInfo);
      }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}