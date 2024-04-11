import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { NewComponent } from 'app/modules/admin/quotes/new/new.component';
import { QuoteService } from 'app/modules/admin/quotes/quotes.service';

export default [
    {
        path     : '',
        component: NewComponent,
        resolve  : {
        },
    },
] as Routes;
