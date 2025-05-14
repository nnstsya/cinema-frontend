import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";


let stripePromise;

const initializeStripe = async () => {
  stripePromise = await loadStripe("pk_test_51OIGBKKfdlsNCGTnyxFs1IzyDJ1Wfe4TKOpDgeDyyubqHixilJu2an4WBdktNWgAUqfPMV6fw8eLNjf6QumdqC9X00g6whFvLS");
};

initializeStripe();
const payUrl = "http://localhost:3000/pay/buyTicket";

export const buyTickets = async (email, sessionId, emailPlace) => {
    const data = {
        email : email,
        sessionId: sessionId,
        emailPlace: emailPlace
    }

    const session = await axios.post(payUrl, data).then(res => res.data.stripeSession);

    await stripePromise.redirectToCheckout({
        sessionId: session.id
    });
};