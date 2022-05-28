import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "src/firebase";

const Paintings: React.FC = () => {
    const [paintings, setPaintings] = useState<any>();

    onAuthStateChanged(auth, (user) => {
        if (user)
            axios
                .post("/api/getPaintings", { email: user?.email })
                .then((e) => {
                    console.log(e);
                    setPaintings(e);
                });
    });
    return (
        <Flex>
            <Flex>{JSON.stringify(paintings)}</Flex>
        </Flex>
    );
};

export default Paintings;
