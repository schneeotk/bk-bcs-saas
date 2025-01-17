/**
 * @file dashboard router 配置
 */

// const DashboardIndex = () => import(/* webpackChunkName: 'dashboard' */'@/views/dashboard')
const DashboardNamespace = () => import(/* webpackChunkName: 'dashboard-namespace' */'@/views/dashboard/namespace.tsx')
const DashboardWorkloadDeployments = () => import(/* webpackChunkName: 'dashboard-workload' */'@/views/dashboard/workload/deployments.vue')
const DashboardWorkloadDaemonSets = () => import(/* webpackChunkName: 'dashboard-workload' */'@/views/dashboard/workload/daemonsets.vue')
const DashboardWorkloadStatefulSets = () => import(/* webpackChunkName: 'dashboard-workload' */'@/views/dashboard/workload/statefulsets.vue')
const DashboardWorkloadCronJobs = () => import(/* webpackChunkName: 'dashboard-workload' */'@/views/dashboard/workload/cronjobs.vue')
const DashboardWorkloadJobs = () => import(/* webpackChunkName: 'dashboard-workload' */'@/views/dashboard/workload/jobs.vue')
const DashboardWorkloadPods = () => import(/* webpackChunkName: 'dashboard-workload' */'@/views/dashboard/workload/pods.vue')
const DashboardWorkloadGameStatefulSets = () => import(/* webpackChunkName: 'dashboard-workload' */'@/views/dashboard/workload/gamestatefulsets.vue')
const DashboardWorkloadGameDeployments = () => import(/* webpackChunkName: 'dashboard-workload' */'@/views/dashboard/workload/gamedeployments.vue')
const DashboardWorkloadCustomObjects = () => import(/* webpackChunkName: 'dashboard-workload' */'@/views/dashboard/workload/customobjects.vue')
const DashboardWorkloadDetail = () => import(/* webpackChunkName: 'dashboard-workload-detail' */'@/views/dashboard/workload/detail/index.vue')

// network
const DashboardNetworkIngress = () => import(/* webpackChunkName: 'dashboard-network' */'@/views/dashboard/network/ingress.vue')
const DashboardNetworkService = () => import(/* webpackChunkName: 'dashboard-network' */'@/views/dashboard/network/service.vue')
const DashboardNetworkEndpoints = () => import(/* webpackChunkName: 'dashboard-network' */'@/views/dashboard/network/endpoints.vue')

// configs
const DashboardConfigsConfigMaps = () => import(/* webpackChunkName: 'dashboard-configs' */'@/views/dashboard/configuration/config-maps.vue')
const DashboardConfigsSecrets = () => import(/* webpackChunkName: 'dashboard-configs' */'@/views/dashboard/configuration/secrets.vue')

// storage
const DashboardStoragePersistentVolumesClaims = () => import(/* webpackChunkName: 'dashboard-storage' */'@/views/dashboard/storage/persistent-volumes-claims.vue')
const DashboardStoragePersistentVolumes = () => import(/* webpackChunkName: 'dashboard-storage' */'@/views/dashboard/storage/persistent-volumes.vue')
const DashboardStorageStorageClass = () => import(/* webpackChunkName: 'dashboard-storage' */'@/views/dashboard/storage/storage-class.vue')

// rbac
const DashboardRbacServiceAccounts = () => import(/* webpackChunkName: 'dashboard-rbac' */'@/views/dashboard/rbac/service-accounts.vue')

const childRoutes = [
    // dashboard 首页
    // {
    //     path: ':projectCode/dashboard',
    //     name: 'dashboard',
    //     component: DashboardIndex
    // },
    {
        path: ':projectCode/dashboard',
        name: 'dashboard',
        redirect: {
            name: 'dashboardNamespace'
        },
        meta: { isDashboard: true }
    },
    // dashboard 命名空间
    {
        path: ':projectCode/dashboard/namespace',
        name: 'dashboardNamespace',
        component: DashboardNamespace,
        meta: { isDashboard: true }
    },
    // dashboard workload
    {
        path: ':projectCode/dashboard/workload',
        name: 'dashboardWorkload',
        redirect: {
            name: 'dashboardWorkloadDeployments'
        },
        meta: { isDashboard: true }
    },
    // dashboard workload deployments
    {
        path: ':projectCode/dashboard/workload/deployments',
        name: 'dashboardWorkloadDeployments',
        component: DashboardWorkloadDeployments,
        meta: { isDashboard: true }
    },
    // dashboard workload daemonsets
    {
        path: ':projectCode/dashboard/workload/daemonsets',
        name: 'dashboardWorkloadDaemonSets',
        component: DashboardWorkloadDaemonSets,
        meta: { isDashboard: true }
    },
    // dashboard workload statefulsets
    {
        path: ':projectCode/dashboard/workload/statefulsets',
        name: 'dashboardWorkloadStatefulSets',
        component: DashboardWorkloadStatefulSets,
        meta: { isDashboard: true }
    },
    // dashboard workload cronjobs
    {
        path: ':projectCode/dashboard/workload/cronjobs',
        name: 'dashboardWorkloadCronJobs',
        component: DashboardWorkloadCronJobs,
        meta: { isDashboard: true }
    },
    // dashboard workload jobs
    {
        path: ':projectCode/dashboard/workload/jobs',
        name: 'dashboardWorkloadJobs',
        component: DashboardWorkloadJobs,
        meta: { isDashboard: true }
    },
    // dashboard workload pods
    {
        path: ':projectCode/dashboard/workload/pods',
        name: 'dashboardWorkloadPods',
        component: DashboardWorkloadPods,
        meta: { isDashboard: true }
    },
    // dashboard workload gamestatefulsets
    {
        path: ':projectCode/dashboard/workload/gamestatefulsets',
        name: 'dashboardWorkloadGameStatefulSets',
        component: DashboardWorkloadGameStatefulSets,
        meta: { isDashboard: true }
    },
    // dashboard workload gamedeployments
    {
        path: ':projectCode/dashboard/workload/gamedeployments',
        name: 'dashboardWorkloadGameDeployments',
        component: DashboardWorkloadGameDeployments,
        meta: { isDashboard: true }
    },
    // dashboard workload customobjects
    {
        path: ':projectCode/dashboard/workload/customobjects',
        name: 'dashboardWorkloadCustomObjects',
        component: DashboardWorkloadCustomObjects,
        meta: { isDashboard: true }
    },
    // dashboard workload detail
    {
        path: ':projectCode/dashboard/workload/:category/:namespace/:name/detail',
        name: 'dashboardWorkloadDetail',
        props: true,
        component: DashboardWorkloadDetail,
        meta: { isDashboard: true }
    },
    // network
    {
        path: ':projectCode/dashboard/network',
        name: 'dashboardNetwork',
        redirect: {
            name: 'dashboardNetworkIngress'
        },
        meta: { isDashboard: true }
    },
    // network ingress
    {
        path: ':projectCode/dashboard/network/ingress',
        name: 'dashboardNetworkIngress',
        component: DashboardNetworkIngress,
        meta: { isDashboard: true }
    },
    // network service
    {
        path: ':projectCode/dashboard/network/service',
        name: 'dashboardNetworkService',
        component: DashboardNetworkService,
        meta: { isDashboard: true }
    },
    // network endpoints
    {
        path: ':projectCode/dashboard/network/endpoints',
        name: 'dashboardNetworkEndpoints',
        component: DashboardNetworkEndpoints,
        meta: { isDashboard: true }
    },
    // storage
    {
        path: ':projectCode/dashboard/storage',
        name: 'dashboardStorage',
        redirect: {
            name: 'dashboardStoragePersistentVolumes'
        },
        meta: { isDashboard: true }
    },
    // storage persistent-volumes
    {
        path: ':projectCode/dashboard/storage/persistent-volumes',
        name: 'dashboardStoragePersistentVolumes',
        component: DashboardStoragePersistentVolumes,
        meta: { isDashboard: true }
    },
    // storage persistent-volumes-claims
    {
        path: ':projectCode/dashboard/storage/persistent-volumes-claims',
        name: 'dashboardStoragePersistentVolumesClaims',
        component: DashboardStoragePersistentVolumesClaims,
        meta: { isDashboard: true }
    },
    // storage storage-class
    {
        path: ':projectCode/dashboard/storage/storage-class',
        name: 'dashboardStorageStorageClass',
        component: DashboardStorageStorageClass,
        meta: { isDashboard: true }
    },
    // configs
    {
        path: ':projectCode/dashboard/configs',
        name: 'dashboardConfigs',
        redirect: {
            name: 'dashboardConfigsConfigMaps'
        },
        meta: { isDashboard: true }
    },
    // configs config-maps
    {
        path: ':projectCode/dashboard/configs/config-maps',
        name: 'dashboardConfigsConfigMaps',
        component: DashboardConfigsConfigMaps,
        meta: { isDashboard: true }
    },
    // configs secrets
    {
        path: ':projectCode/dashboard/configs/secrets',
        name: 'dashboardConfigsSecrets',
        component: DashboardConfigsSecrets,
        meta: { isDashboard: true }
    },
    // rbac
    {
        path: ':projectCode/dashboard/rbac',
        name: 'dashboardRbac',
        redirect: {
            name: 'dashboardRbacServiceAccounts'
        },
        meta: { isDashboard: true }
    },
    // rbac service accounts
    {
        path: ':projectCode/dashboard/rbac/service-accounts',
        name: 'dashboardRbacServiceAccounts',
        component: DashboardRbacServiceAccounts,
        meta: { isDashboard: true }
    }
]

export default childRoutes
