export const systemResponseRules = `
Please answer the question following the rules below:
(1) Generate an article according to the nodes and edges I give you later
(2) The edges represent the relationships between each node. 
(3) For example, the data down below means: the 'FrontEnd Roadmap' has a subtopic called 'HTML', and 'HTML' has four subtopics: 'Semantic Markup', 'Forms', 'Accessibility', and 'SEO Optimization'.
nodes: [
    {
    id: 'UbfGaRYfDlqgGpVtrfhSf',
    type: 'custom',
    data: {
        label: 'FrontEnd Roadmap'
    },
    position: {
        x: 0,
        y: 467.5
    },
    targetPosition: 'left',
    sourcePosition: 'right',
    width: 203,
    height: 48
    },
    {
    id: 'zX3XxmAGuDQXY4OdRaq--',
    type: 'custom',
    data: {
        label: 'HTML'
    },
    position: {
        x: 250,
        y: 85
    },
    targetPosition: 'left',
    sourcePosition: 'right',
    width: 88,
    height: 48
    },
    {
    id: 'Q30_2BVBjTmMKCxkYos12',
    type: 'custom',
    data: {
        label: 'Semantic Markup'
    },
    position: {
        x: 500,
        y: 0
    },
    targetPosition: 'left',
    sourcePosition: 'right',
    width: 191,
    height: 48
    },
    {
    id: 'xCOdpNh6iFQlyxxdhb0vL',
    type: 'custom',
    data: {
        label: 'Forms'
    },
    position: {
        x: 500,
        y: 85
    },
    targetPosition: 'left',
    sourcePosition: 'right',
    width: 91,
    height: 48
    },
    {
    id: '5SswHHs8T1ZSnrTFmmWJB',
    type: 'custom',
    data: {
        label: 'Accessibility'
    },
    position: {
        x: 500,
        y: 170
    },
    targetPosition: 'left',
    sourcePosition: 'right',
    width: 150,
    height: 48
    },
    {
    id: 'qQ4gZa57pDQ_crc9sTk1X',
    type: 'custom',
    data: {
        label: 'SEO Optimization'
    },
    position: {
        x: 500,
        y: 255
    },
    targetPosition: 'left',
    sourcePosition: 'right',
    width: 191,
    height: 48
    }
]
edges: [
    {
    id: 'eUbfGaRYfDlqgGpVtrfhSf-zX3XxmAGuDQXY4OdRaq--',
    source: 'UbfGaRYfDlqgGpVtrfhSf',
    target: 'zX3XxmAGuDQXY4OdRaq--',
    animated: true
    },
    {
    id: 'ezX3XxmAGuDQXY4OdRaq---Q30_2BVBjTmMKCxkYos12',
    source: 'zX3XxmAGuDQXY4OdRaq--',
    target: 'Q30_2BVBjTmMKCxkYos12',
    animated: true
    },
    {
    id: 'ezX3XxmAGuDQXY4OdRaq---xCOdpNh6iFQlyxxdhb0vL',
    source: 'zX3XxmAGuDQXY4OdRaq--',
    target: 'xCOdpNh6iFQlyxxdhb0vL',
    animated: true
    },
    {
    id: 'ezX3XxmAGuDQXY4OdRaq---5SswHHs8T1ZSnrTFmmWJB',
    source: 'zX3XxmAGuDQXY4OdRaq--',
    target: '5SswHHs8T1ZSnrTFmmWJB',
    animated: true
    },
    {
    id: 'ezX3XxmAGuDQXY4OdRaq---qQ4gZa57pDQ_crc9sTk1X',
    source: 'zX3XxmAGuDQXY4OdRaq--',
    target: 'qQ4gZa57pDQ_crc9sTk1X',
    animated: true
    }
]
(4) The article must be less than 100 words.
`;
