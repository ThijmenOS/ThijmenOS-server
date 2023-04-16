let memKey = "Some_Memorykey"

onmessage = ev => console.log(ev.data);

window.top.postMessage({
  origin: window.name,
  method: "memRead",
  params: memKey,
}, "*");