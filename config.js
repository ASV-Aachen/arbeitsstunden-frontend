
export const Config = {
	//baseurl: 'https://workinghoursbackend.ralf-bettermann.de',
	baseurl: 'http://localhost:8081',
	endpoints:  {
		login: '/api/session',
		members: '/api/members/',
		memberCreate: '/api/members/create',
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

