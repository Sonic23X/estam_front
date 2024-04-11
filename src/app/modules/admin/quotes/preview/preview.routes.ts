import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ResumeComponent } from 'app/modules/admin/quotes/preview/preview.component';

export default [
    {
        path     : '',
        component: ResumeComponent,
        resolve  : {
        },
    },
] as Routes;
