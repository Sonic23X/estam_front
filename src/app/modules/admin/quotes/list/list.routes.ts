import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ListComponent } from 'app/modules/admin/quotes/list/list.component';
import { QuoteService } from 'app/modules/admin/quotes/quotes.service';

export default [
    {
        path     : '',
        component: ListComponent,
        resolve  : {
        },
    },
] as Routes;
