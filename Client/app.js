

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text ?? "";
  return div.innerHTML;
}

async function loadItems() {
  const search = document.getElementById("search").value.trim();
  const type = document.getElementById("type").value;

  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (type) params.append("type", type);

  const container = document.getElementById("items");
  try {
    const res = await fetch(`${API}/items?${params}`);
    const items = await res.json();

    if (items.length === 0) {
      container.innerHTML = '<p class="text-muted">No items found.</p>';
      return;
    }

    container.innerHTML = items
      .map(
        (item) => `
        <div class="col-md-4">
          <div class="card h-100 shadow-sm">
            ${
              item.imageUrl
                ? `<img src="${escapeHtml(item.imageUrl)}" class="card-img-top" style="height:200px;object-fit:cover" alt="">`
                : ""
            }
            <div class="card-body">
              <span class="badge ${item.type === "lost" ? "bg-danger" : "bg-success"} mb-2">
                ${escapeHtml(item.type)}
              </span>
              <h5 class="card-title">${escapeHtml(item.title)}</h5>
              <p class="card-text">${escapeHtml(item.description)}</p>
              <small class="text-muted">
                ${escapeHtml(item.location)} · by ${escapeHtml(item.postedBy?.name)}
              </small>
            </div>
          </div>
        </div>`
      )
      .join("");
  } catch (err) {
    container.innerHTML =
      '<p class="text-danger">Could not load items. Is the server running?</p>';
  }
}

document.getElementById("searchBtn").addEventListener("click", loadItems);
loadItems();