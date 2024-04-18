import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { NewComponent } from 'app/modules/admin/quotes/new/new.component';

export default [
    {
        path     : '',
        component: NewComponent,
        resolve  : {
        },
    },
] as Routes;
