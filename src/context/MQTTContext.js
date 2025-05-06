import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Paho from "paho-mqtt";

// Create the context
const MqttContext = createContext();

export const useMqtt = () => useContext(MqttContext);

export const MqttProvider = ({ subscribeID, dispatch, children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef(null);
  const [lastMessages, setLastMessage] = useState(null);

  const connectToMqtt = () => {
    if (!subscribeID) {
      console.error("No subscribeID provided for MQTT connection.");
      return;
    }

    // Initialize client
    clientRef.current = new Paho.Client("192.168.18.241", 8228, subscribeID);

    clientRef.current.onConnectionLost = (responseObject) => {
      console.error("MQTT Connection lost:", responseObject.errorMessage);
      setIsConnected(false);
      setTimeout(connectToMqtt, 6000); // Retry after 6 seconds
    };

    clientRef.current.onMessageArrived = (message) => {
      console.log("Message arrived:", JSON.parse(message.payloadString));
      let data = JSON.parse(message.payloadString);
      setLastMessage(data);
    };

    const options = {
      onSuccess: () => {
        console.log("Connected to MQTT broker");
        setIsConnected(true);
        clientRef.current.subscribe(subscribeID.toString(), {
          onSuccess: () => console.log(`Subscribed to ${subscribeID}`),
          onFailure: (error) =>
            console.error("Subscription failed:", error.errorMessage),
        });
      },
      onFailure: (error) => {
        console.error("MQTT connection failed:", error.errorMessage);
        setIsConnected(false);
        setTimeout(connectToMqtt, 6000); // Retry after 6 seconds
      },
      keepAliveInterval: 30,
      reconnect: true,
      userName: "user1",
      password: "password1",
    };

    clientRef.current.connect(options);
  };

  useEffect(() => {
    connectToMqtt();
    return () => {
      if (clientRef.current?.isConnected()) {
        clientRef.current.disconnect();
        setLastMessage(null);
      }
    };
  }, [subscribeID]);

  return (
    <MqttContext.Provider
      value={{
        client: clientRef.current,
        isConnected,
        lastMessages,
        setLastMessage,
      }}>
      {children}
    </MqttContext.Provider>
  );
};
