export default function ({ store, redirect, req }) {
  if (!store.state.user.isSignedIn) {
    return redirect(`/account/login?redirect=${req.originalUrl}`)
  }
}
