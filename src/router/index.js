import { createRouter, createWebHistory } from 'vue-router'
import authMiddleware from './middleware/auth-middleware'
import Login from '@/views/auth/Login.vue'
import Forgot from '@/views/auth/Forgot.vue'
import Register from '@/views/auth/Register.vue'
import adminLogin from '@/views/admin/Login.vue'
import ListUser from '../views/accountant/ListUser.vue'
import UserManagement from '../views/admin/UserManagement.vue'
import CreateRequestView from '../views/employee/CreateRequestView.vue'
import HistoryRequest from '../views/headDepartment/HistoryRequest.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		// AUTH ROUTES
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: { layout: 'authLayout' },
		},
		{
			name: 'register',
			path: '/register',
			component: Register,
			meta: { layout: 'authLayout' },
		},
		{
			name: 'forgot-password',
			path: '/forgot-password',
			component: Forgot,
			meta: { layout: 'authLayout' },
		},
		// USER ROUTES
		{
			path: '/',
			name: 'createRequest',
			meta: { layout: 'defaultLayout' },
			component: CreateRequestView,
		},
		{
			path: '/changePassword',
			name: 'changePassword',
			meta: { layout: 'defaultLayout' },
			component: () => import('../views/employee/ChangePasswordView.vue'),
		},
		{
			path: '/workingReport',
			name: 'changworkingReportePassword',
			meta: { layout: 'defaultLayout' },
			component: () => import('../views/employee/WorkingTimeReportView.vue'),
		},
		{
			path: '/requestHistory',
			name: 'requestHistory',
			meta: { layout: 'defaultLayout' },
			component: () => import('../views/employee/RequestHistoryView.vue'),
		},

		// ADMIN ROUTES
		{
			path: '/admin/',
			name: 'userManager',
			meta: { layout: 'defaultLayout' },
			component: UserManagement,
		},
		{
			path: '/admin/login',
			name: 'adminLogin',
			component: adminLogin,
			meta: { layout: 'authLayout' },
		},
		{
			path: '/admin/createQr',
			name: 'createQr',
			meta: { layout: 'defaultLayout' },
			component: () => import('../views/admin/CreateQR.vue'),
		},
		// HEAD DEPARTMENT ROUTERS
		{
			path: '/headDepartment/',
			name: 'historyRequest',
			meta: { layout: 'defaultLayout' },
			component: HistoryRequest,
		},
		{
			path: '/headDepartment/confirmRequest',
			name: 'confirmRequest',
			meta: { layout: 'defaultLayout' },
			component: () => import('../views/headDepartment/ConfrimRequest.vue'),
		},

		// ACCOUNTANT ROUTERS
		{
			path: '/accountant/',
			name: 'List user',
			meta: { layout: 'defaultLayout' },
			component: ListUser,
		},
	],
})

// router.beforeEach(authMiddleware)

export default router
