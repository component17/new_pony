######################################################################################################################
############################Source code for the RPi controller of Sorting Assistaint##################################
##########################################By Ateuco and Component17 teams#############################################
###################################################version.0.1########################################################
####################################################13.06.2019########################################################
######################################################################################################################




import serial
import time
import threading
import socketio
import ast
import sys
import os
import argparse
import json
import subprocess
import lcd_screen
class state:                            #Serial state control
    def __init__ (self, status, port):
        self.status = status
        self.port = port
    def getState(self):
        return self.status
    def setState(self, state):
        self.status = state
def createParser ():                    #Parsing arguments
    parser = argparse.ArgumentParser()
    parser.add_argument ("--port", default=1, required=True)
    return parser

class reportCallback():
    def __init__(self, reportArray):
        self.reportArray = reportArray


class reportData():
    def __init__(self, dataPacket):
        self.dataPacket = dataPacket


GET_IP_CMD ="hostname -I"                   #Recieving IPv4
def run_cmd(cmd):
    return subprocess.check_output(cmd, shell=True).decode('utf-8')
ip = run_cmd(GET_IP_CMD)
print(ip[:12])
lcd_screen.show_ip(ip[:12])                #Printing on lcd



repData = reportData("")
report = reportCallback("")
parser = createParser()
namespace = parser.parse_args(sys.argv[1:])
socketPort = int(namespace.port)
print (socketPort)

sio = socketio.Client()                     #Connecting to socket server
@sio.on('connect')
def on_connect():

    print('connection established')

@sio.on('switch')                           #Json listener
def on_turn_led(data):
    if data != None:


        array = data
        report.reportArray = list()

        taskList = list()
        expectedRespond = list()
        for val in array:

            if val["color"]["r"] == 0 and val["color"]["g"]==0 and val["color"]["b"] ==0:       #If incoming colour data = "000"

                sendingData = '%s000 '%val["id"]
                sending(sendingData)


            else:
                zerosNumR = 3-len(str(val["color"]["r"]))
                val["color"]["r"] = '0'*zerosNumR + str(val["color"]["r"])
                zerosNumG = 3-len(str(val["color"]["g"]))
                val["color"]["g"] = '0'*zerosNumG + str(val["color"]["g"])
                zerosNumB = 3-len(str(val["color"]["b"]))
                val["color"]["b"] = '0'*zerosNumB + str(val["color"]["b"])
                sendingData = "%s004%s%s%s "%(val["id"],val["color"]["r"],val["color"]["g"],val["color"]["b"])

                sending(sendingData)




            taskList.append(sendingData)
            expectedRespond.append(sendingData[:12])
            #print (sendingData)
            time.sleep(0.05)
        print (taskList, "task list 0")
        for act in report.reportArray:                  #Checking if LEDs recieved commands at first attempt
            for cellCallback in taskList:
                if act ==cellCallback[:12]:
                    print(cellCallback, "delivered at first attempt")
                    taskList.remove(cellCallback)

        print (taskList, "task list 1")
        for cellCallback in taskList:                   #Sending commands for remaining LEDs for 10 times
            attempts = 0
            while attempts!=100:

                if repData.dataPacket[:12] == cellCallback[:12]:

                    print(cellCallback, " successfully delivered at ", attempts)
                    sio.emit("switch:status",cellCallback)
                    taskList.remove(cellCallback)
                    break
                else:
                    sending(cellCallback)
                    attempts +=1
                time.sleep(0.01)
    print (taskList, "not delivered")
    sio.emit("switch:status",report.reportArray)        #Sending LED status to socket
    print (report.reportArray)
    print("\n")







stream = state(0, serial.Serial('/dev/serial0',115200, timeout =1))     #Initializing serial connection
stream.port.close()

def recieve():                          #LED callback listener
    stream.port.open()
    while True:

        if stream.getState() == 0:

            data = stream.port.readline()

            if len(data) !=0:
                data= data.decode('utf-8').replace("\n", "")
                if data[12:15] == "005":
                    print ("sensor", data)
                    sio.emit("sensor:detect",data)
                else:
                    repData.dataPacket = data
                    if data not in report.reportArray:
                        report.reportArray.append(data[:12])


                    #print (data)


        elif stream.getState() == 1:
            pass


def sending(sendingData):               #Sending commands to LEDs

    recvData = sendingData.encode('utf-8')

    stream.port.write(recvData)



@sio.on('disconnect')                   #Disconnecting from socket server
def on_disconnect():
    print('disconnected from server')

sio.connect('http://localhost:{}'.format (socketPort))
recieve()
sio.wait()