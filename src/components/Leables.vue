<template>
    <span class="leables"  :class=" router== names.path ? 'active' : ''" @click="handleChange(names.path)">
        <router-link :to="names.path">
            {{names.meta.title}}
        </router-link>
        <i class="el-icon-close" @click="handleClose(names.path)"></i>
    </span>
    
</template>

<script>
export default {
  props: ['names'],
  methods: {
    handleClose(tag) {
      this.$emit('removeTable', tag)
    },
    handleChange(tag) {
      this.$emit('changeTab', tag)
    }
  },
  computed: {
    router() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.leables {
  padding: 5px 10px;
  border: 1px solid #eee;
  border-bottom: 0;
  border-radius: 2px;
  cursor: pointer;
  margin-right: 5px;
  i{
    color: #888;
  }
}
.leables a {
  color: #343334;
  text-decoration: none;
}
.active {
  background: #eee;
}
.active a {
  color: #409eff;
}
</style>