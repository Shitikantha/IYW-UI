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
    }
    
]
export const StudentMeta: Object[] = [
    {
        seq: 1,
        name: 'Roll No',
        visible: true,
        dataKey: 'extId',
        action: Actions
    },
    {
        seq: 2,
        name: 'Name',
        visible: true,
        dataKey: 'userName',
        action: Actions
    },
    {
        seq: 3,
        name: 'Email',
        visible: true,
        dataKey: 'emailId',
        action: Actions
    },
    {
        seq: 4,
        name: 'Action',
        visible: true,
        dataKey: '',
        action: Actions
    },
]