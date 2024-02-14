import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export const useRandomQuoteGenerator = async (setRandomQuote: Dispatch<SetStateAction<{ author: string, content: string }>>) => {
    try {
        const response = await axios("http://api.quotable.io/quotes/random?tags=technology");
        if (response.statusText == "OK") {
            setRandomQuote({
                author: response.data[0].author,
                content: response.data[0].content
            })
        }
    } catch (error: any) {
        console.log(error.message)
    }
}