const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 2000);
});

const secondPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Thực hiện thành công");
    // reject("Error: some bug");
  }, 2000);
});

const getList = async () => {
  return await fetch("https://64d8a86c5f9bf5b879ce6dd9.mockapi.io/api/v1/moviesNow");
};

(async () => {
  try {
    const results = await Promise.all([
      firstPromise,
      secondPromise,
      getList(),
    ]);
    console.log("Tất cả đã đc thực hiện");
  } catch (error) {
    console.error("Thất bại", error);
  }
})();