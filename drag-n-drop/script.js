document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".list");

  let currentItemIdx = null;
  let currentItem = null;

  list.addEventListener("dragstart", (e) => {
    currentItem = e.target;
    const listArr = [...currentItem.parentElement.children];
    currentItemIdx = listArr.indexOf(currentItem);
  });

  list.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  list.addEventListener("drop", (e) => {
    e.preventDefault();

    const currentDropItem = e.target;
    const listArr = [...currentItem.parentElement.children];
    const dropItemIndex = listArr.indexOf(currentDropItem);

    if (currentItemIdx < dropItemIndex) {
      currentDropItem.after(currentItem);
    } else {
      currentDropItem.before(currentItem);
    }
  });
});
