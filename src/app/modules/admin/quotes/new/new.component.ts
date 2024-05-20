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
import { QuotesService } from 'app/modules/admin/quotes/quotes.service';

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
    showAllMonths: boolean = true;

    serviceNumber: string = '';

    /**
     * Constructor
     */
    constructor(
        private _homeService: HomeService,
        private _router: Router,
        private _formBuilder: UntypedFormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _quotesService: QuotesService
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

        if (localStorage.getItem('newQuote') !== null) {
            const newQuote = JSON.parse(localStorage.getItem('newQuote'));

            for (const key in newQuote) {
                if (newQuote.hasOwnProperty(key)) {
                    formGroupConfig[key] = [newQuote[key], Validators.required];
                }
            }

            if (newQuote['tariff'] === 'PDBT') {
                this.showAllMonths = false;
            } else {
                this.showAllMonths = true;

                for (let index = 1; index <= 12; index++) {

                    formGroupConfig[`consumoBase${index}`] = ['', Validators.required];
                    formGroupConfig[`consumoPunta${index}`] = ['', Validators.required];
                    formGroupConfig[`demandaBase${index}`] = ['', Validators.required];
                    formGroupConfig[`demandaIntermedia${index}`] = ['', Validators.required];
                    formGroupConfig[`demandaPunta${index}`] = ['', Validators.required];
                    formGroupConfig[`genB${index}`] = ['', Validators.required];
                    formGroupConfig[`genP${index}`] = ['', Validators.required];
                    formGroupConfig[`factor${index}`] = ['', Validators.required];
                    formGroupConfig[`bTension${index}`] = ['', Validators.required];

                    if (index > 6) {
                        formGroupConfig[`monStart${index}`] = ['', Validators.required];
                        formGroupConfig[`monEnd${index}`] = ['', Validators.required];
                        formGroupConfig[`consumoIntermedia${index}`] = ['', Validators.required];
                        formGroupConfig[`kwaniomovil${index}`] = ['', Validators.required];
                        formGroupConfig[`kvrah${index}`] = ['', Validators.required];
                        formGroupConfig[`potencia${index}`] = ['', Validators.required];
                        formGroupConfig[`suministro${index}`] = ['', Validators.required];
                        formGroupConfig[`distribucion${index}`] = ['', Validators.required];
                        formGroupConfig[`transmision${index}`] = ['', Validators.required];
                        formGroupConfig[`cenace${index}`] = ['', Validators.required];
                        formGroupConfig[`genI${index}`] = ['', Validators.required];
                        formGroupConfig[`capacidad${index}`] = ['', Validators.required];
                        formGroupConfig[`sCnMEM${index}`] = ['', Validators.required];
                        formGroupConfig[`aPublico${index}`] = ['', Validators.required];
                    }
                }
            }
        } else {
            formGroupConfig['clientName'] = ['', Validators.required];
            formGroupConfig['clientUbication'] = ['', Validators.required];
            formGroupConfig['noService'] = ['', Validators.required];
            formGroupConfig['tariff'] = ['', Validators.required];
            formGroupConfig['contractedPower'] = ['', Validators.required];
            formGroupConfig['connectedPower'] = ['', Validators.required];

            for (let i = 1; i <= 12; i++) {
                formGroupConfig[`monStart${i}`] = ['', Validators.required];
                formGroupConfig[`monEnd${i}`] = ['', Validators.required];
                formGroupConfig[`consumoBase${i}`] = ['', Validators.required];
                formGroupConfig[`consumoIntermedia${i}`] = ['', Validators.required];
                formGroupConfig[`consumoPunta${i}`] = ['', Validators.required];
                formGroupConfig[`demandaBase${i}`] = ['', Validators.required];
                formGroupConfig[`demandaIntermedia${i}`] = ['', Validators.required];
                formGroupConfig[`demandaPunta${i}`] = ['', Validators.required];
                formGroupConfig[`kwaniomovil${i}`] = ['', Validators.required];
                formGroupConfig[`kvrah${i}`] = ['', Validators.required];
                formGroupConfig[`potencia${i}`] = ['', Validators.required];
                formGroupConfig[`suministro${i}`] = ['', Validators.required];
                formGroupConfig[`distribucion${i}`] = ['', Validators.required];
                formGroupConfig[`transmision${i}`] = ['', Validators.required];
                formGroupConfig[`cenace${i}`] = ['', Validators.required];
                formGroupConfig[`genB${i}`] = ['', Validators.required];
                formGroupConfig[`genI${i}`] = ['', Validators.required];
                formGroupConfig[`genP${i}`] = ['', Validators.required];
                formGroupConfig[`capacidad${i}`] = ['', Validators.required];
                formGroupConfig[`sCnMEM${i}`] = ['', Validators.required];
                formGroupConfig[`factor${i}`] = ['', Validators.required];
                formGroupConfig[`bTension${i}`] = ['', Validators.required];
                formGroupConfig[`aPublico${i}`] = ['', Validators.required];
            }
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
            this._fuseConfirmationService.open({
                title: 'Error',
                message: 'Revisa que todos los campos estén llenos correctamente.',
                actions: {
                    confirm: {
                        label: 'Entendido'
                    },
                    cancel: {
                        show: false
                    }
                }
            });
            return;
        }

        this.newQuoteForm.disable();

        //localStorage.setItem('newQuote', JSON.stringify(this.newQuoteForm.value));

        this._quotesService.newQuote(this.newQuoteForm.value).subscribe((response) => {
            //localStorage.setItem('idQuote', response.quote.id);
            this._router.navigate(['/quotes/preview', response.quote.id]);
        });
    }

    searchData(): void {
        if (this.serviceNumber === '') {
            this._fuseConfirmationService.open({
                title: 'Error',
                message: 'Ingresa un número de servicio.',
                actions: {
                    confirm: {
                        label: 'Entendido'
                    },
                    cancel: {
                        show: false
                    }
                }
            });
            return;
        }

        this._quotesService.searchData(this.serviceNumber).subscribe((response) => {
            console.log(response);
        }, (error) => {
            setTimeout(() => {
                this._fuseConfirmationService.open({
                    title: 'Error',
                    message: 'No se encontró el número de servicio.',
                    actions: {
                        confirm: {
                            label: 'Entendido'
                        },
                        cancel: {
                            show: false
                        }
                    }
                });
            }, 3000);
        });
    }
}
