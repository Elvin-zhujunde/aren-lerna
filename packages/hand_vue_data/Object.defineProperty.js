const Book = {}
let = ''
Object.defineProperty(Book, 'name', {
  set(value) {
    console.log(`你取了一个书名叫做${value}`)
    name = value
  },
  get() {
    return `《${name}》`
  },
})

Book.name = 'vue权威指南' // 你取了一个书名叫做vue权威指南
console.log('@', Book)
console.log('#', Book.name) // 《vue权威指南》
