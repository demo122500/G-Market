import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import ActivationSuccess from "../components/Activation/activationSuccess";
import ActivationFailed from "../components/Activation/activationFailed";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await axios.post(`${server}/user/activation`, {
          activation_token,
        });
        console.log("Activation successful:", response.data);
      } catch (error) {
        setError(true);
        console.error("Activation error:", error);
      }
    };

    if (activation_token) {
      activateAccount();
    }
  }, [activation_token]); // dependency array includes activation_token to avoid warnings

  return (
    <div>
      {error ? (
        <ActivationFailed />
        // <p>Your token has expired or is invalid!</p>
      ) : (
        <ActivationSuccess />
        // <p>Your account has been created successfully!</p>
      )}
    </div>
  );
};

export default ActivationPage;
