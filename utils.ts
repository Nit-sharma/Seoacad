
import { SEOProject } from './types';

export const downloadProjectCSV = (project: SEOProject) => {
    const rows = [['Category', 'Subcategory', 'Task', 'Completed', 'Impact']];

    // Basic Details Section
    rows.push(['Basic Details', 'Identity', `Company: ${project.basicDetails?.companyName || 'N/A'}`, '', '']);
    rows.push(['Basic Details', 'Identity', `Website: ${project.basicDetails?.website || 'N/A'}`, '', '']);
    rows.push(['Basic Details', 'Identity', `Industry: ${project.basicDetails?.industry || 'N/A'}`, '', '']);
    rows.push(['Basic Details', 'Strategy', `Target Location: ${project.basicDetails?.targetLocation || 'N/A'}`, '', '']);

    // Tasks Section
    project.pillars.forEach(pillar => {
        pillar.categories.forEach(category => {
            category.tasks.forEach(task => {
                rows.push([
                    pillar.title,
                    category.title,
                    task.question,
                    task.completed ? 'Yes' : 'No',
                    task.impact
                ]);
            });
        });
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${project.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_seo_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
