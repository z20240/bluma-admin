export default function() {
    return [
        {
            to: '/',
            icon: 'desktop-mac',
            label: 'Dashboard'
        },
        {
            to: '/tables',
            label: 'Tables',
            icon: 'table',
            updateMark: true
        },
        {
            to: '/questions',
            label: '題庫',
            icon: 'table',
            updateMark: true
        },
        {
            to: '/forms',
            label: 'Forms',
            icon: 'square-edit-outline'
        },
        {
            to: '/profile',
            label: 'Profile',
            icon: 'account-circle'
        },
        {
            label: 'Submenus',
            subLabel: 'Submenus Example',
            icon: 'view-list',
            menu: [
                {
                    href: '#void',
                    label: 'Sub-item One'
                },
                {
                    href: '#void',
                    label: 'Sub-item Two'
                }
            ]
        }
    ];
}
