import { NgClass, NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { Component, ViewEncapsulation, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { HomeService } from 'app/modules/admin/home/home.service';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseCardComponent } from '@fuse/components/card';
import { QuotesService } from '../quotes.service';

@Component({
    selector       : 'list-quote',
    templateUrl    : './list.component.html',
    encapsulation  : ViewEncapsulation.None,
    standalone     : true,
    imports: [
        TranslocoModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        FuseCardComponent,
        CurrencyPipe,
        NgClass,
        NgFor,
        NgIf
    ],
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit
{
    isLoading: boolean = false;
    data: any = {
        columns: [
            'name',
            'date',
            'autor',
            'amount',
            'options'
        ],
        rows : []
    };
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _quoteService: QuotesService,
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
        this._quoteService.getQuotes().subscribe((response) => {
            response.quotes.forEach((quote) => {
                let annual = JSON.parse(quote.annualConsumption);

                let data = {
                    name: quote.name,
                    date: new Date(quote.created_at).toLocaleDateString(),
                    amount: annual.total,
                    autor: quote.user.name,
                }

                this.data.rows.push(data);
            });
            this.isLoading = true;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    ngAfterViewInit(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    newQuote(): void
    {
        this._router.navigate(['quotes/new']);
    }

    seeQuote(id: Number): void
    {
        this._router.navigate(['/quotes/preview', id]);
    }
}
