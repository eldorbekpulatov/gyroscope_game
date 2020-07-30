from gevent import monkey
monkey.patch_all()

import serial
from flask import Flask, render_template, request
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)


COM = 'COM3'
BAUD = 9600
ser = serial.Serial(COM, BAUD, timeout = 1)


@app.route('/')
def main():
    return render_template('main.html')

@socketio.on('update', namespace='/update')
def update():
    raw = ser.readline()
    val = str(raw.decode("utf-8").strip('\r\n'))
    socketio.emit('update', {'data': val}, namespace="/update")
 

if __name__ == '__main__':
    socketio.run(app, "0.0.0.0", port=5000)
