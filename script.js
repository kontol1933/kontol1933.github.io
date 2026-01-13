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
        newsBox.innerHTML += `
          <div class="card">
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