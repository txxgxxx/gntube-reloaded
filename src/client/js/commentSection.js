const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const videoComment = document.querySelector(".video__comment");
const deleteBtns = document.querySelectorAll("#deleteBtn");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const btn = document.createElement("button");
  btn.innerText = "❌";
  btn.id = "deleteBtn";
  btn.className = "deleteBtn";
  const div = document.createElement("div");
  div.appendChild(icon);
  div.appendChild(span);
  newComment.appendChild(div);
  newComment.appendChild(btn);
  videoComments.prepend(newComment);
  deleteBtn.addEventListener("click", handleDelete);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};
if (form) {
  form.addEventListener("submit", handleSubmit);
}

const handleDelete = async (event) => {
  const li = event.srcElement.parentNode;
  const {
    dataset: { id: commentId },
  } = li;
  await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
  });
  li.remove();
};

if (deleteBtns) {
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", handleDelete);
  });
}
