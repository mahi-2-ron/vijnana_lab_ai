
const fs = require('fs');
const path = require('path');

const dataDir = 'c:/Users/sruja/Desktop/lab/vijnana-lab/data';
const subjects = ['physics', 'chemistry', 'biology', 'math', 'cs'];

const boardMap = {
    'CBSE': {},
    'Karnataka PUC': {},
    'ICSE': {}
};

subjects.forEach(subject => {
    const filePath = path.join(dataDir, `${subject}_data.ts`);
    if (!fs.existsSync(filePath)) return;
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Find each lab object
    const labBlocks = content.split(/id:\s*['"]\w+\d+['"]/);
    labBlocks.forEach(block => {
        const titleMatch = block.match(/title:\s*['"](.*?)['"]/);
        const boardsMatch = block.match(/boards:\s*\[([\s\S]*?)\]/);
        const standardMatch = block.match(/standards:\s*\[([\s\S]*?)\]/);

        if (titleMatch && boardsMatch) {
            const title = titleMatch[1];
            const boardsStr = boardsMatch[1];
            const standardStr = standardMatch ? standardMatch[1] : '';
            
            const boards = boardsStr.split(',').map(b => b.trim().replace(/['"]/g, ''));
            const standards = standardStr.split(',').map(s => s.trim().replace(/['"]/g, ''));

            boards.forEach(board => {
                if (!boardMap[board]) boardMap[board] = {};
                if (!boardMap[board][subject]) boardMap[board][subject] = [];
                boardMap[board][subject].push({ title, standards });
            });
        }
    });
});

console.log(JSON.stringify(boardMap, null, 2));
