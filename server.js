const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middleware = jsonServer.defaults({
  static: './build'
})

server.use(middleware)
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}))

// Custom route to handle deleting multiple todos
server.delete('/todos', (req, res) => {
  console.log('Calling delete?')
  const ids = req.query.id
  const db = router.db
  ids
    .map(Number)
    .forEach(id => {
      db.get('todos')
        .remove({ id })
        .write()
    })
  res.status(204).send()
})

server.use(jsonServer.bodyParser)


server.use(router)
server.listen(3030, () => {
  console.log('Server is running on port 3030')
})