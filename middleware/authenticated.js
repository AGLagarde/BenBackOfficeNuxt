export default function ({ store, redirect }) {
    // if user not authentified redirect to login page
    if (!store.state.token) {
      return redirect('/login')
    }
  }