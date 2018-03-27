<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">
      <!--
      <router-link v-if="item.children.length===1 && !item.children[0].children" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
        <p :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon" class="dot"></svg-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
        </p>
      </router-link>

      <div v-else :index="item.name||item.path" :key="item.path">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon" class="dot"></svg-icon>
          <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.path" :class="isActive(child.path,$route.path)">
            <p :index="item.path+'/'+child.path">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon" class="dot"></svg-icon>
              <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
            </p>
          </router-link>
        </template>
      </div>
      -->
      <div :index="item.name||item.path" :key="item.path">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon" class="dot"></svg-icon>
          <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <p class="title" v-if="!child.meta.icon">{{child.meta.title}}</p>
          <router-link v-if="child.meta.icon" :to="item.path+'/'+child.path" :key="child.path" :class="isActive(child.path,$route.path)">
            <p :index="item.path+'/'+child.path">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon" class="dot"></svg-icon>
              <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
            </p>
          </router-link>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Hamburger from '@/components/Hamburger'

export default {
  name: 'SidebarItem',
  components: {
    // Hamburger
  },
  props: {
    routes: {
      type: Array
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
  },
  methods: {
    isActive(value, route) {
      const nValue = value.split('/').length > 1 ? value.split('/')[value.split('/').length - 1 ] : value
      const aRoute = route.split('/')
      if (aRoute[aRoute.length - 1 ] === nValue) {
        return 'active'
      } else {
        return ''
      }
    },
    auth(authArr) {
      if(authArr === undefined) {
        return true;
      }
      var reportsName = this.$store.state.auth.reportsName;

      if(authArr.length === 1) {
        if(reportsName.indexOf(authArr[0]) > -1) {
          return true
        } else {
          return false
        }
      } else if (authArr.length === 2) {
        var flagIndex = false
        for(var i=0;i<authArr.length;i++) {
          if(reportsName.indexOf(authArr[i]) > -1) {
            flagIndex = true
            return true
          }
        }
        return false
      }
    },
    // toggleSideBar() {
    //   this.$store.dispatch('ToggleSideBar')
    // }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.dot{
  position: relative;
  left: 15px;
}
.active{
  color: #F25B56;
}
.title{
  color:white;
}
</style>


