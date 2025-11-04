class AdafruitIO {
  constructor(username, activeKey) {
    this.username = username;
    this.activeKey = activeKey;
    this.baseUrl = `https://io.adafruit.com/api/v2/${this.username}/feeds`;
  }

  getData(feedName, callback) {
    const url = `${this.baseUrl}/${feedName}/data?limit=1`;
    fetch(url, {
      method: "GET",
      headers: { "X-AIO-Key": this.activeKey }
    })
      .then(response => response.json())
      .then(json => {
        callback({ feed: feedName, json: json });
      })
      .catch(error => console.error("Erreur getData:", error));
  }

  postData(feedName, value) {
    const url = `${this.baseUrl}/${feedName}/data`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AIO-Key": this.activeKey
      },
      body: JSON.stringify({ value: value })
    })
      .then(response => {
        if (!response.ok) throw new Error("Erreur de postData");
        console.log(`✅ Donnée envoyée sur ${feedName}: ${value}`);
      })
      .catch(error => console.error("Erreur postData:", error));
  }
}
