document.addEventListener("DOMContentLoaded", () => {
  const pageCreateBtn = document.getElementById("pageCreateButton");
  const notionList = document.getElementById("notionList");
  const todoList = document.getElementById("todoList");
  const pageId = document.getElementById("pageId");
  const contentTitle = document.getElementById("contentTitle");
  const contentContainer = document.getElementById("contentContainer");
  const pageSaveButton = document.getElementById("pageSaveButton");
  const historyBackBtn = document.getElementById("historyBackButton");
  const historyForwardBtn = document.getElementById("historyForwardButton");
  const pageDeleteButton = document.getElementById("deletePageBtn");
  const todoCreateBtn = document.getElementById("todoCreateButton");

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
      e.preventDefault();
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

  pageDeleteButton.addEventListener("click", () => {
    if (confirm("페이지를 삭제하시겠습니까?")) {
      fetch(`http://localhost:3000/posts/${pageId.textContent}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) throw new Error("Delete Failed");
          return response.json();
        })
        .then(() => {
          alert("Delete Success");
        });

      const deletedPage = notionList.querySelector(
        `a[id='${pageId.textContent}']`
      );
      if (deletedPage) deletedPage.parentElement.remove();

      fetch("http://localhost:3000/posts")
        .then((res) => res.json())
        .then((pages) => {
          if (pages.length) {
            setContents(pages[0]);
          } else {
            pageId.textContent = "";
            contentTitle.textContent = "새 페이지";
            contentContainer.innerHTML = "";
          }
        })
        .catch((error) => alert(error.message));
    }
  });

  todoCreateBtn.addEventListener("click", (e) => {
    fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify({ todo: "", completed: false }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((json) => {
        makeTodoList(json);
      });
  });

  const getTodoList = () => {
    fetch("http://localhost:3000/todos")
      .then((response) => response.json())
      .then((json) => {
        json.forEach(makeTodoList);
      });
  };
  getTodoList();

  const makeTodoList = (data) => {
    const li = document.createElement("li");
    const i = document.createElement("i");
    const span = document.createElement("span");

    li.className = "todoList-item";
    i.className = data.completed
      ? "fa-regular fa-square-check"
      : "fa-regular fa-square";
    li.id = data.id;
    span.className = "todo-text";
    span.textContent = data.todo || "New Todo";
    span.contentEditable = "true";

    i.addEventListener("click", () => {
      toggleTodo(data.id, !data.completed, i, span);
    });

    span.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        span.blur();
      }
    });

    span.addEventListener("blur", () => {
      updateTodoText(data.id, span.textContent);
    });

    li.appendChild(i);
    li.appendChild(span);
    todoList.appendChild(li);
  };

  const toggleTodo = (id, newCompleted, i, span) => {
    fetch(`http://localhost:3000/todos/${id}`)
      .then((res) => res.json())
      .then((todo) => {
        fetch(`http://localhost:3000/todos/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            todo: todo.todo,
            completed: newCompleted,
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        })
          .then((res) => res.json())
          .then(() => {
            i.className = newCompleted
              ? "fa-regular fa-square-check"
              : "fa-regular fa-square";
          });
      });
  };

  const updateTodoText = (id, newText) => {
    fetch(`http://localhost:3000/todos/${id}`)
      .then((res) => res.json())
      .then((todo) => {
        fetch(`http://localhost:3000/todos/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            todo: newText,
            completed: todo.completed,
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
      });
  };
});
