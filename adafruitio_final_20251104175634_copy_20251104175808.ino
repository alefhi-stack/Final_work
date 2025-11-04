#include "config.h"
#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN 21 // Define pin used

// ----------OBJECTS DECLARATION-----------
// Define what dht type (we use dht11 but dht22 exist too)
#define DHTTYPE DHT11 
// Initialize DHT sensor
DHT dht(DHTPIN, DHTTYPE);
// set up the 'counter' feed
AdafruitIO_Feed *temperature = io.feed("temperature");

void setup() {

  // start the serial connection
  Serial.begin(115200);
  dht.begin();
  // wait for serial monitor to open
  while(! Serial);

  Serial.print("Connecting to Adafruit IO");

  // connect to io.adafruit.com
  io.connect();

  // wait for a connection
  while(io.status() < AIO_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  // we are connected
  Serial.println();
  Serial.println(io.statusText());

}

void loop() {

  // io.run(); is required for all sketches.
  // it should always be present at the top of your loop
  // function. it keeps the client connected to
  // io.adafruit.com, and processes any incoming data.
  io.run();

  int temperatureSensor = dht.readTemperature();
  // save count to the 'counter' feed on Adafruit IO
  Serial.print("sending -> ");
  Serial.println(temperatureSensor);
  temperature->save(temperatureSensor);

  delay(3000);

}
