export async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  }

 export async function getData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    return response.json();
  }

export function getCurrentFormattedDateAndTime() {
    var dateAndTime = new Date();
    var year = dateAndTime.getFullYear();
    var month = dateAndTime.getMonth() + 1;
    var day = dateAndTime.getDate();
    var hours = dateAndTime.getHours();
    var minutes = dateAndTime.getMinutes();
    var seconds = dateAndTime.getSeconds();

    if(month < 10) {
        month = '0' + month;
    }

    if(day < 10) {
        day = '0' + day;
    }

    if(hours < 10) {
        hours = '0' + hours;
    }

    if(minutes < 10) {
        minutes = '0' + minutes;
    }

    if(seconds < 10) {
        seconds = '0' + seconds;
    }
    const formattedDateAndTime = year+'-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds;
    return formattedDateAndTime;
}