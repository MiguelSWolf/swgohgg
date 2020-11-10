<template>
  <div id="app">
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img src="@/assets/logo.png" />
        </a>

        <a
          @click="menuActive = !menuActive"
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': menuActive }">
        <div class="navbar-start">
          <router-link :to="{ name: 'counters' }" class="navbar-item">
            Grand Arena
          </router-link>

          <router-link :to="{ name: 'tw' }" class="navbar-item">
            Territory War
          </router-link>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Territory Battle
            </a>

            <div class="navbar-dropdown">
              <router-link :to="{ name: 'tbls' }" class="navbar-item">
                Light side
              </router-link>
              <router-link :to="{ name: 'tbds' }" class="navbar-item">
                Dark side
              </router-link>
            </div>
          </div>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              More
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                Contact
              </a>
              <hr class="navbar-divider" />
              <a class="navbar-item">
                Report an issue
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view />

    <footer class="footer">
      <div class="content has-text-centered has-text-white">
        <p>
          <strong class="has-text-white">SWGOH Army</strong> by
          <a href="https://www.linkedin.com/in/miguel-wolf/">Miguel Wolf</a>.
          The source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
        </p>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuActive: false
    };
  }
};
</script>
<style lang="scss">
@import "assets/style/index";
.navbar-brand {
  .navbar-item {
    padding: 0;
    img {
      max-height: 100%;
      height: 52px;
    }
  }
}
</style>
