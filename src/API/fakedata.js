export const anchorPoints = [
    {
        name: 'pt1', 
        x: '0', 
        y: '10', 
    }, 
    {
        name: 'pt2', 
        x: '0', 
        y: '38', 
    }, 
    {
        name: 'pt3', 
        x: '0', 
        y: '60', 
    }
]


export const paths = [
    {
        bankID: 1, 
        points: [
            {name: 'pt1', x: '3', y: '0', start: true, end: false}, 
            {name: 'pt3', x: '3', y: '20', start: false, end: true}, 
        ]
    }, 
    {
        bankID: 2, 
        points: [
            {name: 'pt1', x: '2', y: '8', start: true, end: false}, 
            {name: 'pt3', x: '85', y: '8', start: false, end: true}, 
        ]
    }, 
    {
        bankID: 3, 
        points: [
            {name: 'pt1', x: '2', y: '8', start: true, end: false}, 
            {name: 'pt3', x: '25', y: '8', start: false, end: true}, 
            {name: 'pt3', x: '25', y: '8', start: true, end: false}, 
            {name: 'pt4', x: '25', y: '25', start: false, end: true}, 
        ]
    }, 
    {
        bankID: 4, 
        points: [
            {name: 'pt1', x: '2', y: '8', start: true, end: false}, 
            {name: 'pt3', x: '67', y: '8', start: false, end: true}, 
            {name: 'pt3', x: '67', y: '8', start: true, end: false}, 
            {name: 'pt4', x: '67', y: '25', start: false, end: true}, 
        ]
    }, 
    {
        bankID: 5, 
        points: [
            {name: 'pt1', x: '2', y: '8', start: true, end: false}, 
            {name: 'pt3', x: '2', y: '44', start: false, end: true}, 
        ]
    }, 
]