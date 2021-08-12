import Vue from "vue";
import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/firestore';

export default {
  
    addFiles(state, payload) {
        state.filees.push({ 'fileName': payload.fileName,'publisher':payload.publisher,'selected':payload.selected, 'id': payload.id })
    },

    setFiles(state, payload) {

        state.filees.push(payload);

    },

    removeFiles(state, index) {

        Vue.delete(state.filees, index)

    },
    

}