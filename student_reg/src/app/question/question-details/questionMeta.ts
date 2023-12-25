export const Actions: Object[] = [
    {
        name: 'view',
        visible: true,
        icon: true,
        style:{
            class:'bi bi-eye'
        }
    },
    {
        name: 'edit',
        visible: true,
        icon: true,
        style:{
            class:'bi bi-pencil-square'
        }
    },
    {
        name: 'delete',
        visible: true,
        icon: true,
        style:{
            class:'bi bi-trash'
        }
    },
    {
        name: 'approve',
        visible: true,
        icon: true,
        style:{
            class:'bi bi-check-circle'
        }
    }
    
]
export const QuestionMeta: Object[] = [
    {
        seq: 1,
        name: 'Question Type',
        visible: true,
        dataKey: 'questionType',
        action: Actions
    },
    {
        seq: 2,
        name: 'Level',
        visible: true,
        dataKey: 'level',
        action: Actions
    },
    {
        seq: 3,
        name: 'Status',
        visible: true,
        dataKey: 'status',
        action: Actions
    },
    {
        seq: 4,
        name: 'Question',
        visible: true,
        dataKey: 'questionText',
        action: Actions
    },
    {
        seq: 5,
        name: 'Action',
        visible: true,
        dataKey: '',
        action: Actions
    },
]