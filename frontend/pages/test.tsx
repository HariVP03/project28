import { Button } from "@chakra-ui/react";
import axios from "axios";

const Test = () => {
    return (
        <>
            <Button
                onClick={() => {
                    axios.post("/api/createUser", {
                        email: "harryskotch11@gmail.com",
                    });
                }}
            >
                123
            </Button>
        </>
    );
};

export default Test;
