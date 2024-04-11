/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'dashboard',
        title: 'Dashboard',
        type : 'basic',
        icon : 'heroicons_outline:presentation-chart-bar',
        link : '/dashboard'
    },
    {
        id   : 'users',
        title: 'Usuarios',
        type : 'basic',
        icon : 'heroicons_outline:users',
        link : '/users'
    },
    {
        id   : 'properties',
        title: 'Propiedades',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/properties'
    }
];
export const compactNavigation: FuseNavigationItem[] = [ ];
export const futuristicNavigation: FuseNavigationItem[] = [
     {
        id      : 'dashboards',
        title   : 'Menu',
        type    : 'group',
        children: defaultNavigation,
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [ ];
