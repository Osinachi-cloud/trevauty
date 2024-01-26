import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [

    {
        routeLink: 'overview',
        icon: 'fas fa-eye',
        label: 'Overview',
        // items: [
        //     {
        //         routeLink: 'products/level1.1',
        //         label: 'Level 1.1',
        //         items: [
        //             {
        //                 routeLink: 'products/level2.1',
        //                 label: 'Level 2.1',
        //             },
        //             {
        //                 routeLink: 'products/level2.2',
        //                 label: 'Level 2.2',
        //                 items: [
        //                     {
        //                         routeLink: 'products/level3.1',
        //                         label: 'Level 3.1'
        //                     },
        //                     {
        //                         routeLink: 'products/level3.2',
        //                         label: 'Level 3.2'
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         routeLink: 'products/level1.2',
        //         label: 'Level 1.2',
        //     }
        // ]
    },
    {
        routeLink: 'analytic',
        icon: 'fas fa-chart-line',
        label: 'Analytic'
    },
    {
        routeLink: 'manage-terminal/*',
        icon: 'fas fa-cash-register',
        label: 'Manage Terminal',
        // items: [
        //     {
        //         routeLink: 'coupens/list',
        //         label: 'List Coupens'
        //     },
        //     {
        //         routeLink: 'coupens/create',
        //         label: 'Create Coupens'
        //     }
        // ]
    },
    {
        routeLink: 'refund-transaction',
        icon: 'fas fa-arrow-left',
        label: 'Refund Transactions'
    },
    // {
    //     routeLink: 'refund',
    //     icon: 'fal fa-camera',
    //     label: 'Refund Transactions'
    // },
    {
        routeLink: 'profile',
        icon: 'fa fa-user',
        label: 'Profile'
    }
    ,
    // {
    //     routeLink: 'Route4',
    //     icon: 'fal fa-cog',
    //     label: 'Route4',
    //     expanded: true,

    //     items: [
    //         {
    //             routeLink: 'settings/profile',
    //             label: 'Profile'
    //         },
    //         {
    //             routeLink: 'settings/customize',
    //             label: 'Customize'
    //         }
    //     ]
    // },
];