import axios from 'axios';
import router from '@/routes/router';
const userUrl = "http://localhost:3000/pay/";


export async function buyTickets(ticket) {
    try {
        return await axios.post(userUrl + "buyTicket", ticket).then(res => res.data);
    } catch (error) {
        console.error("Error creating buying ticket:", error);
        await router.push("/error");
    }
}

export async function getTicketsBySessionId(id) {
    try {
        return await axios.get(userUrl + "tickets/" + id).then(res => res.data.data.tickets);
    } catch (error) {
        console.error("Error finding session:", error);
        await router.push("/error");
    }
}