const arr = [5, 2, 7, 8, 34, 7, 39, 12, 56, 9, 1]

const quickSort = ([head, ...tail]) =>
  head == null ? [] : [...quickSort(tail.filter(x => x >= head)), head, ...quickSort(tail.filter(x => x < head))]
console.log(quickSort(arr)) // [1, 2,  5,  7,  7, 8, 9, 12, 34, 39, 56]
