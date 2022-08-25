<script setup lang="ts">
import { RouterView } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import { useLayoutStore } from '@/stores/layout';
const layoutStore = useLayoutStore();
const setThemeMode = () => {
  //设置暗黑还是浅色模式
  console.warn('layoutStore.dark', layoutStore.dark);
  if (layoutStore.dark) {
    document.querySelector('html')?.classList.add('dark');
  } else {
    document.querySelector('html')?.classList.remove('dark');
  }
};
setThemeMode();
layoutStore.$subscribe((mutation, state) => {
  if (mutation.events.key === 'dark') {
    setThemeMode();
  }
  console.log('layoutStore subscribe', mutation.events.key, state);
});
</script>

<template>
  <RouterView />
</template>

<style scoped lang="scss">
header {
  line-height: 1.5;
  max-height: 100vh;
  > img {
    width: 100px;
    height: 100px;
  }
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
