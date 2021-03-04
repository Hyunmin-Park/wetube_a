import axios from "axios";

const comment = document.getElementById("jsComment");
const deleteCommentBtn = document.getElementsByClassName("fa-minus-circle");
const commentNumber = document.getElementById("jsCommentNumber");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const disappearComment = (comment) => {
  comment.remove();
  decreaseNumber();
};

const deleteComment = async (event) => {
  const videoId = window.location.href.split("/videos/")[1];
  const comment = event.path[1];
  const commentId = event.path[1].getAttribute("name");
  const response = await axios({
    url: `/api/${videoId}/delete-comment`,
    method: "POST",
    data: {
      commentId,
    },
  });
  if (response.status === 200) {
    disappearComment(comment);
  }
};

function init() {
  for (let i = 0; i < deleteCommentBtn.length; i++) {
    deleteCommentBtn[i].addEventListener("click", deleteComment);
  }
}

if (comment) {
  init();
}
