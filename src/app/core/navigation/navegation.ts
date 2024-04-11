import { FuseNavigationItem } from '@fuse/components/navigation';

const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'home',
        title: 'Inicio',
        type : 'basic',
        icon : 'mat_solid:home',
        link : '/home'
    },
    {
        id   : 'book',
        title: 'Cotizaciones',
        type : 'basic',
        icon : 'fa_solid:book',
        link : '/quotes'
    },
    {
        id   : 'stays',
        title: 'Configuraciones',
        type : 'basic',
        icon : 'fa_solid:gear',
        link : '/settings'
    },
];
const compactNavigation: FuseNavigationItem[] = [ ];
const futuristicNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Menu',
        type    : 'group',
        children: defaultNavigation,
    }
];
const horizontalNavigation: FuseNavigationItem[] = [ ];

export const navigationData = {
    default : defaultNavigation,
    compact : defaultNavigation,
    futuristic: futuristicNavigation,
    horizontal: horizontalNavigation
};
