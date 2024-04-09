document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (confirm("Are you sure you want to delete this post?")) {
        const postId = btn.getAttribute("data-id");
        try {
          const response = await fetch(`/api/posts/${postId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Failed to delete post");
          }
          // Reload the page after successful deletion
          window.location.reload();
        } catch (error) {
          console.error("Error deleting post:", error);
          alert("Error deleting post. Please try again later.");
        }
      }
    });
  });
});
