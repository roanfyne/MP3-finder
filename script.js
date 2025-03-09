function searchMp3Links() {
    const songTitle = document.getElementById('songTitle').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (!songTitle) {
        resultsDiv.innerHTML = '<p>Please enter a song title.</p>';
        return;
    }

    const searchUrl = `https://downloads.khinsider.com/search?search=${encodeURIComponent(songTitle)}`;

    fetch(searchUrl)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const links = doc.querySelectorAll('.playlistDownloadSong a');

            let found = false;

            links.forEach(link => {
                const songPageUrl = link.href;

                fetch(songPageUrl)
                    .then(response => response.text())
                    .then(songPageHtml => {
                        const songPageDoc = parser.parseFromString(songPageHtml, 'text/html');
                        const downloadLink = songPageDoc.querySelector('.mp3Download a');

                        if (downloadLink) {
                            found = true;
                            const songTitleElement = songPageDoc.querySelector('h2');

                            const resultItem = document.createElement('div');
                            resultItem.className = 'result-item';

                            if (songTitleElement) {
                                const title = songTitleElement.textContent;
                                resultItem.innerHTML = `<h3>${title}</h3><a href="${downloadLink.href}" target="_blank">${downloadLink.href}</a>`;
                            } else {
                                resultItem.innerHTML = `<a href="${downloadLink.href}" target="_blank">${downloadLink.href}</a>`;
                            }

                            resultsDiv.appendChild(resultItem);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching song page:', error);
                    });
            });

            setTimeout(() => {
                if (!found) {
                    resultsDiv.innerHTML = '<p>No MP3 links found.</p>';
                }
            }, 5000);
        })
        .catch(error => {
            resultsDiv.innerHTML = '<p>Error fetching search results.</p>';
            console.error('Error:', error);
        });
}
        .catch(error => {
            resultsDiv.innerHTML = '<p>Error fetching search results.</p>';
            console.error('Error:', error);
        });
}
