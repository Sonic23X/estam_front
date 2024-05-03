import { NgClass, NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, FormsModule  } from '@angular/forms';
import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { QuotesService } from 'app/modules/admin/quotes/quotes.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { forEach } from 'lodash';

@Component({
    selector       : 'preview-quote',
    templateUrl    : './preview.component.html',
    encapsulation  : ViewEncapsulation.None,
    standalone     : true,
    imports: [
        FormsModule,
        TranslocoModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        CurrencyPipe,
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
        MatTabsModule,
    ],
})

export class ResumeComponent implements OnInit
{

    data: any = {
        columns: [
            'month',
            'subtotal',
            'iva',
            'total'
        ],
        rows: [ ]
    };
    isLoaded: boolean = false;


    /**
     * Constructor
     */
    constructor(
        private _quotesService: QuotesService,
        private _router: Router,
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
        const quoteId = localStorage.getItem('idQuote');
        if (quoteId) {
            this._quotesService.getQuote(quoteId).subscribe((response) => {
                let monthlyConsumption = JSON.parse(response.quote.monthlyConsumption);
                console.log(monthlyConsumption);

                let i = 0;
                forEach(monthlyConsumption, (value) => {
                    let data ={ };

                    let section = this.getKey(i, response.quote.tariff);
                    console.log(section);

                    if (response.quote.tariff == 'PDBT') {
                        data = {
                            month: this.getMonth(i) + ' - ' + this.getMonth(++i),
                            subtotal: monthlyConsumption[section].subtotal,
                            iva: monthlyConsumption[section].iva,
                            total: monthlyConsumption[section].total
                        }
                    } else {
                        data = {
                            month: this.getMonth(i),
                            subtotal: monthlyConsumption[section].subtotal,
                            iva: monthlyConsumption[section].iva,
                            total: monthlyConsumption[section].total
                        }
                    }

                    this.data.rows.push(data);
                    i++;
                });
                this.isLoaded = true;
            });
        } else {
            this._router.navigate(['/quotes']);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods


    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    getMonth(n: Number): string
    {
        switch (n) {
            case 0:
                return 'Enero';
            case 1:
                return 'Febrero';
            case 2:
                return 'Marzo';
            case 3:
                return 'Abril';
            case 4:
                return 'Mayo';
            case 5:
                return 'Junio';
            case 6:
                return 'Julio';
            case 7:
                return 'Agosto';
            case 8:
                return 'Septiembre';
            case 9:
                return 'Octubre';
            case 10:
                return 'Noviembre';
            case 11:
                return 'Diciembre';
            default:
                return '';
        }
    }

    getKey(n: Number, type: string): string
    {
        switch (n) {
            case 0:
                return 'primero';
            case 1:
                return 'segundo';
            case 2:
                if (type == 'PDBT') {
                    return 'segundo';
                }
                return 'tercero';
            case 3:
                return 'cuarto';
            case 4:
                if (type == 'PDBT') {
                    return 'tercero';
                }
                return 'quinto';
            case 5:
                return 'sexto';
            case 6:
                if (type == 'PDBT') {
                    return 'cuarto';
                }
                return 'septimo';
            case 7:
                return 'octavo';
            case 8:
                if (type == 'PDBT') {
                    return 'quinto';
                }
                return 'noveno';
            case 9:
                return 'decimo';
            case 10:
                if (type == 'PDBT') {
                    return 'sexto';
                }
                return 'onceavo';
            case 11:
                return 'doceavo';
        }
    }
}
