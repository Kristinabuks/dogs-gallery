function buildColumn(arr) {
  let n = 1;
  let c = 0;
  let groupby = [];

  if (window.innerWidth >= 1200) {
    n = 5;
  } else if (window.innerWidth >= 992) {
    n = 3;
  } else if (window.innerWidth >= 768) {
    n = 2;
  }

  for (let i = 0; i < n; i++) {
    groupby.push([]);
  }

  for (let v of arr) {
    groupby[c].push(v);
    c = (c + 1) % n;
  }

  return groupby;
}

export { buildColumn };
