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

            links.forEach(link => {
                const url = link.href;
                if (url.endsWith('.mp3')) {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'result-item';
                    resultItem.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
                    resultsDiv.appendChild(resultItem);
                }
            });

            if (resultsDiv.innerHTML === '') {
                resultsDiv.innerHTML = '<p>No MP3 links found.</p>';
            }
        })
        .catch(error => {
            resultsDiv.innerHTML = '<p>Error fetching search results.</p>';
            console.error('Error:', error);
        });
}
        })
        .catch(error => {
            resultsDiv.innerHTML = '<p>Error fetching search results.</p>';
            console.error('Error:', error);
        });
}
