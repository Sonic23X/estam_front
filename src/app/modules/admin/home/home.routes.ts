import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from 'app/modules/admin/home/home.component';
import { HomeService } from 'app/modules/admin/home/home.service';

export default [
    {
        path     : '',
        component: HomeComponent,
        resolve  : {
        },
    },
] as Routes;
