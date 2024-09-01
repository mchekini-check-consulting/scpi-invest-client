/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'features',
        title   : 'Features',
        subtitle: 'My features',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'features.feature1',
                title: 'Feature1',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-document-check',
                link : '/features/feature1',
            },
            {
                id   : 'features.feature2',
                title: 'Feature2',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/features/feature2',
            },
            {
                id   : 'features.feature3',
                title: 'Feature3',
                type : 'basic',
                icon : 'heroicons_outline:banknotes',
                link : '/features/feature3',
            },
            {
                id   : 'features.feature4',
                title: 'Feature4',
                type : 'basic',
                icon : 'heroicons_outline:currency-dollar',
                link : '/features/feature4',
            },
        ],
    },
    {
        id      : 'pages',
        title   : 'Pages',
        subtitle: 'Custom made page designs',
        type    : 'group',
        icon    : 'heroicons_outline:document',
        children: [
            {
                id      : 'pages.error',
                title   : 'Error',
                type    : 'collapsable',
                icon    : 'heroicons_outline:exclamation-circle',
                children: [
                    {
                        id   : 'pages.error.404',
                        title: '404',
                        type : 'basic',
                        link : '/pages/error/404',
                    },
                    {
                        id   : 'pages.error.500',
                        title: '500',
                        type : 'basic',
                        link : '/pages/error/500',
                    },
                ],
            },
        ],
    },
    {
        id  : 'divider-1',
        type: 'divider',
    },
    {
        id      : 'documentation',
        title   : 'Documentation',
        subtitle: 'Everything you need to know about Fuse',
        type    : 'group',
        icon    : 'heroicons_outline:information-circle',
        children: [
            {
                id   : 'documentation.guides',
                title: 'Guides',
                type : 'basic',
                icon : 'heroicons_outline:book-open',
                link : '/docs/guides',
            },
            {
                id   : 'documentation.material-components',
                title: 'Material Components',
                type : 'basic',
                icon : 'heroicons_outline:square-3-stack-3d',
                link : '/docs/material-components',
            },
            {
                id   : 'documentation.fuse-components',
                title: 'Fuse Components',
                type : 'basic',
                icon : 'heroicons_outline:square-3-stack-3d',
                link : '/docs/fuse-components',
            },
            {
                id   : 'documentation.other-components',
                title: 'Other Components',
                type : 'basic',
                icon : 'heroicons_outline:square-3-stack-3d',
                link : '/docs/other-components',
            },
            {
                id      : 'documentation.forms',
                title   : 'Forms',
                type    : 'collapsable',
                icon    : 'heroicons_outline:pencil-square',
                children: [
                    {
                        id   : 'documentation.forms.fields',
                        title: 'Fields',
                        type : 'basic',
                        link : '/docs/forms/fields',
                    },
                    {
                        id   : 'documentation.forms.layouts',
                        title: 'Layouts',
                        type : 'basic',
                        link : '/docs/forms/layouts',
                    },
                    {
                        id   : 'documentation.forms.wizards',
                        title: 'Wizards',
                        type : 'basic',
                        link : '/docs/forms/wizards',
                    },
                ],
            },
        ],
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id      : 'features',
        title   : 'Features',
        tooltip : 'Dashboards',
        type    : 'aside',
        icon    : 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'documentation',
        title   : 'Docs',
        tooltip : 'Documentation',
        type    : 'aside',
        icon    : 'heroicons_outline:information-circle',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'pages',
        title   : 'Pages',
        tooltip : 'Pages',
        type    : 'aside',
        icon    : 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id      : 'features',
        title   : 'DASHBOARDS',
        type    : 'group',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id   : 'others',
        title: 'OTHERS',
        type : 'group',
    },
    {
        id      : 'documentation',
        title   : 'Docs',
        type    : 'aside',
        icon    : 'heroicons_outline:information-circle',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'pages',
        title   : 'Pages',
        type    : 'aside',
        icon    : 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id      : 'features',
        title   : 'Features',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'apps',
        title   : 'Apps',
        type    : 'group',
        icon    : 'heroicons_outline:qrcode',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'pages',
        title   : 'Pages',
        type    : 'group',
        icon    : 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'documentation',
        title   : 'Docs',
        type    : 'group',
        icon    : 'heroicons_outline:information-circle',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
