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

    loadingSuggestions: false,
    suggestions: [],
    suggestionOpen: true
	},

	mutations: {
		setUser(state, user) {
			state.user = user
		},

		setFilter(state, filter) {
			state.filter = filter
    },

    setLoadingSuggestions(state, loading) {
      state.loadingSuggestions = loading
    },

    setSuggestions(state, suggestions) {
      state.suggestions = suggestions
    },

    setSuggestionOpen(state, open) {
      state.suggestionOpen = open
    },

		...vuexfireMutations
	},

	getters: {
		filteredQuotes: state => {
			if (state.filter) {
        const reFilter = state.filter
          .split(' ')
          .filter(w => w.trim())
          .join('|')
        const re = new RegExp(reFilter, 'i')

        return state.quotes.filter(quote => {
          const author = quote.author || 'anonymous'

          return quote.text.match(re) || author.match(re)
        })
			} else {
				return state.quotes
			}
		}
	},

	actions: {
    async loadSuggestions({ commit }) {
      commit('setLoadingSuggestions', true)

      try {
        const response = await fetch('https://type.fit/api/quotes')
        const suggestions = await response.json()

        if (!suggestions || !suggestions.length) {
          throw new Error('No quotes found.');
        }

        commit('setSuggestions', suggestions)
        commit('setLoadingSuggestions', false)
      } catch (e) {
        // ...
      }
    },

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
    store.dispatch('loadSuggestions')
	} else {
		store.dispatch('unbindQuotesRef')
	}
})

export default store
