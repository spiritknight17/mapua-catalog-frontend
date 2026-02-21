export class CalendarComponentModel {
    id: string;
    title: string;
    description: string;
    status: string;
    date: Date;
    assignee?: string;
    project?: string;
    isExpanded?: boolean = false;
    constructor(data: Partial<CalendarComponentModel>){
        this.id = data.id || Math.random().toString(36).substring(2);
        this.title = data.title || '';
        this.description = data.description || '';
        this.status = data.status || '';
        this.date = data.date ? new Date(data.date) : new Date();
        this.assignee = data.assignee;
        this.project = data.project;
        this.isExpanded = false;
    }
    get daysRemaining(): number {
        const today = new Date();
        const diffTime = this.date.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    get priorityStatus(): 'High' | 'Medium' | 'Low'{
        const days = this.daysRemaining;
        if (days <= 3) return 'High';
        if (days <= 7) return 'Medium';
        return 'Low';
    }
    get tasksStatus(): 'To Do' | 'In Progress' | 'Review' | 'Mechanical' | 'Completed'{
        const s = (this.status || 'To Do') as any;
        if (s === 'To Do') return 'To Do';
        if (s === 'In Progress') return 'In Progress';
        if (s === 'Review') return 'Review';
        if (s === 'Mechanical') return 'Mechanical';
        if (s === 'Completed') return 'Completed';
        return 'To Do';
    }
}

