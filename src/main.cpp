#include <Arduino.h>
#include <chrono>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <string>

String server = "http://192.168.64.206:8000/data";

void setupWifi() {
  char* ssid = "narzo50";
  char* password = "12345678";
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
    
    // Create a JSON document
    StaticJsonDocument<200> doc;

    // Add data to the JSON document
    doc["timestamp"] = timestamp;
    doc["temp"] = 29;
    doc["hum"] = 48;
    doc["mq135"] = 800;
    doc["mq6"] = 6000;

    // Serialize the JSON document to a string
    String jsonString;
    serializeJson(doc, jsonString);

    int httpResponseCode = http.POST(jsonString);
    if(httpResponseCode > 0) {
      Serial.println("data sent...");
      String response = http.getString();
      // Serial.println(response);
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
  Serial.print("Calibrating please wait.");
  Serial.println("  done!.");
  // 192.168.0.101 <- API url
}

void loop() {
  // put your main code here, to run repeatedly:
  using namespace std::chrono;
  int64_t timestamp = duration_cast<seconds>(system_clock::now().time_since_epoch()).count();

  sendDataToServer(timestamp);
  delay(20000);
}