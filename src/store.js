import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { auth, db } from '@/firebase'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		user: null,
		quotes: [],
    filter: '',
    suggestionOpen: true,
    formOpen: false,
		bookmarkletText: ''
	},

	mutations: {
		setUser(state, user) {
			state.user = user
		},

		setFilter(state, filter) {
			state.filter = filter
    },

    setSuggestionOpen(state, open) {
      state.suggestionOpen = open
    },

		setFormOpen(state, open) {
			state.formOpen = open
    },

		setBookmarkletText(state, text) {
			state.bookmarkletText = text
		},

		...vuexfireMutations
	},

	getters: {
		filteredQuotes: state => {
			if (state.filter) {
        const re = new RegExp(state.filter.replace(' ', '|'), 'i')

				return state.quotes.filter(quote => quote.text.match(re) || quote.author.match(re))
			} else {
				return state.quotes
			}
		}
	},

	actions: {
		bindQuotesRef: firestoreAction(({ state, bindFirestoreRef }) => {
			return bindFirestoreRef(
				'quotes',
				db
					.collection('quotes')
					.where('user_id', '==', state.user.uid)
					.orderBy('created_at', 'desc')
			)
		}),

		unbindQuotesRef: firestoreAction(({ unbindFirestoreRef }) => {
			return unbindFirestoreRef('quotes')
		}),

		addQuote: ({ state }, { text, author }) => {
			return db.collection('quotes').add({
				user_id: state.user.uid,
				text,
				author,
				created_at: new Date()
			})
		},

		deleteQuote: (_, quoteId) => {
			db
				.collection('quotes')
				.doc(quoteId)
				.delete()
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
