<template>
  <div>
    <header class="p-3 bg-dark text-white">
      <div class="container">
        <div
          class="
            d-flex
            flex-wrap
            align-items-center
            justify-content-center justify-content-lg-start
          "
        >
          <a
            href="/"
            class="
              d-flex
              align-items-center
              mb-2 mb-lg-0
              text-white text-decoration-none
            "
          >
            <img
              src="https://www.promoe.com.sa//assets/imgs/logo/pe_logo_primary_dark_bg.svg"
              alt="Promo Logo"
              width="40"
              height="40"
              class="fill-current"
            />
          </a>
          <ul
            class="
              nav
              col-12 col-lg-auto
              me-lg-auto
              mb-2
              justify-content-center
              mb-md-0
            "
          >
            <li>
              <nuxt-link to="/" class="nav-link" style="color: white"
                >PE Files</nuxt-link
              >
            </li>
          </ul>

          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <nuxt-link
                v-if="!user"
                to="/signin"
                class="nav-link"
                style="color: white"
                >Login</nuxt-link
              >
            </li>
            <li class="nav-item">
              <a
                v-if="user"
                @click="signout"
                class="nav-link"
                style="color: white"
                >Logout</a
              >
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="container my-4">
      <div class="d-flex flex-row">
        <div class="title col-md-6 mb-4">
          <table class="table container">
          <thead style="color: #d9d5d4">
            <tr>
              <th scope="col">File Name</th>
              <th scope="col">Publisher</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody style="color: #35495e">
            <tr v-for="(fileName, index) in filees" :key="index">
              <td>{{ fileName.fileName }}</td>
              <td>{{ fileName.publisher }}</td>
              <td>
                <a href="#" @click="removeFiles(fileName, index)"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash mr-10"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    /></svg
                ></a>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
// import 'firebase/firestore'
// import 'firebase/database'
// import 'firebase/storage'
export default {
  data() {
    return {
      user: '',
    }
  },
   computed: {
    filees() {
      return this.$store.state.filees
    },
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)

      this.user = user
    })
  },

  methods: {
    signout() {
      firebase
        .auth()
        .signOut()
        .then((result) => {
          console.log(result)
          this.user = ''
          this.$router.push('/')
        })
    },
  }}
</script>

<style scoped>
.title {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
  display: block;
  font-weight: 200;
  /* font-size: 100px; */
  color: #35495e;
}
</style>
  