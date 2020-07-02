import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { auth, db } from '@/firebase'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		user: null,
		quotes: []
	},

	mutations: {
		setUser(state, user) {
			state.user = user
		},
		...vuexfireMutations
	},

	actions: {
		bindQuotesRef: firestoreAction(({ state, bindFirestoreRef }) => {
			return bindFirestoreRef(
				'quotes',
				db.collection('quotes').where('user_id', '==', state.user.uid)
			)
		}),

		unbindQuotesRef: firestoreAction(({ unbindFirestoreRef }) => {
			return unbindFirestoreRef('quotes')
		}),

		addQuote({ state }, { text, author }) {
			return db.collection('quotes').add({
				user_id: state.user.uid,
				text,
				author,
				created_at: new Date()
			})
		}
	}
})

auth.onAuthStateChanged(user => {
	store.commit('setUser', user || null)

	if (user) {
		store.dispatch('bindQuotesRef')
	} else {
		store.dispatch('unbindQuotesRef')
	}
})

export default store