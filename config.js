
export const Config = {
	baseurl: 'http://localhost:8081',
	endpoints:  {
		login: '/api/session',
		members: '/api/members/',
		seasons: '/api/seasons',
		seasonNext: '/api/seasons/next',
		projects: '/api/projects/',
		projectSummary: '/api/projects/summary',
		projectDetails: '/api/projects/details',
		projectYears: '/api/projects/years',
		createWorkingHours: '/api/projectItems',
		activeProjects: '/api/projects/active',
		memberWorkinghours: '/api/members/',
		activeMemberWorkinghours: '/api/members/active',
		memberOverview: '/api/members/overview',
		memberDetails: '/api/members/detail',
		membersList: '/api/members/list',
		membersGraph: '/api/members/distribution',
		membersSummary: '/api/members/summary',
	}
}

