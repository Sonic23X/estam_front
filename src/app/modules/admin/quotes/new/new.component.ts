import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, ViewEncapsulation, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { HomeService } from 'app/modules/admin/home/home.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';



@Component({
    selector       : 'new-quote',
    templateUrl    : './new.component.html',
    encapsulation  : ViewEncapsulation.None,
    standalone     : true,
    imports: [
        FormsModule,
        TranslocoModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        NgClass,
        NgFor,
        NgIf,

        MatSelectModule,
        MatOptionModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatCheckboxModule,
        MatRadioModule,
        MatDatepickerModule
    ],
})
export class NewComponent implements OnInit, OnDestroy, AfterViewInit
{
    @ViewChild('newQuote') newQuoteNgForm: NgForm;
    newQuoteForm: UntypedFormGroup;
    showAlert: boolean = false;
    showAllMonths: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _homeService: HomeService,
        private _router: Router,
        private _formBuilder: UntypedFormBuilder,
        private _fuseConfirmationService: FuseConfirmationService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.newQuoteForm = this.createFormGroup();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {

    }

    ngAfterViewInit(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    createFormGroup(): UntypedFormGroup {
        const formGroupConfig = {};

        formGroupConfig['clientName'] = ['asdasda', Validators.required];
        formGroupConfig['clientUbication'] = ['asdasd', Validators.required];
        formGroupConfig['noService'] = ['123123123123', Validators.required];
        formGroupConfig['tariff'] = ['PDBT', Validators.required];
        formGroupConfig['contractedPower'] = ['12314', Validators.required];
        formGroupConfig['connectedPower'] = ['123123', Validators.required];

        for (let i = 1; i <= 12; i++) {
            formGroupConfig[`monStart${i}`] = ['23/10/2022', Validators.required];
            formGroupConfig[`monEnd${i}`] = ['23/11/2022', Validators.required];
            formGroupConfig[`consumoBase${i}`] = ['123', Validators.required];
            formGroupConfig[`consumoIntermedia${i}`] = ['123', Validators.required];
            formGroupConfig[`consumoPunta${i}`] = ['123', Validators.required];
            formGroupConfig[`demandaBase${i}`] = ['123', Validators.required];
            formGroupConfig[`demandaIntermedia${i}`] = ['123', Validators.required];
            formGroupConfig[`demandaPunta${i}`] = ['122', Validators.required];
            formGroupConfig[`kwaniomovil${i}`] = ['123', Validators.required];
            formGroupConfig[`kvrah${i}`] = ['123', Validators.required];
            formGroupConfig[`potencia${i}`] = ['123', Validators.required];
            formGroupConfig[`suministro${i}`] = ['123', Validators.required];
            formGroupConfig[`distribucion${i}`] = ['123', Validators.required];
            formGroupConfig[`transmision${i}`] = ['123', Validators.required];
            formGroupConfig[`cenace${i}`] = ['12', Validators.required];
            formGroupConfig[`genB${i}`] = ['123', Validators.required];
            formGroupConfig[`genI${i}`] = ['123', Validators.required];
            formGroupConfig[`genP${i}`] = ['123', Validators.required];
            formGroupConfig[`capacidad${i}`] = ['123', Validators.required];
            formGroupConfig[`sCnMEM${i}`] = ['123', Validators.required];
            formGroupConfig[`factor${i}`] = ['123', Validators.required];
            formGroupConfig[`bTension${i}`] = ['123', Validators.required];
            formGroupConfig[`aPublico${i}`] = ['123', Validators.required];
        }

        return this._formBuilder.group(formGroupConfig);
    }

    tariffChange(event: any): void {
        if (event.value === 'PDBT') {
            this.showAllMonths = false;

            for (let index = 1; index <= 12; index++) {

                this.newQuoteForm.removeControl(`consumoBase${index}`);
                this.newQuoteForm.removeControl(`consumoPunta${index}`);
                this.newQuoteForm.removeControl(`demandaBase${index}`);
                this.newQuoteForm.removeControl(`demandaIntermedia${index}`);
                this.newQuoteForm.removeControl(`demandaPunta${index}`);
                this.newQuoteForm.removeControl(`genB${index}`);
                this.newQuoteForm.removeControl(`genP${index}`);
                this.newQuoteForm.removeControl(`factor${index}`);
                this.newQuoteForm.removeControl(`bTension${index}`);

                if (index > 6) {
                    this.newQuoteForm.removeControl(`monStart${index}`);
                    this.newQuoteForm.removeControl(`monEnd${index}`);
                    this.newQuoteForm.removeControl(`consumoIntermedia${index}`);
                    this.newQuoteForm.removeControl(`kwaniomovil${index}`);
                    this.newQuoteForm.removeControl(`kvrah${index}`);
                    this.newQuoteForm.removeControl(`potencia${index}`);
                    this.newQuoteForm.removeControl(`suministro${index}`);
                    this.newQuoteForm.removeControl(`distribucion${index}`);
                    this.newQuoteForm.removeControl(`transmision${index}`);
                    this.newQuoteForm.removeControl(`cenace${index}`);
                    this.newQuoteForm.removeControl(`genI${index}`);
                    this.newQuoteForm.removeControl(`capacidad${index}`);
                    this.newQuoteForm.removeControl(`sCnMEM${index}`);
                    this.newQuoteForm.removeControl(`aPublico${index}`);
                }

            }

        } else if (this.showAllMonths === false) {
            this.showAllMonths = true;

            for (let index = 1; index <= 12; index++) {

                this.newQuoteForm.addControl(`consumoBase${index}`, ['', Validators.required]);
                this.newQuoteForm.addControl(`consumoPunta${index}`, ['', Validators.required]);
                this.newQuoteForm.addControl(`demandaBase${index}`, ['', Validators.required]);
                this.newQuoteForm.addControl(`demandaIntermedia${index}`, ['', Validators.required]);
                this.newQuoteForm.addControl(`demandaPunta${index}`, ['', Validators.required]);
                this.newQuoteForm.addControl(`genB${index}`, ['', Validators.required]);
                this.newQuoteForm.addControl(`genP${index}`, ['', Validators.required]);
                this.newQuoteForm.addControl(`factor${index}`, ['', Validators.required]);
                this.newQuoteForm.addControl(`bTension${index}`, ['', Validators.required]);

                if (index > 6) {
                    this.newQuoteForm.addControl(`monStart${index}`, ['', Validators.required]);
                    this.newQuoteForm.addControl(`monEnd${index}`, ['', Validators.required]);
                    this.newQuoteForm.addControl(`consumoIntermedia${index}`, ['', Validators.required]);
                    this.newQuoteForm.addControl(`kwaniomovil${index}`, ['', Validators.required]);
                    this.newQuoteForm.addControl(`kvrah${index}`, ['', Validators.required]);
                    this.newQuoteForm.addControl(`potencia${index}`, ['', Validators.required]);
                    this.newQuoteForm.addControl(`suministro${index}`, ['', Validators.required]);
                    this.newQuoteForm.addControl(`distribucion${index}`, ['', Validators.required]);
                    this.newQuoteForm.addControl(`transmision${index}`, ['', Validators.required]);
                    this.newQuoteForm.addControl(`cenace${index}`, ['', Validators.required]);
                    this.newQuoteForm.addControl(`genI${index}`, ['', Validators.required]);
                    this.newQuoteForm.addControl(`capacidad${index}`, ['', Validators.required]);
                    this.newQuoteForm.addControl(`sCnMEM${index}`, ['', Validators.required]);
                    this.newQuoteForm.addControl(`aPublico${index}`, ['', Validators.required]);
                }
            }
        }
    }

    resume(): void {

        if ( this.newQuoteForm.invalid )
        {
            console.log(this.newQuoteForm);
            return;
        }

        this.newQuoteForm.disable();

        console.log('asd');



        //this._router.navigate(['/quotes/preview']);
    }
}
