import meetingNotesTemplate from './meeting-notes.json'
import projectProposalTemplate from './project-proposal.json'
import weeklyReportTemplate from './weekly-report.json'

export interface Template {
  id: string
  name: string
  description: string
  content: any
}

export const templates: Template[] = [
  {
    id: 'meeting-notes',
    name: 'Meeting Notes',
    description:
      'A structured template for documenting meetings with agenda, discussion points, and action items',
    content: meetingNotesTemplate,
  },
  {
    id: 'project-proposal',
    name: 'Project Proposal',
    description:
      'Comprehensive template for creating project proposals with objectives, timeline, and budget',
    content: projectProposalTemplate,
  },
  {
    id: 'weekly-report',
    name: 'Weekly Status Report',
    description:
      'Track weekly progress with completed tasks, ongoing work, and blockers',
    content: weeklyReportTemplate,
  },
]

export { meetingNotesTemplate, projectProposalTemplate, weeklyReportTemplate }
