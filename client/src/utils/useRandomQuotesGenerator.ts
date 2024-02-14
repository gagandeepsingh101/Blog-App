import axios from "axios";
import { Dispatch, SetStateAction } from "react";

// Function to fetch a random quote from the Quotable API and update the state with the quote
export const useRandomQuoteGenerator = async (setRandomQuote: Dispatch<SetStateAction<{ author: string, content: string }>>) => {
    try {
        // Fetch a random quote with the "technology" tag from the Quotable API
        const response = await axios("http://api.quotable.io/quotes/random?tags=technology");
        // console.log(response);

        // Check if the request was successful (status code 200)
        if (response.statusText === "OK") {
            // Update the state with the author and content of the random quote
            setRandomQuote({
                author: response.data[0].author,
                content: response.data[0].content
            });
        }
    } catch (error: any) {
        // Log any errors that occur during the request
        // console.error(error.message);s
    }
};
