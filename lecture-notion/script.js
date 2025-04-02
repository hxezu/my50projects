document.addEventListener("DOMContentLoaded", () => {
  const pageCreateBtn = document.getElementById("pageCreateButton");
  const notionList = document.getElementById("notionList");
  const pageId = document.getElementById("pageId");
  const contentTitle = document.getElementById("contentTitle");
  const contentContainer = document.getElementById("contentContainer");
  const pageSaveButton = document.getElementById("pageSaveButton");
  const historyBackBtn = document.getElementById("historyBackButton");
  const historyForwardBtn = document.getElementById("historyForwardButton");

  let history = { back: [], forward: [] };

  //Create Page(POST)
  pageCreateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/posts", {
      method: "POST",
      body: JSON.stringify({ title: "", body: "" }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        makePageTitle(json);
        setContents(json);
      });
  });

  //Fetch Page List(GET)
  const getPageTitleList = () => {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((json) => {
        json.forEach(makePageTitle);
        if (json.length) setContents(json[0]);
      });
  };
  getPageTitleList();

  //Create Page Title List
  const makePageTitle = (data) => {
    const li = document.createElement("li");
    const i = document.createElement("i");
    const a = document.createElement("a");

    i.className = "fa-regular fa-file-lines";
    a.href = "#";
    a.id = data.id;
    a.textContent = data.title || "새 페이지";

    a.addEventListener("click", (e) => {
      e.preventDefault();
      fetch(`http://localhost:3000/posts/${e.currentTarget.id}`)
        .then((response) => response.json())
        .then(setContents);
    });

    li.appendChild(i);
    li.appendChild(a);
    notionList.appendChild(li);
  };

  //Set Content
  const setContents = (data) => {
    pageId.textContent = data.id;
    contentTitle.value = data.title;
    contentContainer.innerHTML = "";

    data.body.split("\n").forEach((text) => {
      const block = createBlock(text);
      contentContainer.appendChild(block);
    });

    history = { back: [], forward: [] };
  };

  // Create Text Div Block
  const createBlock = (text = "") => {
    const block = document.createElement("div");
    block.className = "contentBlock";
    block.contentEditable = "true";
    block.textContent = text;

    block.addEventListener("keydown", handlekeyDown);
    return block;
  };

  //Creat Text Block by Enter Key
  const handlekeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newBlock = createBlock();
      contentContainer.insertBefore(newBlock, e.target.nextSibling);
      newBlock.focus();
    } else if (e.key === "Backspace" && e.target.textContent === "") {
      removeBlock(e.target);
    }
  };

  //Remove Block
  const removeBlock = (block) => {
    if (contentContainer.children.length > 1) {
      const previousBlock = block.previousElementSibling;
      contentContainer.removeChild(block);
      if (previousBlock) setCursorToEnd(previousBlock);
    }
  };

  //Move Cursor to End
  const setCursorToEnd = (element) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  //Save Page (PUT)
  pageSaveButton.addEventListener("click", () => {
    if (confirm("저장하시겠습니까?")) {
      const bodyContent = Array.from(contentContainer.children)
        .map((block) => block.textContent)
        .join("\n");
      fetch(`http://localhost:3000/posts/${pageId.textContent}`, {
        method: "PUT",
        body: JSON.stringify({
          title: contentTitle.value,
          body: bodyContent,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then(() => {
          notionList.querySelector(
            `a[id='${pageId.textContent}']`
          ).textContent = bodyContent.split("\n")[0];
          alert("저장되었습니다");
        });
    }
  });

  //Save History
  contentContainer.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && history.forward.length) {
      history.forward = [];
    }
    history.back.push(
      Array.from(contentContainer.children)
        .map((block) => block.textContent)
        .join("\n")
    );
  });

  // Back
  historyBackBtn.addEventListener("click", () => {
    if (history.back.length) {
      history.forward.push(
        Array.from(contentContainer.children)
          .map((block) => block.textContent)
          .join("\n")
      );
      restoreHistory(history.back.pop());
    }
  });

  // Forward
  historyForwardBtn.addEventListener("click", () => {
    if (history.forward.length) {
      history.back.push(
        Array.from(contentContainer.children)
          .map((block) => block.textContent)
          .join("\n")
      );
      restoreHistory(history.forward.pop());
    }
  });

  //Restore History
  const restoreHistory = (content) => {
    contentContainer.innerHTML = "";
    content.split("\n").forEach((text) => {
      contentContainer.appendChild(createBlock(text));
    });
  };
});
