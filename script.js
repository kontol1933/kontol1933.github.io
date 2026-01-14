const newsBox = document.getElementById("news");

function loadNews(type){
  newsBox.innerHTML = "<p class='loading'>Loading berita...</p>";

  let rss = "";
  if(type === "bola"){
    rss = "https://news.google.com/rss/search?q=berita+bola+indonesia&hl=id&gl=ID&ceid=ID:id";
  }
  if(type === "hacking"){
    rss = "https://news.google.com/rss/search?q=serangan+hacking+cyber+attack&hl=id&gl=ID&ceid=ID:id";
  }

  fetch("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(rss))
    .then(res => res.json())
    .then(data => {
      newsBox.innerHTML = "";
      data.items.slice(0,5).forEach(item => {
        // Ambil gambar dari konten atau thumbnail
        let imgSrc = item.thumbnail || extractImage(item.content) || "https://via.placeholder.com/350x150?text=No+Image";

        newsBox.innerHTML += `
          <div class="card">
            <img src="${imgSrc}" alt="Thumbnail" class="news-img">
            <h3>${item.title}</h3>
            <p>${item.pubDate}</p>
            <a href="${item.link}" target="_blank">Baca selengkapnya</a>
          </div>
        `;
      });
    })
    .catch(()=>{
      newsBox.innerHTML = "<p class='loading'>Gagal memuat berita</p>";
    });
}

// Fungsi ambil image dari konten
function extractImage(content){
  const match = content.match(/<img.*?src=["'](.*?)["']/);
  return match ? match[1] : null;
}