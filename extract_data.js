
import fs from 'fs';
import path from 'path';

const dataDir = 'c:/Users/sruja/Desktop/lab/vijnana-lab/data';
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('_data.ts'));

const report = {};

files.forEach(file => {
    const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
    const subject = file.replace('_data.ts', '');
    report[subject] = [];

    // Simple regex to find blocks of labs
    // Looking for boards and title
    const labs = content.split('id:').slice(1);
    
    labs.forEach(lab => {
        const boardsMatch = lab.match(/boards:\s*\[(.*?)\]/);
        const titleMatch = lab.match(/title:\s*['"](.*?)['"]/);
        const standardMatch = lab.match(/standards:\s*\[(.*?)\]/);

        if (boardsMatch && titleMatch) {
            const boards = boardsMatch[1].split(',').map(b => b.trim().replace(/['"]/g, ''));
            const title = titleMatch[1];
            const standards = standardMatch ? standardMatch[1].split(',').map(s => s.trim().replace(/['"]/g, '')) : [];
            
            report[subject].push({ title, boards, standards });
        }
    });
});

console.log(JSON.stringify(report, null, 2));
