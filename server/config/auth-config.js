module.exports = {
  secret: 'addb-shared-secret',
  unprotectedPath: [
    /\/api\/v2\/token/,
    /\/static/,
    /\/favicon.png/,
    /\/login/,
    '/'
  ]
}
