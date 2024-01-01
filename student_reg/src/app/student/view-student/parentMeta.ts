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
export const ParentMeta: Object[] = [
    {
        seq: 1,
        name: 'Name',
        visible: true,
        dataKey: 'userName',
        action: Actions
    },
    {
        seq: 2,
        name: 'Relation',
        visible: true,
        dataKey: 'relationshipType',
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
        name: 'Mobile No',
        visible: true,
        dataKey: 'mobileNo',
        action: Actions
    },
]