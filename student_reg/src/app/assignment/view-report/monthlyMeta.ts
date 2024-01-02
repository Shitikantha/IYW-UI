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
export const MonthlyMeta: Object[] = [
    {
        seq: 1,
        name: 'Month',
        visible: true,
        dataKey: 'month',
        action: Actions
    },
    {
        seq: 2,
        name: 'Subject',
        visible: true,
        dataKey: 'subject',
        action: Actions
    },
    {
        seq: 3,
        name: 'Assigned',
        visible: true,
        dataKey: 'assigned',
        action: Actions
    },
    {
        seq: 4,
        name: 'Completed',
        visible: true,
        dataKey: 'completed',
        action: Actions
    },
]