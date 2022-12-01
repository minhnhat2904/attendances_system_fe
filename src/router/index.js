import { createRouter, createWebHistory } from 'vue-router'
import authMiddleware from './middleware/auth-middleware'
import CreateRequestView from '../views/CreateRequestView.vue'
import Login from '@/views/auth/Login.vue'
import adminLogin from '@/views/admin/Login.vue'
import Forgot from '@/views/auth/Forgot.vue'
import Register from '@/views/auth/Register.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
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
			component: () => import('../views/ChangePasswordView.vue'),
		},
		{
			path: '/workingReport',
			name: 'changworkingReportePassword',
			meta: { layout: 'defaultLayout' },
			component: () => import('../views/WorkingTimeReportView.vue'),
		},
		{
			path: '/requestHistory',
			name: 'requestHistory',
			meta: { layout: 'defaultLayout' },
			component: () => import('../views/RequestHistoryView.vue'),
		},

		// ADMIN ROUTES
		{
			path: '/admin/login',
			name: 'adminLogin',
			component: adminLogin,
			meta: { layout: 'authLayout' },
		},
		{
			path: '/admin/userManager',
			name: 'userManager',
			meta: { layout: 'adminLayout' },
			component: () => import('../views/admin/UserManagement.vue'),
		},
		{
			path: '/admin/createQr',
			name: 'createQr',
			meta: { layout: 'adminLayout' },
			component: () => import('../views/admin/CreateQR.vue'),
		},
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
	],
})

router.beforeEach(authMiddleware)

export default router
