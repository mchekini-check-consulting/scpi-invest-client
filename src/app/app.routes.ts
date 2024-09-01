import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { LayoutComponent } from 'app/layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/features/feature1'
    {path: '', pathMatch : 'full', redirectTo: 'features/feature1'},

    // Admin routes
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [

            // Dashboards
            {path: 'features', children: [
                {path: 'feature1', loadChildren: () => import('app/modules/admin/features/feature1/feature1.routes')},
                {path: 'feature2', loadChildren: () => import('app/modules/admin/features/feature2/feature2.routes')},
                {path: 'feature3', loadChildren: () => import('app/modules/admin/features/feature3/feature3.routes')},
                {path: 'feature4', loadChildren: () => import('app/modules/admin/features/feature4/feature4.routes')},
            ]},

            // Pages
            {path: 'pages', children: [

                // Error
                {path: 'error', children: [
                    {path: '404', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.routes')},
                    {path: '500', loadChildren: () => import('app/modules/admin/pages/error/error-500/error-500.routes')}
                ]},
            ]},

            // Documentation
            {path: 'docs', children: [

                // Guides
                {path: 'guides', loadChildren: () => import('app/modules/admin/docs/guides/guides.routes')},

                // Material Components
                {path: 'material-components', loadChildren: () => import('app/modules/admin/docs/material-components/material-components.routes')},

                // Fuse Components
                {path: 'fuse-components', loadChildren: () => import('app/modules/admin/docs/fuse-components/fuse-components.routes')},

                // Other Components
                {path: 'other-components', loadChildren: () => import('app/modules/admin/docs/other-components/other-components.routes')},

                // Forms
                {path: 'forms', loadChildren: () => import('app/modules/admin/docs/forms/forms.routes')},
            ]},

            // 404 & Catch all
            {path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.routes')},
            {path: '**', redirectTo: '404-not-found'}
        ]
    }
];
