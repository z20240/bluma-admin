export default function() {
    return [
        {
            to: '/admin',
            icon: 'desktop-mac',
            label: '儀表板'
        },
        // {
        //     to: '/tables',
        //     label: 'Tables',
        //     icon: 'table',
        //     updateMark: true
        // },
        {
            to: '/admin/questions',
            label: '題庫',
            icon: 'table',
            updateMark: true
        }
    ];
}
