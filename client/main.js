var socket = io.connect('http://192.168.18.82:6677', { 'forceNew': true });


socket.on('messages', function (data) {
    render(data);
});

function render(data) {
    var html = data.map(function (message, index) {
        return (`
            <div class="message">
                <h2>${message.nickname}</h2>
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');
    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e) {
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);

    return false;
}