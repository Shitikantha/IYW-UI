export const Actions: Object[] = [
    {
        name: 'view Report',
        visible: true,
        icon: false,
        type:'btn',
    },
]
export const ReportMeta: Object[] = [
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
        name: 'Class',
        visible: true,
        dataKey: 'className',
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