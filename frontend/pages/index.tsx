import React, { useEffect, useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { googleProvider } from "src/firebase";
import { useRouter } from "next/router";

const Home: React.FC = () => {
    const route = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const auth = getAuth();

    onAuthStateChanged(auth, (res) => {
        setLoading(false);
        if (res) {
            route.push("/draw");
        }
    });

    const login = () => {
        signInWithPopup(auth, googleProvider)
            .then(({ user }) => {
                if (user) {
                    route.push("/draw");
                }
            })
            .catch((e: any) => {
                console.log(e);
            });
    };

    return (
        <Flex minH="100vh" justify="center" align="center">
            <Button isLoading={loading} maxW="200px" onClick={login}>
                Login with Google
            </Button>
        </Flex>
    );
};

export default Home;
