export const Actions: Object[] = [
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
    }
]
export const AddClassMeta: Object[] = [
    {
        seq: 1,
        name: 'Class',
        visible: true,
        dataKey: 'className',
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
        name: 'Action',
        visible: true,
        dataKey: '',
        action: Actions
    },
]