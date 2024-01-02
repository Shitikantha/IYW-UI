export const Actions: Object[] = [
    {
        name: 'edit',
        visible: true,
        icon: true,
        style:{
            class:'bi bi-pencil-square'
        }
    },
    
]
export const ProgressMeta: Object[] = [
    {
        seq: 1,
        name: 'Subject',
        visible: true,
        dataKey: 'subject',
        action: Actions
    },
    {
        seq: 2,
        name: 'Percentage',
        visible: true,
        dataKey: 'percentage',
        action: Actions
    },

]