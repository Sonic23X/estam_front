import { NgClass, NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { Component, ViewEncapsulation, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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

@Component({
    selector       : 'home',
    templateUrl    : './home.component.html',
    encapsulation  : ViewEncapsulation.None,
    standalone     : true,
    imports: [
        TranslocoModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        FuseCardComponent,
        NgClass,
        NgFor,
        NgIf,
        CurrencyPipe
    ],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit
{
    isLoading: boolean = false;
    data: any = {
        columns: [
            'name',
            'date',
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
        private _homeService: HomeService,
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
        this._homeService.getMyQuotes().subscribe((response) => {
            response.quotes.forEach((quote) => {
                let annual = JSON.parse(quote.annualConsumption);

                let data = {
                    name: quote.name,
                    date: new Date(quote.created_at).toLocaleDateString(),
                    amount: annual.total,
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
}
