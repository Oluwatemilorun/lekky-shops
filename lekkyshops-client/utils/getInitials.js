export default (name) => {
  if (!name) return

  const names = name.split(/ /g)
  let initials = ''

  names.forEach((n, i) => {
    if (i > 1) return
    initials += n.charAt(0)
  })

  return initials
}
