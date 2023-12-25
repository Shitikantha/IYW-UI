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
        name: 'view',
        visible: true,
        icon: true,
        style:{
            class:'bi bi-eye'
        }
    }
]
export const TeacherMeta: Object[] = [
    {
        seq: 1,
        name: 'Name',
        visible: true,
        dataKey: 'teacherName',
        action: Actions
    },
    {
        seq: 2,
        name: 'Email',
        visible: true,
        dataKey: 'emailId',
        action: Actions
    },
    {
        seq: 3,
        name: 'Status',
        visible: true,
        dataKey: 'contactNo',
        type:'input',
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