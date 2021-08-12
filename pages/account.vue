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

    <div class="box mdl-grid" style="width: 1000px; margin-top: 100px">
      <div
        id="files"
        class="mdl-data-tabledynamic mdl-shadow--2dp"
        style="margin-top: 100px"
      >
        <div class="mdl-data-tabledynamic__title">
          <h2 class="mdl-data-tabledynamic__title-text" style="color: #35495e">
            Files
          </h2>
          <div class="mdl-data-tabledynamic__actions">
            <div>
              <b-button
                v-b-modal.modal-xl
                style="
                  background-color: #eff2f5;
                  font-weight: 200;
                  color: #35495e;
                "
                class="btn btn-outline-secondary"
                >Add file</b-button
              >

              <b-modal
                style="color: #35495e"
                id="modal-xl"
                size="xl"
                hide-backdrop
                content-class="shadow"
                title="Upload files"
                @ok="addFile"
              >
                <div class="my-2">
                  <b-card
                    style="
                      background-color: #e6e6e6;
                      color: #35495e;
                      font-weight: 200;
                    "
                    class="containe"
                  >
                    <b-form-group
                      label="File Name:"
                      label-for="nested-name"
                      label-cols-sm="3"
                      label-align-sm="right"
                    >
                      <b-form-input
                        v-model="fileName"
                        id="nested-name"
                        required
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      label="Publisher:"
                      label-for="nested-publisher"
                      label-cols-sm="3"
                      label-align-sm="right"
                    >
                      <b-form-input
                        v-model="publisher"
                        id="nested-publisher"
                        required
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      label="File:"
                      label-for="nested-file"
                      label-cols-sm="3"
                      label-align-sm="right"
                    >
                      <b-form-file
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        @change="previewImage"
                        multiple
                        required
                      ></b-form-file>
                    </b-form-group>

                    <b-form-group
                      label="The file is "
                      label-cols-sm="3"
                      label-align-sm="right"
                      class="mb-0"
                      v-slot="{ ariaDescribedby }"
                    >
                      <b-form-radio-group
                        v-model="selected"
                        id="selecte"
                        class="pt-2"
                        :options="['Private', 'Public']"
                        :aria-describedby="ariaDescribedby"
                        required
                      ></b-form-radio-group>
                    </b-form-group>
                  </b-card>
                </div>
              </b-modal>
            </div>
          </div>
        </div>

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
              <td>{{ fileName.selected }}</td>
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
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
const db = firebase.firestore()
export default {
  data() {
    return {
      user: '',
      fileName: '',
      publisher: '',
      selected: '',
      fileData: null,
      picture: null,
      uploadValue: 0,
      files: [],
    }
  },
  computed: {
    filees() {
      return this.$store.state.filees
    },
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user

      if (!this.user) this.$router.push('/')
    }),
      firebase
        .firestore()
        .collection('files')
        .get()
        .then((res) => {
          res.forEach((x) => {
            this.$store.commit('setFiles', x.data())
          })
        })
  },

  methods: {
    previewImage(event) {
      this.uploadValue = 0
      this.picture = null
      this.fileData = event.target.files[0]
    },
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

    addFile() {
      if (this.fileName) {
        firebase
          .firestore()
          .collection('files')
          .add({})
          .then((res) => {
            firebase
              .firestore()
              .collection('files')
              .doc(res.id)
              .set({
                fileName: this.fileName,
                publisher: this.publisher,
                selected: this.selected,
                id: res.id,
              })
              .then(() => {
                this.$store.commit('setFiles', {
                  fileName: this.fileName,
                  publisher: this.publisher,
                  selected: this.selected,
                  id: res.id,
                })
              })
          })
      }
    
      this.picture = null
      const storageRef = firebase
        .storage()
        .ref(`${this.fileData.name}`)
        .put(this.fileData)
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 1000
        },
        (error) => {
          console.log(error.message)
        },
        () => {
          this.uploadValue = 1000
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url
          })
        }
      )
    },

    removeFiles(fileName, index) {
      firebase
        .firestore()
        .collection('files')
        .doc(fileName.id)
        .delete()
        .then(() => {
          console.log('successfully deleted document')
          this.$store.commit('removeFiles', index)
        })
         this.$bvModal.msgBoxOk('File was deleted successfully', {
          title: 'Confirmation',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
    },
  },
}
</script>

<style>

.box {
  position: absolute;
  top: 20%;
  left: 50%;
  width: 900px;
  padding: 40px;
  transform: translate(-50%, -50%);
}
#files.mdl-data-tabledynamic {
  width: 100%;
}

.mdl-data-tabledynamic {
  overflow: visible !important;
}

.mdl-data-tabledynamic__title {
  width: 100%;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  color: #000;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: stretch;
  -ms-flex-pack: stretch;
  justify-content: stretch;
  line-height: normal;
  -webkit-perspective-origin: 165px 56px;
  perspective-origin: 165px 56px;
  -webkit-transform-origin: 165px 56px;
  transform-origin: 165px 56px;
  box-sizing: border-box;
  display: block;
  padding-left: 25px;
  padding-bottom: 10px;
  padding-top: 30px;
}

.mdl-data-tabledynamic {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  font-size: 16px;
  font-weight: 400;
  overflow: hidden;
  width: 330px;
  z-index: 1;
  position: relative;
  background: #fff;
  border-radius: 2px;
  box-sizing: border-box;
}

.mdl-data-tabledynamic__title-text,
.h2.mdl-data-tabledynamic__title-text {
  float: left;
  font-weight: 400 !important;
}

.mdl-data-tabledynamic__title-text {
  -webkit-align-self: flex-end;
  -ms-flex-item-align: end;
  align-self: flex-end;
  color: inherit;
  display: block;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  font-size: 24px;
  font-weight: 300;
  line-height: normal;
  overflow: hidden;
  -webkit-transform-origin: 149px 48px;
  transform-origin: 149px 48px;
  margin: 0;
}

.mdl-data-tabledynamic__actions {
  float: right;
  margin-right: 12px;
}

.mdl-data-tabledynamic__actions .mdl-button {
  min-width: 45px;
  padding: 0 10px;
}

.mdl-data-tabledynamic__content {
  overflow: visible !important;
  color: rgba(0, 0, 0, 0.54);
  font-size: 1rem;
  line-height: 18px;
  padding: 0;
  width: 100%;
}

.mdl-data-tabledynamic__content .mdl-data-table {
  width: 100%;
  border-left: 0;
  border-right: 0;
}

.mdl-data-tabledynamic__content .mdl-data-table {
  box-shadow: none !important;
}

.mdl-data-table .mdl-data-table__label {
  font-weight: 500;
  color: #afafaf;
}

.mdl-data-table tr.is-selected .mdl-data-table__label {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.45) !important;
}

.mdl-data-table__row--selectable tr:hover,
.mdl-data-table__row--selectable tr:active,
.mdl-data-table__row--selectable tr.active {
  background: #f5f5f5;
}

.mdl-dialog__addContent .mdl-dialog__actions {
  padding-top: 0;
}

.mdl-dialog__addContent {
  text-align: left;
  width: 320px;
  height: 180px;
  display: block;
  position: absolute;
  background: #fafafa;
  margin-top: -14px;
  z-index: 99;
}

.mdl-dialog__addContent .mdl-dialog__title {
  color: #1f1f1f !important;
  font-size: 22px !important;
  font-weight: 500;
}

.mdl-dialog__addContent .mdl-dialog__content {
  padding-top: 0;
  padding-bottom: 0;
}

.add-table-content:hover {
  color: #60c7cd;
  cursor: pointer;
}

main#ty-container > .mdl-grid:first-child {
  width: 1000px !important;
  max-width: inherit;
}

main#ty-container #addCustomerAction {
  width: 100% !important;
  max-width: inherit;
}
</style>