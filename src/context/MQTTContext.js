import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Paho from "paho-mqtt";
import { secureRandomString } from "../commen/functions/utils";

// Create the context
const MqttContext = createContext();

export const useMqtt = () => useContext(MqttContext);

export const MqttProvider = ({ subscribeID, dispatch, children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef(null);
  const retryCountRef = useRef(0); // Tracks number of retries
  const MAX_RETRIES = 3;
  const randomString = secureRandomString();
  // Related Bank User Request and Created and Rejected
  const [bankUserRequested, setBankUserRequested] = useState(null);
  const [bankUserCreated, setBankUserCreated] = useState(null);
  const [bankUserRejected, setBankUserRejected] = useState(null);
  const [bankUserRoleStatusChange, setBankUserRoleStatusChange] =
    useState(null);
  const [bankUserUpdated, setBankUserUpdated] = useState(null);
  const [branchCreated, setBranchCreated] = useState(null);
  const [branchUpdated, setBranchUpdated] = useState(null);

  // Related Corporate User Request and Created and Rejected
  const [corproateUserRequested, setCorporateUserRequested] = useState(null);
  const [corproateUserCreated, setCorporateUserCreated] = useState(null);
  const [corproateUserRejected, setCorporateUserRejected] = useState(null);
  const [corporateUserRoleStatusChange, setCorporateUserRoleStatusChange] =
    useState(null);
  const [corporateCreated, setCorporateCreated] = useState(null);
  const [corproateUpdated, setCorporateUpdated] = useState(null);
  const [corporateUserUpdated, setCorporateUserUpdated] = useState(null);

  const connectToMqtt = () => {
    if (!subscribeID) {
      console.error("No subscribeID provided for MQTT connection.");
      return;
    }
    if (retryCountRef.current >= MAX_RETRIES) {
      console.error("MQTT connection failed after maximum retries.");
      return; // Stop trying after 3 attempts
    }
    let newClientID = `${subscribeID}-${randomString}`;

    // Initialize client
    clientRef.current = new Paho.Client("192.168.18.241", 8228, newClientID);

    clientRef.current.onConnectionLost = (responseObject) => {
      console.error("MQTT Connection lost:", responseObject.errorMessage);
      setIsConnected(false);
      retryCountRef.current += 1;
      if (retryCountRef.current < MAX_RETRIES) {
        setTimeout(connectToMqtt, 6000); // Retry after 6 seconds
      } else {
        console.error("Stopped reconnecting after max retries.");
      }
    };

    clientRef.current.onMessageArrived = (message) => {
      retryCountRef.current = 0; //
      console.log("Message arrived:", JSON.parse(message.payloadString));
      let data = JSON.parse(message.payloadString);

      console.log("Message arrived:", JSON.parse(message.payloadString));

      switch (data.payload.message) {
        case "BANK_USER_REQUEST":
          console.log("Message arrived:", data);
          // When System Admin create a bank user
          setBankUserRequested(data.payload);
          break;
        case "CORPORATE_USER_REQUEST":
          console.log("Message arrived:", data);

          // When System Admin create a corporate user
          setCorporateUserRequested(data.payload);
          break;
        case "BANK_USER_CREATED":
          console.log("Message arrived:", data);

          // When Security Admin Accepted a Bank User Request
          setBankUserCreated(data.payload);
          break;
        case "CORPORATE_USER_CREATED":
          console.log("Message arrived:", data);

          // When Security Admin Accepted a Corporate User Request
          setCorporateUserCreated(data.payload);
          break;
        case "CORP_USER_REQUEST_REJECTED":
          console.log("Message arrived:", data);

          // When Security Admin Rejected a Corporate User Request
          setCorporateUserRejected(data.payload);
          break;
        case "BANK_USER_REQUEST_REJECTED":
          console.log("Message arrived:", data);

          // When Security Admin Rejected a Bank User Request
          setBankUserRejected(data.payload);
          break;
        case "CORP_USER_ROLE_STATUS_CHANGE":
          console.log("Message arrived:", data);

          // When Security Admin Change a Corporate User Role
          setCorporateUserRoleStatusChange(data.payload);
          break;
        case "BANK_USER_ROLE_STATUS_CHANGE":
          console.log("Message arrived:", data);

          // When Security Admin Change a Bank User Role
          setBankUserRoleStatusChange(data.payload);
          break;
        case "BRANCH_CREATED":
          console.log("Message arrived:", data);

          // When System  Admin Created a Branch
          setBranchCreated(data.payload);
          break;
        case "BRANCH_UPDATED":
          console.log("Message arrived:", data);

          // When System  Admin Updated a Branch
          setBranchUpdated(data.payload);
          break;
        case "CORPORATE_CREATED":
          console.log("Message arrived:", data);

          // When System  Admin Created a Corporate
          setCorporateCreated(data.payload);
          break;
        case "CORPORATE_UPDATED":
          console.log("Message arrived:", data);

          // When System  Admin Updated a Corporate
          setCorporateUpdated(data.payload);
          break;
        case "BANK_USER_UPDATED":
          console.log("Message arrived:", data);

          // When System  Admin Updated a Bank User
          setBankUserUpdated(data.payload);
          break;
        case "CORPORATE_USER_UPDATED":
          console.log("Message arrived:", data);

          // When System  Admin Updated a Corporate User
          setCorporateUserUpdated(data.payload);
          break;
        default:
          break;
      }
    };

    const options = {
      onSuccess: () => {
        console.log("Connected to MQTT broker");
        setIsConnected(true);
        retryCountRef.current = 0; // Reset retries on successful connection
        clientRef.current.subscribe(subscribeID.toString(), {
          onSuccess: () => console.log(`Subscribed to ${subscribeID}`),
          onFailure: (error) =>
            console.error("Subscription failed:", error.errorMessage),
        });
      },
      onFailure: (error) => {
        retryCountRef.current += 1;
        console.error("MQTT connection failed:", error.errorMessage);
        setIsConnected(false);
        if (retryCountRef.current < MAX_RETRIES) {
          setTimeout(connectToMqtt, 6000); // Retry after 6 seconds
        } else {
          console.error("Stopped retrying after 3 failed attempts.");
        }
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
        // setLastMessage(null);
        retryCountRef.current = 0;
      }
    };
  }, [subscribeID]);

  return (
    <MqttContext.Provider
      value={{
        client: clientRef.current,
        isConnected,
        bankUserRequested,
        bankUserCreated,
        bankUserRejected,
        bankUserRoleStatusChange,
        bankUserUpdated,
        branchCreated,
        branchUpdated,
        corproateUserRequested,
        corproateUserCreated,
        corproateUserRejected,
        corporateUserRoleStatusChange,
        corporateCreated,
        corproateUpdated,
        corporateUserUpdated,
      }}>
      {children}
    </MqttContext.Provider>
  );
};
