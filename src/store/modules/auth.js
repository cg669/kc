import { getAuth } from '@/api/coorperation'
import { asyncRouterMap, constantRouterMap } from '@/router/index'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param {Array} reportsPath 异步加载路由
 * @param {Array|String} match 后台返回的有权限的路由
 * @return {Boolean} 匹配的可以访问的路由
 * @private
 */
function filterRouter(reportsPath,match) {
    if (Object.prototype.toString.call(match) === '[object String]') {
        return reportsPath.indexOf(match) > -1;
    } else if (Object.prototype.toString.call(match) === '[object Array]') {
        for(var j=0;j<match.length;j++) {
            for(var i=0;i<reportsPath.length;i++) {
                if(reportsPath[i] === match[j]) {
                    return false;
                    break;
                }
            }
        }
        return true;
    }
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param {Array} asyncRouterMap 异步加载路由
 * @param {Array} reportsPath 后台返回的有权限的路由
 * @return {Array} 匹配的可以访问的路由
 * @private
 */

function handleAsyn(asyncRouterMap,reportsPath) {
    return asyncRouterMap.filter((item) => {
        if(filterRouter(reportsPath,item.auth)) {
            if(item.children) {
                return item.children = handleAsyn(item.children,reportsPath)
            } else {
                return true
            }
        } else {
            return false
        }
    })
}

const auth = {
    state:{
        tab:'',
        reportsPath:'',
        reportsField:'',
        routers:asyncRouterMap,
        addRouters:[]
    },
    mutations:{
        SET_Tab: (state,data) => {
            state.tab = data
        },
        SET_REPORTSPATH: (state,data) => {
            state.reportsPath = data
        },
        SET_REPORTSField: (state,data) => {
            state.reportsField = data
        },
        SET_ROUTERS:(state,routers) => {
            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
        }
    },
    actions:{
        GenerateRoutes({ commit },isSecondary) {
            return new Promise((resolve,reject) => {
                getAuth().then((res) => {
                    const data = res.data
                    var reportArr = []
                    var reportsPath = []
                    var reportDetailArr = []
                    var tab = [];
                    var reportName = ['一对一报表/合作商报表','一对一报表/用户明细表','代理卡报表/合作商报表','代理卡报表/用户明细表','学堂注册报表/合作商报表','学堂注册报表/用户明细表']
                    data.map((item) => {
                        if(reportName.indexOf(item.name) > -1) {
                            reportArr.push(item)
                        }
                        if(item.pid === null) {
                            tab.push(item.name)
                        }
                        if(!item.field) {
                            reportsPath.push(item.name)
                        }
                    })
                    reportsPath.push('auth')
                    reportArr.forEach((report,index) => {
                        var temp = {};
                        temp.name = report.name
                        temp.fields = []
                        data.map((item) => {
                            if(report.id === item.pid) {
                                temp.fields.push(item.field)
                            }
                        })
                        reportDetailArr.push(temp)
                    })
                    commit('SET_Tab',tab)
                    commit('SET_REPORTSPATH',reportsPath)
                    commit('SET_REPORTSField',reportDetailArr)
                    let accessedRouters
                    accessedRouters = handleAsyn(asyncRouterMap,reportsPath)
                    commit('SET_ROUTERS', accessedRouters)
                    resolve(res)
                }).catch((error) => {
                    reject(error)
                })
            })
        }
    }
}
export default auth