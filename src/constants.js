
const BASE_API = process.env.REACT_APP_BASE_DOMAIN + "/api/"

const API_CONSTANT_MAP = {
	"login": `${BASE_API}login`,
	"members": `${BASE_API}members`,
	"member": `${BASE_API}member`,
	"projects": `${BASE_API}projects`,
	"project": `${BASE_API}project`,
	"seasons": `${BASE_API}seasons`
}

export default API_CONSTANT_MAP;
