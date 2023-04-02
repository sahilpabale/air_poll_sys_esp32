#include <Arduino.h>
#include <chrono>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <DHT_U.h>
#include <LM35.h>
#include <MQUnifiedsensor.h>

String server = "http://192.168.0.101:3000/data";

unsigned long lastTime = 0;
unsigned long timerDelay = 50000;

// #define DHTPIN 16
// #define DHTTYPE    DHT11

// #define placa "ESP32"
// #define Voltage_Resolution 5
// #define pin 18 //Analog input 0 of your arduino
// #define type "MQ-135" //MQ135
// #define ADC_Bit_Resolution 10 // For arduino UNO/MEGA/NANO
// #define RatioMQ135CleanAir 3.6//RS / R0 = 3.6 ppm  

// #define placa "ESP32"
// #define Voltage_Resolution 5
// #define pin 35 //Analog input 0 of your arduino
// #define type "MQ-6" //MQ6
// #define ADC_Bit_Resolution 10 // For arduino UNO/MEGA/NANO
// #define RatioMQ6CleanAir 10   //RS / R0 = 10 ppm 

// MQUnifiedsensor MQ135(placa, Voltage_Resolution, ADC_Bit_Resolution, pin, type);
// MQUnifiedsensor MQ6(placa, Voltage_Resolution, ADC_Bit_Resolution, pin, type);

// LM35 temp(39);

// DHT_Unified dht(DHTPIN, DHTTYPE);

uint32_t delayMS;

void setupWifi() {
  char* ssid = "Nishant";
  char* password = "21182410";
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }
  Serial.println("\nConnected to the WiFi network");
  Serial.println(WiFi.localIP());
}

void sendDataToServer(int64_t timestamp) {
  if(WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(server.c_str());
    http.addHeader("Content-Type", "application/json");
    char* payload;
    sprintf(payload, "{\"timestamp\":%lld,\"temp\":%f,\"hum\":%f,\"mq135\":%f,\"mq6\":%f}", timestamp, 29, 48, 800, 6000);
    printf(payload);
    int httpResponseCode = http.POST(payload);
    if(httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(response);
    } else {
      Serial.println("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  setupWifi();

  // MQ135.setRegressionMethod(1); //_PPM =  a*ratio^b
  // MQ135.setA(102.2); MQ135.setB(-2.473);
  
  // MQ6.setRegressionMethod(1); //_PPM =  a*ratio^b
  // MQ6.setA(1000000000000000); MQ6.setB(-2.526);

  // MQ135.init();
  Serial.print("Calibrating please wait.");
  // for(int i = 1; i<=10; i ++)
  // {
  //   MQ135.update(); // Update data, the arduino will read the voltage from the analog pin
  //   calcR0 += MQ135.calibrate(RatioMQ135CleanAir);
  //   Serial.println(calcR0);
    
  // }
  // MQ135.setR0(calcR0/10);
  Serial.println("  done!.");
  /*****************************  MQ CAlibration ********************************************/ 
  // MQ135.serialDebug(true);

  // MQ6.init();   
  
  Serial.print("Calibrating please wait.");
  // for(int i = 1; i<=10; i ++)
  // {
  //   MQ6.update(); // Update data, the arduino will read the voltage from the analog pin
  //   calcR0 += MQ6.calibrate(RatioMQ6CleanAir);
  //   Serial.print(".");
  // }
  // MQ6.setR0(calcR1/10);
  Serial.println("  done!.");
  
  // MQ6.serialDebug(true);

  // 192.168.0.101 <- API url
}

void loop() {
  // put your main code here, to run repeatedly:
  using namespace std::chrono;
  int64_t timestamp = duration_cast<seconds>(system_clock::now().time_since_epoch()).count();
  float hum = 48;
  float tempInC = 29;

  // MQ135.update(); // Update data, the arduino will read the voltage from the analog pin
  // MQ135.readSensor(); // Sensor will read PPM concentration using the model, a and b values set previously or from the setup
  // MQ135.serialDebug();

  // MQ6.update(); // Update data, the arduino will read the voltage from the analog pin
  // MQ6.readSensor(); // Sensor will read PPM concentration using the model, a and b values set previously or from the setup
  // MQ6.serialDebug();

  sendDataToServer(timestamp);
  delay(1000);
}